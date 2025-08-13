import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: StrictMode is disabled because it causes the timer to start recording twice
createRoot(document.getElementById('root')!).render(
    <App />
)
