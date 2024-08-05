import { omit } from '../../utils/omit';
import supabase from '../supabase';

export async function getNewProducts({
  limit,
  categoryName,
}: {
  limit: number;
  categoryName?: string;
}) {
  const query = supabase
    .from('products')
    .select(
      `
      id, 
      description, 
      price, 
      oldPrice, 
      productImagesPrimary(imageUrl), 
      brands(name),
      categories!inner()
    `
    )
    .order('order', { referencedTable: 'productImagesPrimary' })
    .limit(2, { referencedTable: 'productImagesPrimary' })
    .order('insertedAt', { ascending: false })
    .limit(limit);

  if (categoryName) {
    query.eq('categories.name', categoryName);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }
  const result = data.map((item) => ({
    ...omit(item, ['brands', 'productImagesPrimary']),
    images: item.productImagesPrimary.map(({ imageUrl }) => imageUrl),
    name: item.brands?.name ?? 'Не указано',
    discount: item.oldPrice ? 1 - item.price / item.oldPrice : null,
  }));

  return result;
}
