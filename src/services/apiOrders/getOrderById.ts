import supabase from '../supabase';
import { Tables } from '../supabase.types';

export async function getOrderById<
  T extends Tables<'orders'>,
  K extends keyof T
>(
  id: number,
  fields?: K[] | K
): Promise<Pick<T, K extends undefined ? keyof T : K>> {
  const fieldsArr = Array.isArray(fields) ? fields : [fields ?? '*'];

  const { data, error } = await supabase
    .from('orders')
    .select(fieldsArr.join(', '))
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Order could not be loaded');
  }

  return data as any;
}
