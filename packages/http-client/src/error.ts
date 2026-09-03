export class ApiError extends Error {
  // 1. Явно объявляем свойства
  public status: number;
  public statusText: string;
  public data?: unknown;

  constructor(status: number, statusText: string, data?: unknown) {
    super(`HTTP Error: ${status} ${statusText}`);
    
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
  }
}

export async function parseErrorBody(response: Response): Promise<unknown> {
  const text = await response.text();
  
  if (!text) return undefined;
  
  try {
    return JSON.parse(text);
  } catch {
    // Не JSON — возвращаем как есть (строка или HTML)
    return text;
  }
}