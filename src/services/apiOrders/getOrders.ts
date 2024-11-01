import supabase from '../supabase';
import { TGetOrdersArgs } from './apiOrders.types';

export async function getOrders({ page, pageSize }: TGetOrdersArgs) {
  const query = supabase
    .from('orders')
    .select(
      `
    id, 
    status, 
    payMethod, 
    totalPrice
    `,
      { count: 'exact' }
    )
    .order('createdAt', { ascending: false });

  // RANGE
  if (page) {
    const from = (page - 1) * pageSize;
    const to = page * pageSize - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Orders could not be loaded');
  }

  return { data, count };
}
