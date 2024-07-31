import supabase from './supabase';

export async function getProductImages(productId: number, colorId: number) {
  const { data, error } = await supabase
    .from('productImages')
    .select('id, imageUrl')
    .eq('productId', productId)
    .eq('colorId', colorId)
    .order('order');

  if (error) {
    console.error(error);
    throw new Error('Product images could not be loaded');
  }

  return data;
}
