import type { IsoDateString } from '../common';

export interface UserStats {
  total_cards: number;
  dictionaries_count: number;
  cards_due_today: number;
  streak_days: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: IsoDateString;
  stats: UserStats;
}

// Ответ на GET /users/me
export type GetCurrentUserResponse = User;