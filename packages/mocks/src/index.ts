import { authHandlers, userHandlers } from './handlers/user-mfe/index';

export const allHandlers = [
  ...authHandlers,
  ...userHandlers,
]