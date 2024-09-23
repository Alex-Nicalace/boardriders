import toast from 'react-hot-toast';
import { addWishList, getWishList, removeWishList } from '../wishListSlise';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import Favorite, { TFavoriteProps } from '../../../components/ui/Favorite';
import { useUser } from '../../authentication/useUser';
import { useFavorites } from '../../favorites/useFavorites';
import { useCreateFavorites } from '../../favorites/useCreateFavorites';
import { useDeleteFavorites } from '../../favorites/useDeleteFavorites';

type TButtonWishListProps = Omit<
  TFavoriteProps,
  'checked' | 'defaultChecked' | 'onChange'
> & { productId: number };
function ButtonWishList({
  productId,
  ...props
}: TButtonWishListProps): JSX.Element {
  const { isAuthenticated, user } = useUser();
  const { id: userId } = user || {};

  const { favoritesIds } = useFavorites(isAuthenticated);
  const { createFavorites, isCreating } = useCreateFavorites();
  const { deleteFavorites, isDeleting } = useDeleteFavorites();
  const isPending = isCreating || isDeleting;

  const wishList = useAppSelector(getWishList);
  const dispatch = useAppDispatch();

  const isWished =
    isAuthenticated && favoritesIds
      ? favoritesIds.has(productId)
      : wishList.includes(productId);

  function deleteWishList(productId: number) {
    if (isAuthenticated) {
      deleteFavorites(productId);
    } else {
      dispatch(removeWishList(productId));
    }
  }

  function createWishList(productId: number) {
    if (isAuthenticated) {
      if (!userId) {
        toast.error(
          'Не удалось добавить в избранное, т.к. нет данных пользователя!'
        );
        return;
      }
      createFavorites({ productId, userId });
    } else {
      dispatch(addWishList(productId));
    }
  }

  function handleChange(productId: number) {
    if (isWished) {
      deleteWishList(productId);
    } else {
      createWishList(productId);
    }
  }
  return (
    <Favorite
      {...props}
      checked={isWished}
      disabled={isPending}
      onChange={() => handleChange(productId)}
    />
  );
}

export default ButtonWishList;
