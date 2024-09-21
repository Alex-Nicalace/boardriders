import supabase from '../supabase';

export async function getFavorites() {
  const {
    data: favorites,
    error,
    count,
  } = await supabase
    .from('favorites')
    .select('id, productId', { count: 'exact' });

  if (error) {
    console.error(error);
    throw new Error('Favorites could not be loaded');
  }

  const favoritesIds = new Set(favorites.map((favorite) => favorite.productId));

  return { favorites, favoritesIds, count };
}
