import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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
import RootRedirect from './components/RootRedirect';
import store from './store';

// Создание клиента
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60, // время жизни кеша
    },
  },
});

/**
 * * рекомендуемый маршрутизатор для всех веб-проектов React Router
 * ! сдедует создавать вне компонентов
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // * равносильно Component: AppLayout
    errorElement: <>error</>, // ! создан беспутный маршрут чтобы для всех дочерних страниц был один и тот же компонент ОШИБКИ
    children: [
      {
        errorElement: <>error</>, // ! создан беспутный маршрут чтобы для всех дочерних страниц был один и тот же компонент ОШИБКИ. т.е. сделана некая обертка для общего поведения маршрутов
        children: [
          {
            index: true,
            element: <RootRedirect />,
          },
          {
            path: ':categoryGender',
            element: <MainPage />,
          },
          {
            path: ':categoryGender/catalog/:category',
            element: <CatalogPage />,
          },
          {
            path: ':categoryGender/brand/:brand/catalog/:category?',
            element: <CatalogPage isCatalogBrand />,
          },

          {
            path: '/product/:productId',
            element: <ProductPage />,
          },
          {
            path: 'check-out',
            element: <CheckOutPage />,
          },
          {
            path: 'account',
            element: <AccountPage />,
          },
          {
            path: 'favourites',
            element: <FavouritesPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    // Поставщик данных для приложения
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
