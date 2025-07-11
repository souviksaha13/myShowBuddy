import React from 'react'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

const Layout = () => {
    const location = useLocation()
    const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
        <Toaster />
        {!isAdminRoute && <Navbar />}
        <Outlet />
        {!isAdminRoute && <Footer />}
    </>
  )
}

export default Layout