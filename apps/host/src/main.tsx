import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// UI library and antd styles
import 'antd/dist/reset.css'
import { UiProvider, antdImplementation } from '@repo/ui'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UiProvider impl={antdImplementation}>
      <App />
    </UiProvider>
  </StrictMode>,
)
