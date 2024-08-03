import supabase from './supabase';

export async function getGenderCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, displayName')
    .eq('categoryTypeId', 1)
    .order('order');

  if (error) {
    console.error(error);
    throw new Error('Categories could not be loaded');
  }

  return data;
}
