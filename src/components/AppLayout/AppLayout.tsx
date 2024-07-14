import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Popup from '../../component-library/Popup';
import ModalWrap from '../ModalWrap';
import LoginOrRegister from '../LoginOrRegister';

// type TAppLayoutProps = {};
function AppLayout(): JSX.Element {
  return (
    <>
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
