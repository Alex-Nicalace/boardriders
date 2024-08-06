import supabase from '../supabase';
import { omit } from '../../utils/omit';
import { TProducts } from './apiProducts.types';
import { PAGE_SIZE_PRODUCTS } from '../constants';

export async function getProducts({
  categories = [],
  page,
}: {
  categories: string[];
  page?: number;
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
      ${categories.map((_, i) => `cat_${i}:categories!inner()`).join(', ')}
    `,
      { count: 'exact' }
    )
    .order('order', { referencedTable: 'productImagesPrimary' })
    .limit(2, { referencedTable: 'productImagesPrimary' })
    .order('insertedAt', { ascending: false });

  categories.forEach((category, i) => {
    query.eq(`cat_${i}.name`, category);
  });

  // RANGE
  if (page) {
    const from = (page - 1) * PAGE_SIZE_PRODUCTS;
    const to = page * PAGE_SIZE_PRODUCTS - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;
  const typedData = data as TProducts;

  if (error || !typedData) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  const products = typedData.map((item) => ({
    ...omit(item, ['brands', 'productImagesPrimary']),
    images: item.productImagesPrimary.map(({ imageUrl }) => imageUrl),
    name: item.brands?.name ?? 'Не указано',
    discount: item.oldPrice ? 1 - item.price / item.oldPrice : null,
  }));

  return { products, count };
}
