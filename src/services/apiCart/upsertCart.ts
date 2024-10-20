import supabase from '../supabase';
import { TablesInsert } from '../supabase.types';

export async function upsertCart(record: TablesInsert<'cart'>) {
  const { data, error } = await supabase
    .from('cart')
    .upsert({ ...record }, { onConflict: 'userId, productVariantId' })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cart could not be updated');
  }

  return data;
}
