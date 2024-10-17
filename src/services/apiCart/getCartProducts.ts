import { transformCartData } from '../helpers/transformCartData';
import supabase from '../supabase';

export async function getCartProducts() {
  const { data, error } = await supabase.rpc('getCartProducts');

  if (error) {
    console.error(error);
    throw new Error('Cart products could not be loaded');
  }

  const products = transformCartData(data);

  return products;
}
