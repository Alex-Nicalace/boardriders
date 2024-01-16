import { Link } from 'react-router-dom';
import Picture, { IPictureProps } from '../Picture';
import './Promotion.scss';

interface IPromotionProps extends IPictureProps {
  to: string;
}
function Promotion({ sources, img, to }: IPromotionProps): JSX.Element {
  return (
    <section className="promotion">
      <div className="promotion__container">
        <h2 className="promotion__title">Название Акции</h2>
        <p className="promotion__descr">
          Меня не спрашивали, а надо было спросить, что означает имя Заратустры
          именно в моих устах — в устах первого имморалиста: ведь то, в чём
          состоит неслыханная уникальность этого перса в истории, являет собою
          противоположность как раз этому.{' '}
        </p>
        <Link className="promotion__link" to={to}>
          <Picture
            sources={sources}
            img={{ ...img, className: 'promotion__img' }}
          />
        </Link>
      </div>
    </section>
  );
}

export default Promotion;
