import { omit } from '../../utils/omit';
import supabase from '../supabase';

export async function getCartStat(userId?: string) {
  const query = supabase
    .from('cart')
    .select(
      `
      productVariantId,
      quantity, 
      productVariants!inner(
        products!inner(
          id, 
          name, 
          price
        )
      )
    `
    )
    .order('createdAt', { ascending: false });

  if (userId) {
    query.eq('userId', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Cart could not be loaded');
  }

  const transformedData = data.map((item) => ({
    ...omit(item, 'productVariants'),
    ...omit(item.productVariants.products, 'id'),
    productId: item.productVariants.products.id,
  }));

  return transformedData;
}
