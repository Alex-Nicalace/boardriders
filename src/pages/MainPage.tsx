import Header from '../components/Header';
import MainSlider from '../components/MainSlider';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page">
        <MainSlider />
      </main>
    </>
  );
}

export default MainPage;
