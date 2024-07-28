import { useSearchParams } from 'react-router-dom';
import Empty from '../../components/Empty';
import Product from '../../components/Product';
import Spinner from '../../components/Spinner';
import { useProduct } from './useProduct';
import { omit } from '../../utils/omit';

type TProductContainerProps = {
  className?: string;
};
function ProductContainer({ className }: TProductContainerProps): JSX.Element {
  const { product, isLoading } = useProduct();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color');
  const selectedSize = searchParams.get('size');

  if (isLoading) return <Spinner />;

  if (!product) return <Empty resource="Продукт" />;

  const productVariants = product.productVariants;

  const selectedColorId = productVariants.find(
    ({ color }) => color?.name === selectedColor
  )?.color?.colorId;

  const selectedSizeId = productVariants.find(
    ({ size }) => size?.name === selectedSize
  )?.size?.sizeId;

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

  return (
    <Product
      className={className}
      data={data}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      onColorChange={(value) => handleChange('color', value)}
      onSizeChange={(value) => handleChange('size', value)}
    />
  );
}

export default ProductContainer;
