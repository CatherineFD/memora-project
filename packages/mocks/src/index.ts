import { authHandlers, userHandlers } from './handlers/user-mfe/index';
import { cardHandlers, studyHandlers, dictionaryHandlers } from './handlers/vocabulary-mfe/index';

export const userMFEHandlers = [
  ...authHandlers,
  ...userHandlers,
]

export const vocabularyMFEHandlers = [
  ...cardHandlers,
  ...studyHandlers,
  ...dictionaryHandlers,
]