import supabase from '../supabase';

export async function getProductVariants(productVariantsIds: number[]) {
  const { data, error } = await supabase.rpc('getProductVatiants', {
    productVariantsIds,
  });

  if (error) {
    console.error(error);
    throw new Error('Product variants could not be loaded');
  }

  return data;
}
