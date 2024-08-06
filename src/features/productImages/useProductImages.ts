import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProductImages } from '../../services/apiProductImages';
import { useProduct } from '../products/useProduct';

export function useProductImages() {
  const params = useParams();
  const productId = Number(params.productId);
  const [searchParams] = useSearchParams();
  const { product } = useProduct({ isGetFromCache: true });
  const colorName = searchParams.get('color');
  const colorId =
    product?.colorList.find((item) => item.name === colorName)?.colorId ?? 0;

  const {
    data: productImages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productImages', productId, colorId],
    queryFn: () => getProductImages(productId, colorId),
    enabled: !!product,
  });

  return { productImages, isLoading, error };
}
