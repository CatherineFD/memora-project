export async function enableMocking() {
  // Включаем моки только если передана переменная окружения
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') {
    return
  }

  const { worker } = await import('./browser')
  
  // onUnhandledRequest: 'bypass' чтобы не спамить в консоль, 
  // если MFE делает запросы, которые мы еще не замокали
  return worker.start({ 
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
}