import supabase from '../supabase';

export async function getAvailableCategories(params: {
  categoriesList: string[];
  colorIds: number[];
  sizeIds: number[];
  brandIds: number[];
  minPrice: number;
  maxPrice: number;
}) {
  const { data, error } = await supabase.rpc('getAvailableCategories', {
    ...params,
  });

  if (error) {
    console.error(error);
    throw new Error('Available categories could not be loaded');
  }

  return data;
}
