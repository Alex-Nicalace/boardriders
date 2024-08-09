import supabase from './supabase';

export async function getBrands() {
  const { data, error } = await supabase.from('brands').select('*');

  if (error) {
    console.error(error);
    throw new Error('Brands could not be loaded');
  }

  return data;
}
