import DualBanners from '../components/DualBaners';
import Header from '../components/Header';
import LinksBrands from '../components/LinksBrands';
import MainSlider from '../components/MainSlider';
import Products from '../components/Products';

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
      </main>
    </>
  );
}

export default MainPage;
