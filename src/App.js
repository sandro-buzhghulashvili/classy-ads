import React from 'react';

import LayoutPage from './pages/Layout';
import UserContextProvider from './providers/UserContextProvider';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/Landing';
import ErrorPage from './pages/Error';
import FormPage from './pages/Form';
import ProfilePage from './pages/Profile';
import ProductsPage, { loader as productsLoader } from './pages/Products';
import NewAd from './pages/NewAd';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'form',
        element: <FormPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'ads',
        element: <ProductsPage />,
        loader: productsLoader,
      },
      {
        path: 'new',
        element: <NewAd />
      },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
