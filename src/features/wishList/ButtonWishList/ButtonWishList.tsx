import Favorite, { TFavoriteProps } from '../../../components/ui/Favorite';
import { useRemoveWishList } from '../useRemoveWishList';
import { useUpsertWishList } from '../useUpsertWishList';
import { useWishList } from '../useWishList';

type TButtonWishListProps = Omit<
  TFavoriteProps,
  'checked' | 'defaultChecked' | 'onChange'
> & { productId: number };
function ButtonWishList({ productId, ...props }: TButtonWishListProps) {
  const { productIds: wishListProductIds } = useWishList();
  const { upsertWishList, isUpserting } = useUpsertWishList();
  const { removeWishList, isDeleting } = useRemoveWishList();
  const isPending = isUpserting || isDeleting;

  if (!wishListProductIds) return null;

  const isWished = wishListProductIds.includes(productId);

  function deleteWishList(productId: number) {
    removeWishList(productId);
  }

  function createWishList(productId: number) {
    upsertWishList(productId);
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
