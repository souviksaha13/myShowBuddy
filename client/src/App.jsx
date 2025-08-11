import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import SeatLayout from './pages/SeatLayout.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Favourite from './pages/Favourite.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AddShows from './pages/admin/AddShows.jsx';
import ListShows from './pages/admin/ListShows.jsx';
import ListBookings from './pages/admin/ListBookings.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import { useAppContext } from './context/AppContext.jsx';
import Signin from './auth/Signin.jsx';

const App = () => {

  const { user } = useAppContext()

  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="movies/:id/:date" element={<SeatLayout />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="favourite" element={<Favourite />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={user ? <AdminLayout /> : <Signin /> }>
        <Route index element={<Dashboard />} />
        <Route path="add-shows" element={<AddShows />} />
        <Route path="list-shows" element={<ListShows />} />
        <Route path="list-bookings" element={<ListBookings />} />
      </Route>
    </Routes>
  );
};

export default App;
