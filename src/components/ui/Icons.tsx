import SelectIcon from '/src/assets/icons/select.svg?react';
import LocationIcon from '/src/assets/icons/location.svg?react';
import Track from '/src/assets/icons/track.png';
import RefundIcon from '/src/assets/icons/refund.svg?react';
import PayLocation from '/src/assets/icons/pay-location.svg?react';
import AvatarIcon from '/src/assets/icons/avatar.svg?react';
import StarIcon from '/src/assets/icons/star.svg?react';
import CartIcon from '/src/assets/icons/cart.svg?react';
import SearchIcon from '/src/assets/icons/search.svg?react';
import ArrowLeftIcon from '/src/assets/icons/arrow-left.svg?react';

function TrackIcon(
  params: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>
) {
  return <img {...params} src={Track} alt="иконка грузовика" />;
}

export {
  SelectIcon,
  LocationIcon,
  TrackIcon,
  RefundIcon,
  PayLocation,
  AvatarIcon,
  StarIcon,
  CartIcon,
  SearchIcon,
  ArrowLeftIcon,
};
