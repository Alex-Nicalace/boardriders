import supabase from './supabase';
import { PAGE_SIZE_COMMENTS } from './constants';

export async function getReviews({
  productId,
  page,
}: {
  productId: number;
  page?: number;
}) {
  const query = supabase
    .from('reviews')
    .select('*, users(fullname)', { count: 'exact' })
    .eq('productId', productId)
    .order('insertedAt', { ascending: false });

  // RANGE
  if (page) {
    const from = (page - 1) * PAGE_SIZE_COMMENTS;
    const to = page * PAGE_SIZE_COMMENTS - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Reviews could not be loaded');
  }

  const totalPage = Math.ceil((count ?? 0) / PAGE_SIZE_COMMENTS);

  return { reviews: data, count, totalPage };
}

export async function getReviewsStatistics(productId: number) {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating, id.count()')
    .eq('productId', productId);

  if (error) {
    console.error(error);
    throw new Error('Reviews statistics could not be loaded');
  }

  return data;
}
