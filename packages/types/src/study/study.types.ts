import type { UUID } from '../common';
import type { CardDetail } from '../card';

/**
 * Карточка в режиме изучения — урезанная версия Card.
 */
export interface StudyCard {
  word_id: number;
  word_en: string;
  word_ru: string;
  transcription: string;
  original_sentence_en: string;
  original_sentence_ru: string;
  current_stage: number;
  current_interval_days: number;
}

/**
 * Ответ на GET /study/cards — сессия изучения.
 */
export interface StudySessionResponse {
  cards: StudyCard[];
  total_due_today: number;
  session_id: UUID;
}

/**
 * Payload для POST /study/review (результат повторения).
 */
export interface ReviewPayload {
  word_id: number;
  remembered: boolean;
  user_sentence_en: string;
  user_sentence_ru: string;
}

/**
 * Ответ на POST /study/review.
 */
export interface ReviewResponse {
  success: boolean;
  message?: string;
}

export type StudiedWordsListPayload = {
  count: number, 
}

export interface StudiedWordsListResponse {
  cards: CardDetail[],
}

export interface SessionResultPayload {
  ids: number[]
}