import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

// type TAppLayoutProps = {};
function AppLayout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
