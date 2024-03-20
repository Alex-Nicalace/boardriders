import { Link } from 'react-router-dom';
import './Banner.scss';

interface TBannerProps {
  img: string;
  to: string;
  title: string;
  kind?: 'second' | '';
}
function Banner({ img, title, to, kind = '' }: TBannerProps): JSX.Element {
  const modificator = kind ? `banner_${kind}` : '';

  return (
    <Link className={`banner ${modificator}`} to={to}>
      <img className="banner__img" src={img} alt={title} />
      <h3 className="banner__title">{title}</h3>
    </Link>
  );
}

export default Banner;
