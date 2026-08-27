import { http, HttpResponse, delay } from 'msw'

export type RegisterPayload = {
  email: string
  password: string
  first_name: string
  last_name: string
}

export type LoginResponse = {
  user: {
    id: string
    email: string
    first_name: string
    last_name: string
  }
  access_token: string
  refresh_token: string
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Хендлер регистрации
export const registerHandler = http.post<never, RegisterPayload>('/auth/register', async ({ request }) => {
  // Имитируем задержку сети (как на реальном бэкенде), чтобы проверить лоадеры в UI
  await delay(800)

  // Получаем данные из тела запроса
  const body = await request.json()

  // --- БОНУС: Имитация валидации (ошибка 409 Conflict) ---
  // Это супер-сила MSW: легко проверять граничные случаи
  if (body.email === 'existing@example.com') {
    return HttpResponse.json(
      { error: 'Пользователь с таким email уже зарегистрирован' },
      { status: 409 }
    )
  }

  // Формируем успешный ответ, используя данные из запроса
  const mockResponse: LoginResponse = {
    user: {
      id: `user_${Math.random().toString(36).substring(2, 9)}`,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
    },
    access_token: 'mock_access_token_' + Math.random().toString(36).substring(2, 15),
    refresh_token: 'mock_refresh_token_' + Math.random().toString(36).substring(2, 15),
  }

  // Возвращаем ответ со статусом 201 (Created - стандарт для регистрации)
  return HttpResponse.json(mockResponse, { status: 201 })
})

// Хендлер для логина
export const loginHandler = http.post<never, LoginPayload>('/auth/login', async ({ request }) => {
  // Имитируем задержку сети (чтобы проверить спиннер загрузки в UI)
  await delay(1000)

  // Получаем данные из запроса
  const body = await request.json()

  // Имитация валидации на стороне "сервера"
  // Если email или пароль не совпадают с ожидаемыми, возвращаем 401 Unauthorized
  if (body.email !== 'user@example.com' || body.password !== 'securePassword123') {
    return HttpResponse.json(
      { error: 'Неверный email или пароль' },
      { status: 401 }
    )
  }

  // Успешный ответ
  const mockResponse: LoginResponse = {
    user: {
      id: 'usr_9876543210',
      email: body.email,
      first_name: 'Иван',
      last_name: 'Иванов',
    },
    // Генерируем "реалистичные" токены (в реальном приложении это JWT)
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_access_token',
    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_refresh_token',
  }

  return HttpResponse.json(mockResponse, { status: 200 })
})