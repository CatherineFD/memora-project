import { http, HttpResponse, delay } from 'msw'
import { CardStatus, type CardDetail } from '@repo/types'

// ==========================================
// БАЗА СЛОВ ДЛЯ ИЗУЧЕНИЯ
// ==========================================
const studyWordsPool: CardDetail[] = [
  {
    word_id: 101,
    word_en: 'Accomplish',
    word_ru: 'Достичь, выполнить',
    transcription: '[əˈkɑːm.plɪʃ]',
    sentences: [{
      id: 1001,
      sentence_en: 'She accomplished all her goals this year.',
      sentence_ru: 'Она достигла всех своих целей в этом году.',
      created_at: '2026-08-10T10:00:00Z'
    }],
    dictionaries: [{ id: 3, name: 'Бизнес' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 102,
    word_en: 'Breathtaking',
    word_ru: 'Захватывающий дух',
    transcription: '[ˈbreθ.teɪ.kɪŋ]',
    sentences: [{
      id: 1002,
      sentence_en: 'The view from the mountain was breathtaking.',
      sentence_ru: 'Вид с горы был захватывающим.',
      created_at: '2026-08-11T10:00:00Z'
    }],
    dictionaries: [{ id: 4, name: 'Природа' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 103,
    word_en: 'Consequently',
    word_ru: 'Следовательно, поэтому',
    transcription: '[ˈkɑːn.sɪ.kwənt.li]',
    sentences: [{
      id: 1003,
      sentence_en: 'He didn\'t study; consequently, he failed the exam.',
      sentence_ru: 'Он не учился; следовательно, он провалил экзамен.',
      created_at: '2026-08-12T10:00:00Z'
    }],
    dictionaries: [{ id: 5, name: 'Связки' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 104,
    word_en: 'Diligent',
    word_ru: 'Прилежный, усердный',
    transcription: '[ˈdɪl.ɪ.dʒənt]',
    sentences: [{
      id: 1004,
      sentence_en: 'She is a diligent student who always completes her homework.',
      sentence_ru: 'Она прилежная студентка, которая всегда выполняет домашнюю работу.',
      created_at: '2026-08-13T10:00:00Z'
    }],
    dictionaries: [{ id: 6, name: 'Характер' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 105,
    word_en: 'Enthusiasm',
    word_ru: 'Энтузиазм',
    transcription: '[ɪnˈθuː.zi.æz.əm]',
    sentences: [{
      id: 1005,
      sentence_en: 'His enthusiasm for the project was contagious.',
      sentence_ru: 'Его энтузиазм по поводу проекта был заразительным.',
      created_at: '2026-08-14T10:00:00Z'
    }],
    dictionaries: [{ id: 6, name: 'Характер' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 106,
    word_en: 'Fascinating',
    word_ru: 'Увлекательный',
    transcription: '[ˈfæs.ɪ.neɪ.tɪŋ]',
    sentences: [{
      id: 1006,
      sentence_en: 'The documentary about space was absolutely fascinating.',
      sentence_ru: 'Документальный фильм о космосе был абсолютно увлекательным.',
      created_at: '2026-08-15T10:00:00Z'
    }],
    dictionaries: [{ id: 7, name: 'Эмоции' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 107,
    word_en: 'Genuine',
    word_ru: 'Настоящий, искренний',
    transcription: '[ˈdʒen.ju.ɪn]',
    sentences: [{
      id: 1007,
      sentence_en: 'She showed genuine concern for his well-being.',
      sentence_ru: 'Она проявила искреннюю заботу о его благополучии.',
      created_at: '2026-08-16T10:00:00Z'
    }],
    dictionaries: [{ id: 6, name: 'Характер' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 108,
    word_en: 'Hesitate',
    word_ru: 'Сомневаться, колебаться',
    transcription: '[ˈhez.ɪ.teɪt]',
    sentences: [{
      id: 1008,
      sentence_en: 'Don\'t hesitate to ask if you need help.',
      sentence_ru: 'Не стесняйся спрашивать, если тебе нужна помощь.',
      created_at: '2026-08-17T10:00:00Z'
    }],
    dictionaries: [{ id: 8, name: 'Действия' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 109,
    word_en: 'Incredible',
    word_ru: 'Невероятный',
    transcription: '[ɪnˈkred.ə.bəl]',
    sentences: [{
      id: 1009,
      sentence_en: 'The magic trick was incredible!',
      sentence_ru: 'Фокус был невероятным!',
      created_at: '2026-08-18T10:00:00Z'
    }],
    dictionaries: [{ id: 7, name: 'Эмоции' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 110,
    word_en: 'Journey',
    word_ru: 'Путешествие',
    transcription: '[ˈdʒɜː.ni]',
    sentences: [{
      id: 1010,
      sentence_en: 'Life is a journey, not a destination.',
      sentence_ru: 'Жизнь — это путешествие, а не пункт назначения.',
      created_at: '2026-08-19T10:00:00Z'
    }],
    dictionaries: [{ id: 9, name: 'Путешествия' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 111,
    word_en: 'Knowledge',
    word_ru: 'Знание',
    transcription: '[ˈnɑː.lɪdʒ]',
    sentences: [{
      id: 1011,
      sentence_en: 'Knowledge is power.',
      sentence_ru: 'Знание — это сила.',
      created_at: '2026-08-20T10:00:00Z'
    }],
    dictionaries: [{ id: 10, name: 'Образование' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 112,
    word_en: 'Landscape',
    word_ru: 'Пейзаж',
    transcription: '[ˈlænd.skeɪp]',
    sentences: [{
      id: 1012,
      sentence_en: 'The landscape was covered in snow.',
      sentence_ru: 'Пейзаж был покрыт снегом.',
      created_at: '2026-08-21T10:00:00Z'
    }],
    dictionaries: [{ id: 4, name: 'Природа' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 113,
    word_en: 'Magnificent',
    word_ru: 'Великолепный',
    transcription: '[mæɡˈnɪf.ɪ.sənt]',
    sentences: [{
      id: 1013,
      sentence_en: 'The palace was magnificent.',
      sentence_ru: 'Дворец был великолепным.',
      created_at: '2026-08-22T10:00:00Z'
    }],
    dictionaries: [{ id: 7, name: 'Эмоции' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 114,
    word_en: 'Negotiate',
    word_ru: 'Вести переговоры',
    transcription: '[nɪˈɡoʊ.ʃi.eɪt]',
    sentences: [{
      id: 1014,
      sentence_en: 'We need to negotiate the terms of the contract.',
      sentence_ru: 'Нам нужно согласовать условия контракта.',
      created_at: '2026-08-23T10:00:00Z'
    }],
    dictionaries: [{ id: 3, name: 'Бизнес' }],
    status: CardStatus.in_progress, 
  },
  {
    word_id: 115,
    word_en: 'Opportunity',
    word_ru: 'Возможность',
    transcription: '[ˌɑː.pɚˈtuː.nə.t̬i]',
    sentences: [{
      id: 1015,
      sentence_en: 'This is a great opportunity to learn.',
      sentence_ru: 'Это отличная возможность учиться.',
      created_at: '2026-08-24T10:00:00Z'
    }],
    dictionaries: [{ id: 3, name: 'Бизнес' }],
    status: CardStatus.in_progress, 
  }
]

// ==========================================
// ХЕНДЛЕРЫ
// ==========================================

/**
 * GET /study/words - Получение списка слов для изучения
 */
export const getStudyWordsHandler = http.get('/study/words', async ({ request }) => {
  await delay(900) // Имитация задержки (слова нужно "подготовить")

  const url = new URL(request.url)
  const count = parseInt(url.searchParams.get('count') || '10', 10)

  // Валидация: count должен быть положительным
  if (count <= 0) {
    return HttpResponse.json(
      { message: 'Количество слов должно быть больше нуля' },
      { status: 400 }
    )
  }

  // Если запрашивают больше слов, чем есть в пуле, возвращаем все доступные
  const wordsToReturn = studyWordsPool.slice(0, Math.min(count, studyWordsPool.length))

  return HttpResponse.json({
    cards: wordsToReturn
  }, { status: 200 })
})

/**
 * POST /study/save - Сохранение результата сессии
 */
export const saveSessionResultHandler = http.post<never, { ids: number[] }>('/study/save', async ({ request }) => {
  await delay(1200) // Имитация записи в БД (обновление прогресса для каждого слова)

  const body = await request.json()

  // Валидация: массив ID не должен быть пустым
  if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
    return HttpResponse.json(
      { message: 'Список ID выученных слов не может быть пустым' },
      { status: 400 }
    )
  }

  // Имитация проверки: все ли ID существуют
  const invalidIds = body.ids.filter(id => !studyWordsPool.some(card => card.word_id === id))
  if (invalidIds.length > 0) {
    return HttpResponse.json(
      { message: `Не найдены слова с ID: ${invalidIds.join(', ')}` },
      { status: 404 }
    )
  }

  // Успешный ответ
  return HttpResponse.json({
    success: true,
    message: `Прогресс успешно сохранен. Обновлено слов: ${body.ids.length}`,
    updated_count: body.ids.length,
    session_completed_at: new Date().toISOString()
  }, { status: 200 })
})