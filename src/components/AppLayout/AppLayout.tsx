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
    <Popup>
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
            <LoginOrRegister onSuccess={close} />
          </ModalWrap>
        )}
        onClickOutside={(close) => close()}
      />

      <Popup.Window
        mode="modal"
        transitionEffect={['fade']}
        windowName="register"
        render={(close) => (
          <ModalWrap close={close}>
            <LoginOrRegister onSuccess={close} initialTab={1} />
          </ModalWrap>
        )}
        onClickOutside={(close) => close()}
      />
    </Popup>
  );
}

export default AppLayout;
