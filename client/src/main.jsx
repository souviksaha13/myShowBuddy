import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Favourite from './pages/Favourite.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AddShows from './pages/admin/AddShows.jsx'
import ListShows from './pages/admin/ListShows.jsx'
import ListBookings from './pages/admin/ListBookings.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User routes */}
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favourite' element={<Favourite />} />
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='add-shows' element={<AddShows />} />
        <Route path='list-shows' element={<ListShows />} />
        <Route path='list-bookings' element={<ListBookings />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
