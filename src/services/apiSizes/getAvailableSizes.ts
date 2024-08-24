import supabase from '../supabase';

export async function getAvailableSizes(params: {
  categoriesList: string[];
  colorIds: number[];
  brandIds: number[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
}) {
  const { data, error } = await supabase.rpc('getAvailableSizes', {
    ...params,
  });

  if (error) {
    console.error(error);
    throw new Error('Available sizes could not be loaded');
  }

  return data;
}
