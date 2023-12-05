import SelectIcon from '/src/assets/icons/select.svg?react';
import LocationIcon from '/src/assets/icons/location.svg?react';
import Track from '/src/assets/icons/track.png';
import Refund from '/src/assets/icons/refund.svg?react';
import PayLocation from '/src/assets/icons/pay-location.svg?react';

function TrackIcon(
  params: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>
) {
  return <img {...params} src={Track} alt="иконка грузовика" />;
}

export { SelectIcon, LocationIcon, TrackIcon, Refund, PayLocation };
