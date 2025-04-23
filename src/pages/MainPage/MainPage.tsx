import './MainPage.scss';
import DualBanners from '../../components/DualBaners';
import MainSlider from '../../components/MainSlider';
import Promotion from '../../components/Promotion';
import BlogsSlider from '../../components/BlogsSlider';
import JoinAndSubscrube from '../../components/JoinAndSubscrube/JoinAndSubscrube';
import Title from '../../components/ui/Title';
import Button from '../../components/ui/Button';
import PageContent from '../../components/PageContent';
import NewProductsSlider from '../../features/products/NewProductsSlider';
import PopularProductsSlider from '../../features/products/PopularProductsSlider';
import LinksBrandsContainer from '../../features/brands/LinksBrandsContainer';
import img1 from '../../assets/img/promotion/01.jpg';
import img1Small from '../../assets/img/promotion/01-small.jpg';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <PageContent className="main-page" as="main">
      <MainSlider className="main-page__main-slider" />
      <LinksBrandsContainer className="main-page__links-brands" />
      <DualBanners className="main-page__dual-baners" />
      <div className="main-page__box-slider-ware">
        <Title
          className="main-page__title-slider main-page__container"
          kind="h1-32-h2-21"
          as="h2"
        >
          Новинки
        </Title>
        <NewProductsSlider className="main-page__slider-ware" />
        <div className="main-page__container main-page__button-more">
          <Button to="catalog">Показать больше</Button>
        </div>
      </div>
      <Promotion
        className="main-page__promotion"
        to="catalog"
        sources={[
          {
            media: '(min-width: 768px)',
            srcSet: img1,
          },
          {
            media: '(max-width: 767px)',
            srcSet: img1Small,
          },
        ]}
        img={{
          alt: 'promotion',
          src: img1Small,
        }}
      />
      <div className="main-page__box-slider-ware">
        <Title
          className="main-page__title-slider main-page__container"
          kind="h1-32-h2-21"
          as="h2"
        >
          Топ продаж
        </Title>
        <PopularProductsSlider className="main-page__slider-ware" />
        <div className="main-page__container main-page__button-more">
          <Button to="#">Показать больше</Button>
        </div>
      </div>
      <BlogsSlider className="main-page__blogs-slider" />
      <JoinAndSubscrube className="main-page__join-and-subscrube" />
    </PageContent>
  );
}

export default MainPage;
