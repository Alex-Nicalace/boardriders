import ListLinks from '../../component-library/ListLinks';
import Banner from './Banner';
import './DualBanners.scss';

const PATH = '/src/assets/img/dual-banners/';
const BANNERS_DATA = [
  {
    img: '01.jpg',
    to: '#',
    title: 'НАЗВАНИЕ АКЦИИ №1',
  },
  {
    img: '02.jpg',
    to: '#',
    title: 'НАЗВАНИЕ АКЦИИ №2',
  },
];

export type TBannerData = (typeof BANNERS_DATA)[number];

// interface IDualBanersProps {}
function DualBanners(): JSX.Element {
  return (
    <div className="dual-baners">
      <div className="dual-baners__container">
        <ListLinks
          linksData={BANNERS_DATA}
          listProps={{ className: 'dual-baners__list' }}
          itemProps={{ className: 'dual-baners__item' }}
          renderToItem={(value) => {
            const { img, to, title } = value;
            return <Banner img={`${PATH}${img}`} title={title} to={to} />;
          }}
        />
      </div>
    </div>
  );
}

export default DualBanners;
