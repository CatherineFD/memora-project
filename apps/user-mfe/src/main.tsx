import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (import.meta.env.VITE_ENABLE_MOCKS === 'true') {
  const { enableMocking } = await import('./mocks/index.ts')
  await enableMocking()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
