import { http, HttpResponse, delay } from 'msw'

export const userHandlers = [
  http.get('/api/users/:id', async ({ params }) => {

    await delay(500) 
    
    return HttpResponse.json({
      id: params.id,
      name: 'John Doe',
      role: 'admin',
    })
  }),
  
  http.post('/api/users', async ({ request }) => {
    // Указываем ожидаемый тип тела запроса
     const body = (await request.json()) as Record<string, unknown>
    
    return HttpResponse.json({ 
        id: '123', 
        ...body // Теперь TS знает, что body - это объект
    }, { status: 201 })
    })
]