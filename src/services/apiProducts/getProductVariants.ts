import supabase from '../supabase';
import { Database } from '../supabase.types';
import { transformCartData } from '../helpers/transformCartData';

export async function getProductVariants(productVariantsIds: number[]) {
  const { data, error } = await supabase.rpc('getProductVatiants', {
    productVariantsIds,
  });

  if (error) {
    console.error(error);
    throw new Error('Product variants could not be loaded');
  }

  const dataMapping = data.reduce((acc, item) => {
    acc[item.productVariantId] = item;
    return acc;
  }, {} as Record<number, Database['public']['Functions']['getProductVatiants']['Returns'][number]>);

  // сортировка ответа в соответствии с productVariantsIds
  const dataSorted = productVariantsIds
    .map((id) => dataMapping[id])
    .filter(Boolean);

  const products = transformCartData(dataSorted);

  return products;
}
