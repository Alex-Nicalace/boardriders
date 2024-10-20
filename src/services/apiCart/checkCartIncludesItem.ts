import supabase from '../supabase';

export async function checkCartIncludesItem(productVariantId: number) {
  const { count, error } = await supabase
    .from('cart')
    .select('*', { count: 'exact', head: true }) // head: true - не возвращает строки
    .eq('productVariantId', productVariantId);

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  return !!count;
}
