import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AppLayout from './components/AppLayout';
import CatalogPage from './pages/CatalogPage';
import ScreenWidthProvider from './Context/ScreenWidthContext';

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
      <RouterProvider router={router} />
    </ScreenWidthProvider>
  );
}

export default App;
