import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import myRoutes from './MyRoutes.jsx'
import { BrowserRouter } from 'react-router-dom'
import MyRoutes from './MyRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <MyRoutes />
    </React.StrictMode>
  </BrowserRouter>
)
