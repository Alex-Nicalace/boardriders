import supabase from '../supabase';

export async function getAvailableCategories(categoriesList: string[]) {
  const { data, error } = await supabase.rpc('getAvailableCategories', {
    categoriesList,
  });

  if (error) {
    console.error(error);
    throw new Error('Available categories could not be loaded');
  }

  return data;
}
