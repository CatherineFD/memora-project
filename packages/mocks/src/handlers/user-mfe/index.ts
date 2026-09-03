import { registerHandler, loginHandler, logoutHandler } from './auth';
import { getMeHandler } from './users';

export const authHandlers = [
  registerHandler,
  loginHandler,
  logoutHandler,
];

export const userHandlers = [
  getMeHandler,
];