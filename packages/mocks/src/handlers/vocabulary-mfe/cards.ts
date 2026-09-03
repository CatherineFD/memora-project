import { http, HttpResponse, delay } from 'msw'
import type { 
  CardDetail, 
  CardListResponse, 
  CreateCardPayload, 
  CreateCardResponse, 
} from '@repo/types'
import { CardStatus } from '@repo/types';

// ==========================================
// Виртуальная база данных
// ==========================================
let mockCards: CardDetail[] = [
  {
    word_id: 1,
    word_en: 'Apple',
    word_ru: 'Яблоко',
    transcription: '[ˈæp.əl]',
    sentences: [
      {
        id: 101,
        sentence_en: 'I eat a red apple every day.',
        sentence_ru: 'Я ем красное яблоко каждый день.',
        created_at: '2026-08-15T12:00:00Z'
      }
    ],
    dictionaries: [{ id: 1, name: 'Еда' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 2,
    word_en: 'To run',
    word_ru: 'Бежать',
    transcription: '[rʌn]',
    sentences: [
      {
        id: 102,
        sentence_en: 'I run in the park every morning.',
        sentence_ru: 'Я бегаю в парке каждое утро.',
        created_at: '2026-08-16T12:00:00Z'
      }
    ],
    dictionaries: [{ id: 2, name: 'Глаголы' }],
    status: CardStatus.in_progress, 
  }
]
let nextWordId = 3
let nextSentenceId = 103

// ==========================================
// ХЕНДЛЕРЫ
// ==========================================

/**
 * POST /cards - Создание новой карточки
 */
export const createCardHandler = http.post<never, CreateCardPayload>('/cards', async ({ request }) => {
  await delay(800) // Имитация задержки сети
  
  const body = await request.json()

  // Валидация: обязательные поля
  if (!body.word_en || !body.word_ru || !body.sentence_en || !body.sentence_ru) {
    return HttpResponse.json(
      { message: 'Все обязательные поля (word_en, word_ru, sentence_en, sentence_ru) должны быть заполнены' },
      { status: 400 }
    )
  }

  const newCard: CardDetail = {
    word_id: nextWordId++,
    word_en: body.word_en,
    word_ru: body.word_ru,
    transcription: body.transcription || '',
    sentences: [{
      id: nextSentenceId++,
      sentence_en: body.sentence_en,
      sentence_ru: body.sentence_ru,
      created_at: new Date().toISOString()
    }],
    dictionaries: body.dictionary_id ? [{ id: body.dictionary_id, name: 'Custom Dictionary' }] : [],
    status: CardStatus.in_progress, 
  }

  mockCards.push(newCard)

  const response: CreateCardResponse = {
    word_id: newCard.word_id,
    user_sentence_id: newCard.sentences[0].id,
    dictionary_id: body.dictionary_id || 0,
    message: 'Карточка успешно создана'
  }

  return HttpResponse.json(response, { status: 201 })
})

/**
 * GET /cards - Получение списка с пагинацией и фильтрами
 */
export const getListHandler = http.get('/cards', async ({ request }) => {
  await delay(600)

  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)
  const search = url.searchParams.get('search')?.toLowerCase() || ''
  const dictIdStr = url.searchParams.get('dictionary_id')
  const dictId = dictIdStr ? parseInt(dictIdStr, 10) : null

  // 1. Фильтрация
  let filtered = mockCards.filter(card => {
    const matchesSearch = !search || 
      card.word_en.toLowerCase().includes(search) || 
      card.word_ru.toLowerCase().includes(search)
    
    const matchesDict = dictId === null || 
      card.dictionaries.some(d => d.id === dictId)

    return matchesSearch && matchesDict
  })

  // 2. Пагинация
  const total = filtered.length
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedCards = filtered.slice(startIndex, endIndex)

  const response: CardListResponse = {
    cards: paginatedCards,
    total,
    page,
    limit,
    has_next: endIndex < total
  }

  return HttpResponse.json(response, { status: 200 })
})

/**
 * GET /cards/:cardId - Получение детали по ID
 */
export const getByIdHandler = http.get('/cards/:cardId', async ({ params }) => {
  await delay(400)
  
  const cardId = parseInt(params.cardId as string, 10)
  const card = mockCards.find(c => c.word_id === cardId)

  if (!card) {
    return HttpResponse.json(
      { message: 'Карточка не найдена' },
      { status: 404 }
    )
  }

  return HttpResponse.json(card, { status: 200 })
})

/**
 * PUT /cards/:cardId - Обновление карточки
 */
export const updateHandler = http.put<never, Partial<CreateCardPayload>>('/cards/:cardId', async ({ params, request }) => {
  await delay(700)
  
  //TODO поправить params
  const cardId = parseInt(params as string, 10)
  const body = await request.json()
  const cardIndex = mockCards.findIndex(c => c.word_id === cardId)

  if (cardIndex === -1) {
    return HttpResponse.json(
      { message: 'Карточка не найдена' },
      { status: 404 }
    )
  }

  // Частичное обновление: берем старую карточку и перезаписываем переданные поля
  const oldCard = mockCards[cardIndex]
  const updatedCard: CardDetail = {
    ...oldCard,
    word_en: body.word_en ?? oldCard.word_en,
    word_ru: body.word_ru ?? oldCard.word_ru,
    transcription: body.transcription ?? oldCard.transcription,
    // Обновляем первое предложение, если переданы новые данные
    sentences: body.sentence_en || body.sentence_ru 
      ? [{ ...oldCard.sentences[0], sentence_en: body.sentence_en ?? oldCard.sentences[0].sentence_en, sentence_ru: body.sentence_ru ?? oldCard.sentences[0].sentence_ru }]
      : oldCard.sentences,
    dictionaries: body.dictionary_id !== undefined 
      ? [{ id: body.dictionary_id, name: 'Updated Dictionary' }] 
      : oldCard.dictionaries
  }

  mockCards[cardIndex] = updatedCard

  return HttpResponse.json(updatedCard, { status: 200 })
})

/**
 * DELETE /cards/:cardId - Удаление карточки
 */
export const deleteByIdHandler = http.delete('/cards/:cardId', async ({ params }) => {
  await delay(500)
  
  const cardId = parseInt(params.cardId as string, 10)
  const cardIndex = mockCards.findIndex(c => c.word_id === cardId)

  if (cardIndex === -1) {
    return HttpResponse.json(
      { message: 'Карточка не найдена' },
      { status: 404 }
    )
  }

  // Удаляем из "базы"
  mockCards.splice(cardIndex, 1)

  return HttpResponse.json(
    { message: 'Карточка успешно удалена' },
    { status: 200 }
  )
})