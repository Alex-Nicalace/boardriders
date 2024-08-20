import supabase from '../supabase';

export async function getAvailableRangePrices(categoriesList: string[]) {
  const { data, error } = await supabase
    .rpc('getAvailableRangePrices', {
      categoriesList,
    })
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error('Available prices could not be loaded');
  }

  return data;
}
