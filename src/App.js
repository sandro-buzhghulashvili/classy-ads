import React from 'react';

import LayoutPage from './pages/Layout';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children : [
      {
        index : true,
        element : <LandingPage />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
