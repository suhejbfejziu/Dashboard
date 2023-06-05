import { UserProvider } from './auth/UserContext'
import { AuthProvider } from './auth/AuthContext'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './input.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
          <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
)
