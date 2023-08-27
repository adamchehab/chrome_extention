import React from 'react'
import ReactDOM from 'react-dom/client'
import PopupComponent from './components/PopupPage/PopupPage.tsx'
import '../css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupComponent />
  </React.StrictMode>,
)
