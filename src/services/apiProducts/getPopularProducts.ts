import { omit } from '../../utils/omit';
import supabase from '../supabase';

export async function getPopularProducts({
  limit,
  categoryName,
}: {
  limit: number;
  categoryName?: string;
}) {
  const query = supabase
    .from('productSalesCount')
    .select(
      `*, 
      products(
        id, 
        description, 
        price, 
        oldPrice, 
        productImagesPrimary(imageUrl), brands(name),
        categories!inner()
      )`
    )
    .order('order', { referencedTable: 'products.productImagesPrimary' })
    .limit(2, { referencedTable: 'products.productImagesPrimary' })
    .order('saleCount', { ascending: false })
    .limit(limit);

  if (categoryName) {
    query.eq('products.categories.name', categoryName);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  const result = data
    .map(({ products }) => {
      if (!products) {
        return null;
      }
      return {
        ...omit(products, ['brands', 'productImagesPrimary']),
        images: products.productImagesPrimary.map(({ imageUrl }) => imageUrl),
        name: products.brands?.name ?? 'Не указано',
        discount: products.oldPrice
          ? 1 - products.price / products.oldPrice
          : null,
      };
    })
    .filter((item) => item !== null);

  return result;
}
