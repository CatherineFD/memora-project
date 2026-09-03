import { vocabularyClient } from './client';
import type { 
  StudiedWordsListPayload, 
  StudiedWordsListResponse,
  SessionResultPayload, 
} from '@repo/types';

export const studyApi = {
  /**
   * Получение списка слов для изучения
   */
  getStudiedWordsList: (payload: StudiedWordsListPayload) => {
    return vocabularyClient.get<StudiedWordsListResponse>(`/study/words?count=${payload.count}`);
  },

  saveSessionResult: (payload: SessionResultPayload) => {
    return vocabularyClient.post(`/study/save`, payload);
  } 
};