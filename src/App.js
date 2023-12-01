import React from 'react';

import LayoutPage from './pages/Layout';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/Landing';
import ErrorPage from './pages/Error';
import FormPage from './pages/Form';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
