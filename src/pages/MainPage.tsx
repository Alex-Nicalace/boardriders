import DualBanners from '../components/DualBaners';
import LinksBrands from '../components/LinksBrands';
import MainSlider from '../components/MainSlider';
import Promotion from '../components/Promotion';
import NewProducts from '../components/NewProducts';
import PopularCollection from '../components/PopularCollection';
import BlogsSlider from '../components/BlogsSlider';
import JoinAndSubscrube from '../components/JoinAndSubscrube/JoinAndSubscrube';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <>
      <MainSlider />
      <LinksBrands />
      <DualBanners />
      <NewProducts />
      <Promotion
        to="#"
        sources={[
          {
            media: '(min-width: 768px)',
            srcSet: '/src/assets/img/promotion/01.jpg',
          },
          {
            media: '(max-width: 767px)',
            srcSet: '/src/assets/img/promotion/01-small.jpg',
          },
        ]}
        img={{
          alt: 'promotion',
          src: '/src/assets/img/promotion/01-small.jpg',
        }}
      />
      <PopularCollection />
      <BlogsSlider />
      <JoinAndSubscrube />
    </>
  );
}

export default MainPage;
