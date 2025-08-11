import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favouriteMovies, setFavouriteMovies] = useState([])
    const navigate = useNavigate()

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()

    // check if the user is admin
    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/isAdmin', {headers: 
                { Authorization: `Bearer ${await getToken()}` }
            })

            setIsAdmin(data.isAdmin)

            if(!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error("You are not authorized to access admin dashboard")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all')
            if(data.success) {
                setShows(data.shows)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchFavMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favourites', {headers: 
                { Authorization: `Bearer ${await getToken()}` }
            })

            if(data.success) {
                setFavouriteMovies(data.movies)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // fetching all the shows
    useEffect(() => {
        fetchShows()
    }, [])

    // fetching if user is admin and fetch their fav movies
    useEffect(() => {
        if(user) {
            fetchIsAdmin()
            fetchFavMovies()
        }
    }, [user])

    const value = { 
        axios,
        fetchIsAdmin, getToken, fetchFavMovies, fetchShows,
        user, shows, favouriteMovies, isAdmin,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)