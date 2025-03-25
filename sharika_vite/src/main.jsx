import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Comp from './Comp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Comp />
  </StrictMode>,
)
