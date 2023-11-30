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
import Layout from './pages/Layout'
import PrivateRoute from './pages/PrivateRoute'
import SelectPg from './pages/SelectPg'

function App({ showToast }) {
  const { isLoading } = useLoading()



  return (
    <>
      <Layout>
        {(isLoading) && <Loader />}
        <Header />
        <Login showToast={showToast} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPg />} />
          <Route path='/search/:id' element={<SelectPg />} />
          <Route path='/host' element={<PrivateRoute ><Host /></PrivateRoute>} />
        </Routes>
      </Layout>

    </>
  )
}

export default withToaster(App)
