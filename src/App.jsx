import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import SearchPg from './pages/SearchPg'
import Login from './pages/Login'
import Host from './pages/Host'
import Loader from './components/Loader'
import useLoading from './hooks/useLoading'
import withToaster from './HOC/withToaster'

function App({showToast}) {
  const {isLoading} = useLoading()



  return (
    <>
   {(isLoading) &&  <Loader /> }
      <Header />
      <Login showToast={showToast} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/searchpg' element={<SearchPg />} />
        <Route path='/host' element={<Host />} />
      </Routes>

    </>
  )
}

export default withToaster(App)
