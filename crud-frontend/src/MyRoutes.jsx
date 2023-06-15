import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import AddUser from '../AddUser'

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/add' element={<AddUser />} />
    </Routes>
  )
}

export default MyRoutes;