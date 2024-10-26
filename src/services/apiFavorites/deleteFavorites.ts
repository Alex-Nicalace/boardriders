import supabase from '../supabase';

export async function deleteFavorites(productId: number) {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('productId', productId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Favorites could not be deleted');
  }

  return data;
}
