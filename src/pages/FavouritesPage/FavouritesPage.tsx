import { useSearchParams } from 'react-router-dom';
import PageContent from '../../components/PageContent';
import SortBy, { SORT_OPTIONS } from '../../components/SortBy';
import Pagination from '../../components/ui/Pagination';
import ProductList from '../../components/ProductList';
import Title from '../../components/ui/Title';
import { useScreenWidth } from '../../Context/useScreenWidthContext';
import { useWishListProducts } from '../../features/wishList/useWishListProducts';
import './FavouritesPage.scss';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';

// type TFavouritesPageProps = { }
function FavouritesPage(/*{ }: TFavouritesPageProps*/): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLessMobileSmall } = useScreenWidth();
  const { products, isLoading, totalPages, pageNum, error } =
    useWishListProducts();

  function handlePageChange(page: number) {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  }

  return (
    <PageContent className="favourites-page" as="main" paddingTop="50-15">
      <div className="favourites-page__container">
        <Title className="favourites-page__title" as="h2" kind="h2-21-16">
          {isLessMobileSmall ? 'Избранные товары' : 'Избранное'}
        </Title>
        <SortBy
          className="favourites-page__sort"
          label={!isLessMobileSmall && 'Сортировать по'}
          options={SORT_OPTIONS}
        />
        {isLoading && (
          <div className="favourites-page__product-list">
            <Spinner />
          </div>
        )}
        {!isLoading && !products?.length && !error && (
          <Empty
            className="favourites-page__product-list"
            resource="избранные товары"
          />
        )}
        {!isLoading && error && (
          <ErrorMessage
            className="favourites-page__product-list"
            message={error.message}
          />
        )}
        {!isLoading && !!products?.length && (
          <>
            <ProductList
              className="favourites-page__product-list"
              data={products}
              isTransitionGroup
              animateDuration={1000}
            />
            {totalPages > 1 && (
              <Pagination
                className="favourites-page__pagination"
                currentPage={pageNum}
                totalPages={totalPages}
                visiblePageNumbers={4}
                isShowNavigationButtons={!isLessMobileSmall}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </PageContent>
  );
}

export default FavouritesPage;
