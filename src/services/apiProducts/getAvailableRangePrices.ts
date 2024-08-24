import supabase from '../supabase';

export async function getAvailableRangePrices(params: {
  categoriesList: string[];
  colorIds: number[];
  sizeIds: number[];
  categories: string[];
  brandIds: number[];
}) {
  const { data, error } = await supabase
    .rpc('getAvailableRangePrices', {
      ...params,
    })
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error('Available prices could not be loaded');
  }

  return data;
}
