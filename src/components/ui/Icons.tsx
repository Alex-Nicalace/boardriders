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
import ArrowLeftThinIcon from './../../assets/icons/arrow-left-thin.svg?react';
import ArrowRightThinIcon from './../../assets/icons/arrow-right-thin.svg?react';
import AnthropometricIcon from './../../assets/icons/anthropometric.svg?react';
import DynamicsIcon from './../../assets/icons/dynamics.svg?react';
import MountainIcon from './../../assets/icons/mountain.svg?react';
import CheckIcon from './../../assets/icons/check.svg?react';
import DeliveryIcon from './../../assets/icons/delivery.svg?react';
import ShopIcon from './../../assets/icons/shop.svg?react';
import LocationUnderlineIcon from './../../assets/icons/location-underline.svg?react';
import CloseIcon from './../../assets/icons/close.svg?react';
import CheckStepIcon from './../../assets/icons/check-step.svg?react';
import GiftIcon from './../../assets/icons/gift.svg?react';
import DiscountIcon from './../../assets/icons/discount.svg?react';
import QuestionInCircleIcon from './../../assets/icons/question-in-circle.svg?react';
import ExclamationInCircleIcon from './../../assets/icons/exclamation-in-circle.svg?react';
import AlertIcon from './../../assets/icons/alert.svg?react';
import BagIcon from './../../assets/icons/bag.svg?react';

function TrackIcon(
  props: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>
) {
  return <img {...props} src={Track} alt="иконка грузовика" />;
}

function ArrowLeftIcon(
  props: React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
) {
  return <ArrowRightIcon style={{ transform: 'rotate(180deg)' }} {...props} />;
}

function ArrowLeftClassic(
  props: React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
) {
  return (
    <ArrowRightClassic style={{ transform: 'rotate(180deg)' }} {...props} />
  );
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
  ArrowLeftThinIcon,
  ArrowRightThinIcon,
  AnthropometricIcon,
  DynamicsIcon,
  MountainIcon,
  CheckIcon,
  ArrowLeftClassic,
  DeliveryIcon,
  ShopIcon,
  LocationUnderlineIcon,
  CloseIcon,
  CheckStepIcon,
  GiftIcon,
  DiscountIcon,
  QuestionInCircleIcon,
  ExclamationInCircleIcon,
  AlertIcon,
  BagIcon,
};
