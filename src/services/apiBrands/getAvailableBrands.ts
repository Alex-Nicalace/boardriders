import supabase from '../supabase';

export async function getAvailableBrands(params: {
  categoriesList: string[];
  colorIds: number[];
  sizeIds: number[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
}) {
  const { data, error } = await supabase.rpc('getAvailableBrands', {
    ...params,
  });

  if (error) {
    console.error(error);
    throw new Error('Available brands could not be loaded');
  }

  return data;
}
