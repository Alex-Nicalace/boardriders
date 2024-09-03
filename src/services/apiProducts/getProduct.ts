import supabase from '../supabase';
import { omit } from '../../utils/omit';
import { createHierarchicalList } from '../../utils/createHierarchicalList';

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
      brands(iconUrl),
      reviews(id.count(),rating.avg()),
      productVariants(productVariantId:id, color:colors(colorId:id, name, hexValue), size:sizes(sizeId:id, name)),
      productAttributes(attributeId:id, name, value),
      productDescriptionImages(imageUrl),
      categories(id, parentId, name, displayName, categoryTypeId)
      `
    )
    .eq('id', productId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Product could not be loaded');
  }

  const categoryGenders = data.categories.filter(
    (item) => item.categoryTypeId === 1
  );

  const categoryWithoutGender = data.categories.filter(
    (item) => item.categoryTypeId !== 1
  );

  const categoryHierar = createHierarchicalList(categoryWithoutGender);

  const result = {
    ...omit(data, ['brands', 'reviews', 'categories']),
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
    categoryHierar,
    categoryGenders,
  };

  return result;
}
