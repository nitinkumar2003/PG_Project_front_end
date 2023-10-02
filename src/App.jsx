import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import SearchPg from './pages/SearchPg'
import Login from './pages/Login'
import Host from './pages/Host'

function App() {

  return (
    <>
      <Header />
      <Login />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/searchpg' element={<SearchPg />} />
        <Route path='/host' element={<Host />} />
      </Routes>




    </>
  )
}

export default App
