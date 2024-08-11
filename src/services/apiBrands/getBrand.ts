import supabase from '../supabase';

export async function getBrand(nameBrand: string) {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('name', nameBrand)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error('Brand could not be loaded');
  }

  return data;
}
