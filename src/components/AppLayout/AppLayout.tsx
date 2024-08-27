import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Popup from '../../component-library/Popup';
import ModalWrap from '../ModalWrap';
import LoginOrRegister from '../LoginOrRegister';
import { useGenderCategories } from '../../features/categories/useCategories';
import Spinner from '../Spinner';
import { ScrollToAnchor, ScrollToTop } from '../../component-library/Scroll';

function AppLayout(): JSX.Element {
  const { isLoading } = useGenderCategories();

  if (isLoading) return <Spinner />;

  return (
    <>
      <ScrollToTop />
      <ScrollToAnchor />
      <Header />
      <Outlet />
      <Footer />
      <Popup.Window
        mode="modal"
        transitionEffect={['fade']}
        windowName="login"
        render={(close) => (
          <ModalWrap close={close}>
            <LoginOrRegister />
          </ModalWrap>
        )}
        onClickOutside={(close) => close()}
      />
    </>
  );
}

export default AppLayout;
