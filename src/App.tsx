import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage';
import AppLayout from './components/AppLayout';
import CatalogPage from './pages/CatalogPage';
import ScreenWidthProvider from './Context/ScreenWidthContext';
import ProductPage from './pages/ProductPage';
import CheckOutPage from './pages/CheckOutPage';
import AccountPage from './pages/AccountPage';
import FavouritesPage from './pages/FavouritesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootRedirect from './components/RootRedirect';
import store from './store';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorMessage from './components/ErrorMessage';
import GenderInitializer from './features/gender/GenderInitializer';
import OrderPlacedContainer from './features/makeOrder/OrderPlacedContainer';

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
    errorElement: <ErrorMessage isGoBack isHeightScreen />, // ! создан беспутный маршрут чтобы для всех дочерних страниц был один и тот же компонент ОШИБКИ
    children: [
      {
        errorElement: <ErrorMessage />, // ! создан беспутный маршрут чтобы для всех дочерних страниц был один и тот же компонент ОШИБКИ. т.е. сделана некая обертка для общего поведения маршрутов
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
            path: ':categoryGender/catalog/:category?',
            element: <CatalogPage />,
          },
          {
            path: ':categoryGender/brand/:brand/catalog/:category?',
            element: <CatalogPage isCatalogBrand />,
          },
          {
            path: 'product/:productId',
            element: <ProductPage />,
          },
          {
            path: 'wishlist',
            element: <FavouritesPage />,
          },
          // Группа защищённых маршрутов
          {
            element: <ProtectedRoute />, // родительский компонент для защищённых маршрутов
            children: [
              {
                path: 'account',
                element: <AccountPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/cart',
    element: <AppLayout useHeaderCart />,
    errorElement: <ErrorMessage isGoBack isHeightScreen />,
    children: [
      {
        errorElement: <ErrorMessage />,
        children: [
          {
            index: true,
            element: <CheckOutPage />,
          },
          {
            path: 'order-placed/:orderId',
            element: <OrderPlacedContainer />,
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
        <GenderInitializer />
        <ScreenWidthProvider>
          <RouterProvider router={router} />
        </ScreenWidthProvider>
      </QueryClientProvider>

      <Toaster />
    </Provider>
  );
}

export default App;
