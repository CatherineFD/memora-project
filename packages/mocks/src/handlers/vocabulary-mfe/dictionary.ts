import { http, HttpResponse, delay } from 'msw'
import type { 
  Dictionary, 
  DictionaryPayload, 
  DictionaryResponse 
} from '@repo/types'

// ==========================================
// ВИРТУАЛЬНАЯ БАЗА ДАННЫХ СЛОВАРЕЙ
// ==========================================
// Начальные словари (те же, что используются в моках карточек и изучения)
let mockDictionaries: Dictionary[] = [
  { id: 1, name: 'Еда' },
  { id: 2, name: 'Глаголы' },
  { id: 3, name: 'Бизнес' },
  { id: 4, name: 'Природа' },
  { id: 5, name: 'Связки' },
  { id: 6, name: 'Характер' },
  { id: 7, name: 'Эмоции' },
  { id: 8, name: 'Действия' },
  { id: 9, name: 'Путешествия' },
  { id: 10, name: 'Образование' },
]
let nextDictionaryId = 11

// ==========================================
// ХЕНДЛЕРЫ
// ==========================================

/**
 * POST /dictionary/create - Создание нового словаря
 */
export const createDictionaryHandler = http.post<never, DictionaryPayload>('/dictionary/create', async ({ request }) => {
  await delay(600)

  const body = await request.json()

  // Валидация: имя не должно быть пустым
  if (!body.name || body.name.trim().length === 0) {
    return HttpResponse.json(
      { message: 'Название словаря не может быть пустым' },
      { status: 400 }
    )
  }

  // Валидация: уникальность имени (без учета регистра)
  const normalizedName = body.name.trim().toLowerCase()
  const isDuplicate = mockDictionaries.some(
    dict => dict.name.toLowerCase() === normalizedName
  )

  if (isDuplicate) {
    return HttpResponse.json(
      { message: `Словарь с названием "${body.name.trim()}" уже существует` },
      { status: 409 } // 409 Conflict — стандарт для дубликатов
    )
  }

  const newDictionary: Dictionary = {
    id: nextDictionaryId++,
    name: body.name.trim(),
  }

  mockDictionaries.push(newDictionary)

  const response: DictionaryResponse = {
    name: newDictionary.name,
  }

  return HttpResponse.json(response, { status: 201 })
})

/**
 * GET /dictionary/list - Получение списка всех словарей
 */
export const getDictionaryListHandler = http.get('/dictionary/list', async () => {
  await delay(400)

  // Сортируем по имени для удобства в UI (выпадающий список)
  const sortedDictionaries = [...mockDictionaries].sort((a, b) => 
    a.name.localeCompare(b.name, 'ru')
  )

  return HttpResponse.json(sortedDictionaries, { status: 200 })
})

/**
 * GET /dictionary/:dictionaryId - Получение детали словаря по ID
 */
export const getDictionaryByIdHandler = http.get('/dictionary/:dictionaryId', async ({ params }) => {
  await delay(300)

  const dictionaryId = parseInt(params.dictionaryId as string, 10)
  const dictionary = mockDictionaries.find(d => d.id === dictionaryId)

  if (!dictionary) {
    return HttpResponse.json(
      { message: 'Словарь не найден' },
      { status: 404 }
    )
  }

  return HttpResponse.json(dictionary, { status: 200 })
})

/**
 * DELETE /dictionary/:dictionaryId - Удаление словаря
 */
export const deleteDictionaryHandler = http.delete('/dictionary/:dictionaryId', async ({ params }) => {
  await delay(500)

  const dictionaryId = parseInt(params.dictionaryId as string, 10)
  const dictionaryIndex = mockDictionaries.findIndex(d => d.id === dictionaryId)

  if (dictionaryIndex === -1) {
    return HttpResponse.json(
      { message: 'Словарь не найден' },
      { status: 404 }
    )
  }

  // Удаляем словарь из "базы"
  // Примечание: в реальном приложении бэкенд сам решит, что делать 
  // с карточками этого словаря (оставить без словаря / удалить / перенести)
  mockDictionaries.splice(dictionaryIndex, 1)

  return HttpResponse.json(
    { message: 'Словарь успешно удален' },
    { status: 200 }
  )
})