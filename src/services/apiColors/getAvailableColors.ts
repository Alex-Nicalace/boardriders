import supabase from '../supabase';

export async function getAvailableColors(params: {
  categoriesList: string[];
  brandIds: number[];
  sizeIds: number[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
}) {
  const { data, error } = await supabase.rpc('getAvailableColors', {
    ...params,
  });

  if (error) {
    console.error(error);
    throw new Error('Available colors could not be loaded');
  }

  return data;
}
