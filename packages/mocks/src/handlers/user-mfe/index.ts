import { registerHandler, loginHandler } from './auth';

export const authHandlers = [
  registerHandler,
  loginHandler,
];

export const userHandlers = [];