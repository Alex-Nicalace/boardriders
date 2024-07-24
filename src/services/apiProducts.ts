import { omit } from '../utils/omit';
import supabase from './supabase';

export async function getNewProducts(limit: number) {
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, description, price, oldPrice, discount, productVariants(productImages(imageUrl)), brands(name)'
    )
    .eq('productVariants.isPrimary', true)
    .order('insertedAt', { ascending: false })
    .order('order', {
      referencedTable: 'productVariants.productImages',
    })
    .limit(1, { referencedTable: 'productVariants' })
    .limit(2, { referencedTable: 'productVariants.productImages' })
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }
  const result = data.map((item) => ({
    ...omit(item, ['brands', 'productVariants']),
    images: item.productVariants.flatMap((variant) =>
      variant.productImages.map((image) => image.imageUrl)
    ),
    name: item.brands?.name ?? 'Не указано',
  }));
  return result;
}

export async function getPopularProducts(/* limit: number */) {
  const { data, error } = await supabase
    .from('productSalesCount')
    .select(
      '*, products(id, description, price, oldPrice, discount, productVariants(productImages(imageUrl)), brands(name))'
    )
    .eq('products.productVariants.isPrimary', true)
    .order('order', {
      referencedTable: 'products.productVariants.productImages',
    })
    .limit(1, { referencedTable: 'products.productVariants' })
    .limit(2, { referencedTable: 'products.productVariants.productImages' })
    .order('saleCount', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }
  console.log('data', data);

  const result = data.map(({ products }) => ({
    ...omit(products!, ['brands', 'productVariants']),
    images: products!.productVariants.flatMap((variant) =>
      variant.productImages.map((image) => image.imageUrl)
    ),
    name: products!.brands?.name ?? 'Не указано',
  }));

  console.log('result', result);

  return result;
}
