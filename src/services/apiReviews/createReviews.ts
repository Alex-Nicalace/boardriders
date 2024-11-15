import supabase from '../supabase';
import { TablesInsert } from '../supabase.types';

export async function createReviews(row: TablesInsert<'reviews'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Reviews could not be created');
  }

  return data;
}
