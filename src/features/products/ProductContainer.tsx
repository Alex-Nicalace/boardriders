import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import Empty from '../../components/Empty';
import Product from '../../components/Product';
import Spinner from '../../components/Spinner';
import { useProduct } from './useProduct';
import { omit } from '../../utils/omit';
import { useEffect } from 'react';
import { useProductImages } from '../productImages/useProductImages';
import { addCartWithToast, isProductInCart } from '../cart/cartSlice';

type TProductContainerProps = {
  className?: string;
};
function ProductContainer({ className }: TProductContainerProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { product, isLoading: isLoadingProduct } = useProduct();
  const { productImages, isLoading: isLoadingProductImages } =
    useProductImages();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color');
  const selectedSize = searchParams.get('size');
  const selectedColorId = product?.productVariants.find(
    ({ color }) => color?.name === selectedColor
  )?.color?.colorId;

  const selectedSizeId = product?.productVariants.find(
    ({ size }) => size?.name === selectedSize
  )?.size?.sizeId;

  const selecetedProductVariantId = product?.productVariants.find(
    ({ color, size }) =>
      color?.colorId === selectedColorId && size?.sizeId === selectedSizeId
  )?.productVariantId;

  const isInCart = useAppSelector(
    isProductInCart(selecetedProductVariantId ?? 0)
  );

  useEffect(
    function setValidParam() {
      if (!product || (selectedColorId && selectedSizeId)) return;

      if (selectedColorId) {
        const sizeByColorId = product.productVariants.find(
          ({ color }) => color?.colorId === selectedColorId
        )?.size?.name;

        if (sizeByColorId) searchParams.set('size', sizeByColorId);
      }

      if (selectedSizeId) {
        const colorBySizeId = product.productVariants.find(
          ({ size }) => size?.sizeId === selectedSizeId
        )?.color?.name;

        if (colorBySizeId) searchParams.set('color', colorBySizeId);
      }

      if (!selectedColorId && !selectedSizeId) {
        const color = product.productVariants[0].color?.name;
        const size = product.productVariants[0].size?.name;

        if (color) searchParams.set('color', color);
        if (size) searchParams.set('size', size);
      }

      setSearchParams(searchParams, { replace: true });
    },
    [product, selectedColorId, selectedSizeId, searchParams, setSearchParams]
  );

  if (isLoadingProduct) return <Spinner />;

  if (!product) return <Empty resource="Продукт" />;

  const productVariants = product.productVariants;

  const colorList = product.colorList.map(({ hexValue, name, colorId }) => ({
    color: hexValue,
    value: name,
    isEmpty:
      !!selectedSizeId &&
      !productVariants.some(
        ({ size, color }) =>
          selectedSizeId === size?.sizeId && color?.colorId === colorId
      ),
  }));

  const sizeList = product.sizeList.map(({ name, sizeId }) => ({
    size: name,
    value: name,
    isEmpty:
      !!selectedColorId &&
      !productVariants.some(
        ({ size, color }) =>
          selectedColorId === color?.colorId && size?.sizeId === sizeId
      ),
  }));

  const data = {
    ...omit(product, 'productVariants'),
    colorList,
    sizeList,
    galleryPreview: {
      isLoading: isLoadingProductImages,
      images: (productImages || []).map(({ imageUrl }) => imageUrl),
    },
  };

  const handleChange = (name: 'color' | 'size', value: string) => {
    searchParams.set(name, value);

    if (name === 'color') {
      const existsSizeByColor = productVariants.some(
        ({ color, size }) =>
          color?.name === value && size?.sizeId === selectedSizeId
      );
      if (!existsSizeByColor) {
        searchParams.delete('size');
      }
    }

    if (name === 'size') {
      const existsColorBySize = productVariants.some(
        ({ color, size }) =>
          size?.name === value && color?.colorId === selectedColorId
      );
      if (!existsColorBySize) {
        searchParams.delete('color');
      }
    }

    setSearchParams(searchParams);
  };

  function handleAddToCart(productVariantId: number | undefined | null) {
    if (!productVariantId) return;
    dispatch(addCartWithToast({ productVariantId }));
  }

  return (
    <Product
      className={className}
      data={data}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      disabled={!selecetedProductVariantId}
      isInCart={isInCart}
      onColorChange={(value) => handleChange('color', value)}
      onSizeChange={(value) => handleChange('size', value)}
      onAddToCart={() => handleAddToCart(selecetedProductVariantId)}
    />
  );
}

export default ProductContainer;
