import { addWishList, getWishList, removeWishList } from '../wishListSlise';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import Favorite, { TFavoriteProps } from '../../../components/ui/Favorite';

type TButtonWishListProps = Omit<
  TFavoriteProps,
  'checked' | 'defaultChecked' | 'onChange'
> & { productId: number };
function ButtonWishList({
  productId,
  ...props
}: TButtonWishListProps): JSX.Element {
  const wishList = useAppSelector(getWishList);
  const dispatch = useAppDispatch();
  const isWished = wishList.includes(productId);

  function handleChange(id: number) {
    if (isWished) {
      dispatch(removeWishList(id));
    } else {
      dispatch(addWishList(id));
    }
  }
  return (
    <Favorite
      {...props}
      checked={isWished}
      onChange={() => handleChange(productId)}
    />
  );
}

export default ButtonWishList;
