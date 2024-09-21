import supabase from '../supabase';
import { TablesInsert } from '../supabase.types';

export async function createFavorites(record: TablesInsert<'favorites'>) {
  const { data, error } = await supabase.from('favorites').insert(record);

  if (error) {
    console.error(error);
    throw new Error('Favorites could not be created');
  }

  return data;
}
