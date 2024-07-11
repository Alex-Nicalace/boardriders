import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AppLayout from './components/AppLayout';
import CatalogPage from './pages/CatalogPage';
import ScreenWidthProvider from './Context/ScreenWidthContext';
import Popup from './component-library/Popup';
import ProductPage from './pages/ProductPage';
import CheckOutPage from './pages/CheckOutPage';
import FormatersProvider from './Context/FormatersContext';
import AccountPage from './pages/AccountPage';
import FavouritesPage from './pages/FavouritesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        errorElement: <>error</>,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: '/catalog',
            element: <CatalogPage />,
          },
          {
            path: '/product',
            element: <ProductPage />,
          },
          {
            path: '/check-out',
            element: <CheckOutPage />,
          },
          {
            path: '/account',
            element: <AccountPage />,
          },
          {
            path: '/favourites',
            element: <FavouritesPage />,
          },
          {
            path: '*',
            element: <MainPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ScreenWidthProvider>
      <FormatersProvider>
        <Popup>
          <RouterProvider router={router} />
        </Popup>
      </FormatersProvider>
    </ScreenWidthProvider>
  );
}

export default App;
