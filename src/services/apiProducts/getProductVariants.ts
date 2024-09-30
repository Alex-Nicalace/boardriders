import { omit } from '../../utils/omit';
import supabase from '../supabase';
import { Database } from '../supabase.types';

export async function getProductVariants(productVariantsIds: number[]) {
  const { data, error } = await supabase.rpc('getProductVatiants', {
    productVariantsIds,
  });

  if (error) {
    console.error(error);
    throw new Error('Product variants could not be loaded');
  }

  const dataMapping = data.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<number, Database['public']['Functions']['getProductVatiants']['Returns'][number]>);

  // сортировка ответа в соответствии с productVariantsIds
  const dataSorted = productVariantsIds
    .map((id) => dataMapping[id])
    .filter(Boolean);

  const products = dataSorted.map((item) => ({
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
