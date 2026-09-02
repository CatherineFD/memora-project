import { authHandlers, userHandlers } from './handlers/user-mfe/index';

export const userMFEHandlers = [
  ...authHandlers,
  ...userHandlers,
]