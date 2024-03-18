import { Outlet } from 'react-router-dom';
import BurgerProvider from '../../Context/BurgerContext';
import Footer from '../Footer';
import Header from '../Header';

// type TAppLayoutProps = {};
function AppLayout(): JSX.Element {
  return (
    <BurgerProvider>
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </BurgerProvider>
  );
}

export default AppLayout;
