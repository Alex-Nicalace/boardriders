import supabase from './supabase';
import { omit } from '../utils/omit';

export async function getNewProducts(limit: number) {
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, description, price, oldPrice, productImagesPrimary(imageUrl), brands(name)'
    )
    .order('order', { referencedTable: 'productImagesPrimary' })
    .limit(2, { referencedTable: 'productImagesPrimary' })
    .order('insertedAt', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  const result = data.map((item) => ({
    ...omit(item, ['brands', 'productImagesPrimary']),
    images: item.productImagesPrimary.map(({ imageUrl }) => imageUrl),
    name: item.brands?.name ?? 'Не указано',
    discount: item.oldPrice ? 1 - item.price / item.oldPrice : null,
  }));

  return result;
}

export async function getPopularProducts(limit: number) {
  const { data, error } = await supabase
    .from('productSalesCount')
    .select(
      '*, products(id, description, price, oldPrice, productImagesPrimary(imageUrl), brands(name))'
    )
    .order('order', { referencedTable: 'products.productImagesPrimary' })
    .limit(2, { referencedTable: 'products.productImagesPrimary' })
    .order('saleCount', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  const result = data
    .map(({ products }) => {
      if (!products) {
        return null;
      }
      return {
        ...omit(products, ['brands', 'productImagesPrimary']),
        images: products.productImagesPrimary.map(({ imageUrl }) => imageUrl),
        name: products.brands?.name ?? 'Не указано',
        discount: products.oldPrice
          ? 1 - products.price / products.oldPrice
          : null,
      };
    })
    .filter((item) => item !== null);

  return result;
}
export async function getProduct(productId: number) {
  const { data, error } = await supabase
    .from('products')
    .select(
      `id, 
      description, 
      detailedDescription, 
      price, 
      oldPrice, 
      manufacturerSKU, 
      rating,
      brands(iconUrl),
      reviews(id.count(),rating.avg()),
      productVariants(productVariantId:id, color:colors(colorId:id, name, hexValue), size:sizes(sizeId:id, name)),
      productAttributes(attributeId:id, name, value),
      productDescriptionImages(imageUrl)
      `
    )
    .eq('id', productId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Product could not be loaded');
  }

  const result = {
    ...omit(data, ['brands', 'reviews']),
    discount: data.oldPrice ? 1 - data.price / data.oldPrice : null,
    iconBrandUrl: data.brands?.iconUrl ?? '',
    // @ts-ignore // ! https://github.com/supabase/postgrest-js/issues/523
    reviewCount: (data.reviews[0].count ?? 0) as number,
    // @ts-ignore // ! https://github.com/supabase/postgrest-js/issues/523
    rating: (data.reviews[0].avg ?? 0) as number,
    colorList: data.productVariants
      .map(({ color }) => color ?? null)
      .filter((item) => item !== null)
      .reduce(
        (acc: { colorId: number; name: string; hexValue: string }[], item) => {
          if (!acc.some((i) => i.colorId === item.colorId)) acc.push(item);
          return acc;
        },
        []
      ),
    sizeList: data.productVariants
      .map(({ size }) => size ?? null)
      .filter((item) => item !== null)
      .reduce((acc: { sizeId: number; name: string }[], item) => {
        if (!acc.some((i) => i.sizeId === item.sizeId)) acc.push(item);
        return acc;
      }, [])
      .sort((a, b) => a.name.localeCompare(b.name)),
  };

  return result;
}
