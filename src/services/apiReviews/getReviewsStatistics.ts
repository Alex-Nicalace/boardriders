import supabase from '../supabase';

export async function getReviewsStatistics(productId: number) {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating, id.count()')
    .eq('productId', productId);

  if (error) {
    console.error(error);
    throw new Error('Reviews statistics could not be loaded');
  }

  return data;
}
