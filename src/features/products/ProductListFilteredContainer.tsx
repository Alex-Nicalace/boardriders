import { useSearchParams } from 'react-router-dom';
import ProductListFiltered from '../../components/ProductListFiltered';
import { useProducts } from './useProducts';

type TProductListFilteredContainerProps = { className?: string };
function ProductListFilteredContainer({
  className,
}: TProductListFilteredContainerProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, error, pageNum, totalPages } = useProducts();

  function handlePageChange(page: number) {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }

  const data = {
    products: {
      list: products,
      isLoading,
      error,
      currentPage: pageNum,
      totalPages,
    },
  };
  return (
    <ProductListFiltered
      className={className}
      data={data}
      onPageChange={handlePageChange}
    />
  );
}

export default ProductListFilteredContainer;
