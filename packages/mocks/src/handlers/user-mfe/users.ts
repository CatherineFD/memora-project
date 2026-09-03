import { http, HttpResponse, delay } from 'msw'

// Хендлер получения данных текущего пользователя
export const getMeHandler = http.get('/auth/users/me', async () => {
  await delay(600) // Имитация задержки сети

  return HttpResponse.json({
    id: 1,
    email: 'user@example.com',
    first_name: 'Иван',
    last_name: 'Иванов',
    created_at: '2026-08-15T12:00:00Z',
    stats: {
      total_cards: 150,
      dictionaries_count: 5,
      cards_due_today: 12,
      streak_days: 7,
    }
  }, { status: 200 })
})