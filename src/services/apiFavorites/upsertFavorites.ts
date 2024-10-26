import supabase from '../supabase';
import { TablesInsert } from '../supabase.types';

export async function upsertFavorites(record: TablesInsert<'favorites'>) {
  const { data, error } = await supabase
    .from('favorites')
    .upsert(record, { onConflict: 'userId, productId' })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Favorites could not be updated');
  }

  return data;
}
