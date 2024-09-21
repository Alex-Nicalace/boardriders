import supabase from '../supabase';

export async function deleteFavorites(productId: number) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('productId', productId);

  if (error) {
    console.error(error);
    throw new Error('Favorites could not be deleted');
  }
}
