import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicLayout from '../components/PublicLayout';
import MainLayout from '../components/MainLayout';
import {
    LoginMFE,
    RegisterMFE,
    UserMFE,
    VocabularyMFE,
} from '../lazy-components';

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
  meta?: {
    requiresAuth?: boolean;
    roles?: string[];
    title?: string;
  };
}

// Функция для преобразования AppRoute в RouteObject
const convertToRouteObject = (route: AppRoute): RouteObject => {
  return {
    path: route.path,
    element: route.element,
    children: route.children?.map(convertToRouteObject),
  };
};

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <LoginMFE />,
        meta: { title: 'Вход' },
      },
      {
        path: 'register',
        element: <RegisterMFE />,
        meta: { title: 'Регистрация' },
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        path: 'user/*',
        element: <UserMFE />,
        meta: { 
          requiresAuth: true,
          title: 'Профиль пользователя' 
        },
      },
      {
        path: 'vocabulary/*',
        element: <VocabularyMFE />,
        meta: { 
          requiresAuth: true,
          title: 'Словарь' 
        },
      },
    ],
  },
  {
    path: '*',
    element: <div>404: Страница не найдена</div>,
  },
];

export const routeObjects: RouteObject[] = routes.map(convertToRouteObject);