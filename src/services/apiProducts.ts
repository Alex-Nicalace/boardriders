import supabase from './supabase';

export async function getNewProducts(limit: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('insertedAt', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  return data;
}

export async function getPopularProducts(/* limit: number */) {
  const { data, error } = await supabase.from('topSellingProducts').select('*');

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  return data;
}
