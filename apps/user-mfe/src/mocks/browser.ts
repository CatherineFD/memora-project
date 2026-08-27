import { setupWorker } from 'msw/browser'
import { userHandlers } from '@repo/mocks'
import { http, HttpResponse } from 'msw'

const localHandlers = [
   http.get('/api/dashboard/stats', () => {
    return HttpResponse.json({
      totalUsers: 15420,
      activeSessions: 342,
      revenue: 98500.50,
    })
  }),
]

export const worker = setupWorker(...userHandlers, ...localHandlers)