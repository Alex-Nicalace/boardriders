import { omit } from '../../utils/omit';
import supabase from '../supabase';

export async function getProductVariants(productVariantsIds: number[]) {
  const { data, error } = await supabase.rpc('getProductVatiants', {
    productVariantsIds,
  });

  if (error) {
    console.error(error);
    throw new Error('Product variants could not be loaded');
  }

  const products = data.map((item) => ({
    ...omit(item, ['colorId', 'sizeId', 'color', 'size']),
    props: [
      {
        name: 'color',
        value: item.color,
        id: item.colorId,
        nameDisplay: 'Цвет',
      },
      {
        name: 'size',
        value: item.size,
        id: item.sizeId,
        nameDisplay: 'Размер',
      },
    ].filter(Boolean),
  }));

  return products;
}
