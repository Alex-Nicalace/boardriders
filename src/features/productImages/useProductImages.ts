import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProductImages } from '../../services/apiProductImages';
import { TGetProductReturnType } from '../../services/apiProducts';

export function useProductImages() {
  const params = useParams();
  const productId = Number(params.productId);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const productData = queryClient.getQueryData<TGetProductReturnType>([
    'product',
    productId,
  ]);
  const colorName = searchParams.get('color');
  const colorId =
    productData?.colorList.find((item) => item.name === colorName)?.colorId ??
    0;

  const {
    data: productImages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productImages', productId, colorId],
    queryFn: () => getProductImages(productId, colorId),
  });

  return { productImages, isLoading, error };
}
