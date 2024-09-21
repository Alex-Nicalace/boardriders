import IconButton from '../../../components/ui/IconButton';
import { StarIcon } from '../../../components/ui/Icons';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useUser } from '../../authentication/useUser';
import { useFavorites } from '../../favorites/useFavorites';
import { getWishList } from '../wishListSlise';

type TButtonToWishListPageProps = { className?: string };
function ButtonToWishListPage({
  className,
}: TButtonToWishListPageProps): JSX.Element {
  const { isAuthenticated } = useUser();
  const { count: wishListRemote } = useFavorites(isAuthenticated);

  const wishListLocal = useAppSelector(getWishList);

  const count =
    isAuthenticated && wishListRemote ? wishListRemote : wishListLocal.length;

  return (
    <IconButton
      className={className}
      IconComponent={StarIcon}
      to="/wishlist"
      badgeCounter={count || undefined}
    >
      Избранное
    </IconButton>
  );
}

export default ButtonToWishListPage;
