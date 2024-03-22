import DualBanners from '../../components/DualBaners';
import LinksBrands from '../../components/LinksBrands';
import MainSlider from '../../components/MainSlider';
import Promotion from '../../components/Promotion';
import NewProducts from '../../components/NewProducts';
import PopularCollection from '../../components/PopularCollection';
import BlogsSlider from '../../components/BlogsSlider';
import JoinAndSubscrube from '../../components/JoinAndSubscrube/JoinAndSubscrube';
import Main from '../../components/Main';
import './MainPage.scss';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <Main className="main-page">
      <MainSlider className="main-page__main-slider" />
      <LinksBrands className="main-page__links-brands" />
      <DualBanners className="main-page__dual-baners" />
      <NewProducts className="main-page__products" />
      <Promotion
        className="main-page__promotion"
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
      <PopularCollection className="main-page__products" />
      <BlogsSlider className="main-page__blogs-slider" />
      <JoinAndSubscrube className="main-page__join-and-subscrube" />
    </Main>
  );
}

export default MainPage;
