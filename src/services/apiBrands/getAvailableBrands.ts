import supabase from '../supabase';

export async function getAvailableBrands(categoriesList: string[]) {
  const { data, error } = await supabase.rpc('getAvailableBrands', {
    categoriesList,
  });

  if (error) {
    console.error(error);
    throw new Error('Available brands could not be loaded');
  }

  return data;
}
