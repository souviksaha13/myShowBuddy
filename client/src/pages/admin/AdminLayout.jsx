import React from 'react'
import { Toaster } from 'react-hot-toast'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useAppContext } from '../../context/AppContext'
import Signin from '../../auth/Signin'

const AdminLayout = () => {

  const { user } = useAppContext()

  return user ? (
    <>
      <Toaster />
      <AdminNavbar />
      <div className='flex'>
        <AdminSidebar />
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </>
  ) : <Signin />
}

export default AdminLayout