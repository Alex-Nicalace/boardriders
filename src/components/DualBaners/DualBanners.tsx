import ListLinks from '../../component-library/ListLinks';
import Banner from '../ui/Banner';

import img1 from '../../assets/img/dual-banners/01.jpg';
import img2 from '../../assets/img/dual-banners/02.jpg';

import './DualBanners.scss';

const BANNERS_DATA = [
  {
    img: img1,
    to: '#',
    title: 'НАЗВАНИЕ АКЦИИ №1',
  },
  {
    img: img2,
    to: '#',
    title: 'НАЗВАНИЕ АКЦИИ №2',
  },
];

type TDualBanersProps = { className?: string };
function DualBanners({ className = '' }: TDualBanersProps): JSX.Element {
  return (
    <div className={`${className} dual-baners`}>
      <div className="dual-baners__container">
        <ListLinks
          linksData={BANNERS_DATA}
          listProps={{ className: 'dual-baners__list' }}
          itemProps={{ className: 'dual-baners__item' }}
          renderToItem={(value) => {
            const { img, title } = value;
            return <Banner img={img} title={title} to={`catalog`} />;
          }}
        />
      </div>
    </div>
  );
}

export default DualBanners;
