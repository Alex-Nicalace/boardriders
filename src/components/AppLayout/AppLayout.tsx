import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Popup from '../../component-library/Popup';
import ModalWrap from '../ModalWrap';
import LoginOrRegister from '../LoginOrRegister';
import { useGenderCategories } from '../../features/categories/useGenderCategories';
import Spinner from '../Spinner';
import HeaderCartContainer from '../../features/authentication/HeaderCartContainer';

type TAppLayoutProps = { useHeaderCart?: boolean };
function AppLayout({ useHeaderCart }: TAppLayoutProps): JSX.Element {
  const { isLoading } = useGenderCategories();

  if (isLoading) return <Spinner />;

  return (
    <Popup>
      <ScrollRestoration />
      {useHeaderCart ? <HeaderCartContainer /> : <Header />}
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
