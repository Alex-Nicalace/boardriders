import { transformCartData } from '../helpers/transformCartData';
import supabase from '../supabase';

export async function getOrderProductsById(orderID: number) {
  const { data, error } = await supabase.rpc('getOrderProductsById', {
    orderID,
  });

  if (error) {
    console.error(error);
    throw new Error('Order products could not be loaded');
  }

  return transformCartData(data);
}
