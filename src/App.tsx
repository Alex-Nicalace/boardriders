import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AppLayout from './components/AppLayout';
import Catalog from './pages/Catalog';

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
            element: <Catalog />,
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
  return <RouterProvider router={router} />;
}

export default App;
