import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const HomePage = lazy(() => import('../pages/home/page'));
const BrandDetailPage = lazy(() => import('../pages/brand/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/brands/:slug',
    element: <BrandDetailPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;