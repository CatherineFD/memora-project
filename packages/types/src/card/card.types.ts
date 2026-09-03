import type { IsoDateString } from '../common';
import type { Dictionary } from '../dictionary';

export interface Sentence {
  id: number;
  sentence_en: string;
  sentence_ru: string;
  created_at: IsoDateString;
}

export interface CardDictionary {
  id: number;
  name: string;
}

// export interface CardProgress {
//   stage: number;
//   interval_days: number;
//   next_review_at: IsoDateString;
// }

export enum CardStatus {
  unknown = 'unknown',
  in_progress = 'in_progress',
  learned = 'learned',
}

/**
 * Полная сущность карточки (для детального просмотра).
 */
export interface CardDetail {
  word_id: number;
  word_en: string;
  word_ru: string;
  transcription: string;
  sentences: Sentence[];
  dictionaries: Dictionary[];
  status: CardStatus,
}

/**
 * Payload для POST /cards (создание карточки).
 */
export interface CreateCardPayload {
  word_en: string;
  word_ru: string;
  transcription?: string;
  sentence_en: string;
  sentence_ru: string;
  dictionary_id?: number;
}

export interface CreateCardResponse {
  word_id: number;
  user_sentence_id: number;
  dictionary_id: number;
  message: string;
}

// Ответ на GET /cards/{card_id}
export type GetCardResponse = CardDetail;

export interface CardListResponse {
  cards: CardDetail[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
}