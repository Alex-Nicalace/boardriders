import { Link } from 'react-router-dom';
import { TBannerData } from '../DualBanners';
import './Banner.scss';

interface IBannerProps extends TBannerData {}
function Banner({ img, title, to }: IBannerProps): JSX.Element {
  return (
    <Link className="banner" to={to}>
      <img className="banner__img" src={img} alt={title} />
      <h3 className="banner__title">{title}</h3>
    </Link>
  );
}

export default Banner;
