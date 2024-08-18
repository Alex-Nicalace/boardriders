import supabase from '../supabase';

export async function getAvailableColors(categoriesList: string[]) {
  const { data, error } = await supabase.rpc('getAvailableColors', {
    categoriesList,
  });

  if (error) {
    console.error(error);
    throw new Error('Available colors could not be loaded');
  }

  return data;
}
