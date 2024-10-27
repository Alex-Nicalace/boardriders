import Empty from '../../components/Empty';
import ErrorMessage from '../../components/ErrorMessage';
import FavouriteList, { TupleIWareData3 } from '../../components/FavouriteList';
import Spinner from '../../components/Spinner';
import { useWishListProducts } from './useWishListProducts';

// type TFavouriteListContainerProps = { }
function FavouriteListContainer(/*{ }: TFavouriteListContainerProps*/): JSX.Element {
  const { products, isLoading, error } = useWishListProducts({
    useFavouriteList3: true,
  });

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!products?.length) return <Empty resource="избранное" />;

  return <FavouriteList data={products as TupleIWareData3} />;
}

export default FavouriteListContainer;
