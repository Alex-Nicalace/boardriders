import IconButton from '../../../components/ui/IconButton';
import { StarIcon } from '../../../components/ui/Icons';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { getWishList } from '../wishListSlise';

type TButtonToWishListPageProps = { className?: string };
function ButtonToWishListPage({
  className,
}: TButtonToWishListPageProps): JSX.Element {
  const wishList = useAppSelector(getWishList);
  const count = wishList.length;

  return (
    <IconButton
      className={className}
      IconComponent={StarIcon}
      to="/"
      badgeCounter={count || undefined}
    >
      Избранное
    </IconButton>
  );
}

export default ButtonToWishListPage;
