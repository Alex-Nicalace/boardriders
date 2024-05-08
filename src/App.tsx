import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AppLayout from './components/AppLayout';
import CatalogPage from './pages/CatalogPage';
import ScreenWidthProvider from './Context/ScreenWidthContext';
import Popup from './component-library/Popup';
import ProductPage from './pages/ProductPage';
import CheckOut from './pages/CheckOut';

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
            path: '/card-item',
            element: <ProductPage />,
          },
          {
            path: '/check-out',
            element: <CheckOut />,
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
      <Popup>
        <RouterProvider router={router} />
      </Popup>
    </ScreenWidthProvider>
  );
}

export default App;
