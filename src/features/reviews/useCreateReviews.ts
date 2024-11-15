import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createReviews as createReviewsApi } from '../../services/apiReviews';
import { TablesInsert } from '../../services/supabase.types';

export function useCreateReviews(productId: number) {
  const queryClient = useQueryClient();

  const { mutate: createReviews, isPending: isCreating } = useMutation({
    mutationFn: (data: Omit<TablesInsert<'reviews'>, 'productId'>) =>
      createReviewsApi({ ...data, productId }),
    onSuccess: () => {
      toast.success('Отзыв отправлен!');
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Во время отправки отзыва произошла ошибка! ${err.message}`);
    },
  });

  return { createReviews, isCreating };
}
