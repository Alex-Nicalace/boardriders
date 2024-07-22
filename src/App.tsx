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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Создание клиента
const queryClient = new QueryClient();

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
    // Поставщик данных для приложения
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ScreenWidthProvider>
        <FormatersProvider>
          <Popup>
            <RouterProvider router={router} />
          </Popup>
        </FormatersProvider>
      </ScreenWidthProvider>
    </QueryClientProvider>
  );
}

export default App;
