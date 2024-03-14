import SelectIcon from './../../assets/icons/select.svg?react';
import LocationIcon from './../../assets/icons/location.svg?react';
import Track from './../../assets/icons/track.png';
import RefundIcon from './../../assets/icons/refund.svg?react';
import PayLocation from './../../assets/icons/pay-location.svg?react';
import AvatarIcon from './../../assets/icons/avatar.svg?react';
import StarIcon from './../../assets/icons/star.svg?react';
import CartIcon from './../../assets/icons/cart.svg?react';
import SearchIcon from './../../assets/icons/search.svg?react';
import ArrowRightIcon from './../../assets/icons/arrow-right.svg?react';
import EmailIcon from './../../assets/icons/email.svg?react';
import EnterIcon from './../../assets/icons/enter.svg?react';
import ArrowRightClassic from './../../assets/icons/arrow-right-classic.svg?react';
import Facebook from './../../assets/icons/socials/facebook.svg?react';
import Instagram from './../../assets/icons/socials/instagram.svg?react';
import Twitch from './../../assets/icons/socials/twitch.svg?react';
import Twitter from './../../assets/icons/socials/twitter.svg?react';
import Youtube from './../../assets/icons/socials/youtube.svg?react';
import TelephoneIcon from './../../assets/icons/telephone.svg?react';

function TrackIcon(
  params: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>
) {
  return <img {...params} src={Track} alt="иконка грузовика" />;
}

function ArrowLeftIcon(
  params: React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
) {
  return <ArrowRightIcon style={{ transform: 'rotate(180deg)' }} {...params} />;
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
  ArrowRightIcon,
  ArrowLeftIcon,
  EmailIcon,
  EnterIcon,
  ArrowRightClassic,
  Facebook,
  Instagram,
  Twitch,
  Twitter,
  Youtube,
  TelephoneIcon,
};
