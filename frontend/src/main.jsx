import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/globals.css'
import './styles/components.css'
import { AuthProvider } from './contexts/AuthProvider.jsx'
import { ComplaintProvider } from './contexts/ComplaintContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ComplaintProvider>
        <App />
      </ComplaintProvider>
    </AuthProvider>
  </React.StrictMode>,
)
