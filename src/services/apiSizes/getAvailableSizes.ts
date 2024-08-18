import supabase from '../supabase';

export async function getAvailableSizes(categoriesList: string[]) {
  const { data, error } = await supabase.rpc('getAvailableSizes', {
    categoriesList,
  });

  if (error) {
    console.error(error);
    throw new Error('Available sizes could not be loaded');
  }

  return data;
}
