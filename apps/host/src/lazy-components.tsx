import { lazy } from 'react';

export const LoginMFE = lazy(() => import('user_mfe/Login'));
export const RegisterMFE = lazy(() => import('user_mfe/Register'));
export const UserMFE = lazy(() => import('user_mfe/App'));
export const VocabularyMFE = lazy(() => import('vocabulary_mfe/App'));