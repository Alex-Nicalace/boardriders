import IconButton from '../../../components/ui/IconButton';
import { StarIcon } from '../../../components/ui/Icons';
import { useWishList } from '../useWishList';

type TButtonToWishListPageProps = { className?: string };
function ButtonToWishListPage({
  className,
}: TButtonToWishListPageProps): JSX.Element {
  const { count } = useWishList();

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
