export interface Dictionary {
  id: number;
  name: string;
}

export interface GetCardsParams {
  page?: number;
  limit?: number;
  dictionary_id?: number;
  search?: string;
}