import supabase from '../supabase';
import { omit } from '../../utils/omit';
import { TProducts } from './apiProducts.types';
import { PAGE_SIZE_PRODUCTS } from '../constants';

export async function getProducts({
  categoryFilters = [],
  filters,
  sortBy,
  page,
}: {
  categoryFilters: string[];
  filters?: { field: string; value: string }[];
  sortBy?: { field: string; value: string };
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
      brands!inner(name),
      insertedAt,
      ${categoryFilters.map((_, i) => `cat_${i}:categories!inner()`).join(', ')}
    `,
      { count: 'exact' }
    )
    .order('order', { referencedTable: 'productImagesPrimary' })
    .limit(2, { referencedTable: 'productImagesPrimary' });

  categoryFilters.forEach((category, i) => {
    query.eq(`cat_${i}.name`, category);
  });

  // FILTERS
  if (filters) {
    filters.forEach(({ field, value }) => {
      query.eq(field, value);
    });
  }

  // SORT
  if (sortBy) {
    query.order(sortBy.field, { ascending: sortBy.value === 'asc' });
  }

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
