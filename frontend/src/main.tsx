import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import './styles/global.scss' // Comentado porque sobrescribe Tailwind
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
