import DualBanners from '../components/DualBaners';
import Header from '../components/Header';
import LinksBrands from '../components/LinksBrands';
import MainSlider from '../components/MainSlider';
import Products from '../components/Products';
import Promotion from '../components/Promotion';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page">
        <MainSlider />
        <LinksBrands />
        <DualBanners />
        <Products />
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
      </main>
    </>
  );
}

export default MainPage;
