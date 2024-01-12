import DualBanners from '../components/DualBaners';
import Header from '../components/Header';
import LinksBrands from '../components/LinksBrands';
import MainSlider from '../components/MainSlider';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page">
        <MainSlider />
        <LinksBrands />
        <DualBanners />
      </main>
    </>
  );
}

export default MainPage;
