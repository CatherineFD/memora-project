import { vocabularyClient } from './client';
import type { 
  CreateCardPayload, 
  CreateCardResponse, 
  CardDetail, 
  CardListResponse,
} from '@repo/types';

export const cardsApi = {
  /**
   * Создание новой карточки
   */
  create: (payload: CreateCardPayload) => {
    return vocabularyClient.post<CreateCardResponse>('/cards', payload);
  },

  /**
   * Получение детальной информации о карточке по ID
   */
  getById: (cardId: number) => {
    return vocabularyClient.get<CardDetail>(`/cards/${cardId}`);
  },

  /**
   * Получение списка карточек с фильтрацией и пагинацией
   */
  getList: (params?: {
    page?: number;
    limit?: number;
    dictionary_id?: number;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.dictionary_id) queryParams.append('dictionary_id', params.dictionary_id.toString());
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    return vocabularyClient.get<CardListResponse>(
      `/cards${queryString ? `?${queryString}` : ''}`
    );
  },

  /**
   * Обновление карточки (частичное обновление)
   */
  update: (cardId: number, payload: Partial<CreateCardPayload>) => {
    return vocabularyClient.put<CardDetail>(`/cards/${cardId}`, payload);
  },

  /**
   * Удаление карточки по ID
   */
  deleteById: (cardId: number) => {
    return vocabularyClient.delete(`/cards/${cardId}`);
  }
};