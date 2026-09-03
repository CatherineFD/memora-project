import { vocabularyClient } from './client';
import type { 
  DictionaryPayload, 
  DictionaryResponse, 
  Dictionary, 
} from '@repo/types';

export const dictionaryApi = {
  /**
   * Создание нового словаря
   */
  create: (payload: DictionaryPayload) => {
    return vocabularyClient.post<DictionaryResponse>('/dictionary/create', payload);
  },

  /**
   * Получение детальной информации о словаре по ID
   */
  getById: (dictionaryId: number) => {
    return vocabularyClient.get<Dictionary>(`/dictionary/${dictionaryId}`);
  },

  /**
   * Удаление словаря по ID
   */
  deleteById: (dictionaryId: number) => {
    return vocabularyClient.delete(`/dictionary/${dictionaryId}`);
  },

  getDictionaryList: () => {
    return vocabularyClient.get(`/dictionary/list`);
  },
};