import axios from 'axios'
import Movie from '../models/Movie.js'
import Show from '../models/Show.js'
import dotenv from 'dotenv'

dotenv.config();

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN} `
  }
};

// API to get now playing movies from tmdb
export const getNowPlayingMovies = async (req, res) => {
    console.log("Printing the access token: ", process.env.TMDB_ACCESS_TOKEN)
    try {
        // Got the API endpoint from -> "https://developer.themoviedb.org/reference/movie-now-playing-list"
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', options)

        const movies = data.results
        res.json({ success: true, movies: movies })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// API to add a new show to the database

export const addShowToDB = async (req, res) => {
    try {
        console.log("function reached here1")
        const { movieId, showsInput, showPrice } = req.body 
        console.log("function reached here2")
        let movie = await Movie.findById(movieId)
        console.log("function reached here3")
        if(!movie) {
            // Fetch movie details and credits from TMDB API
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options)
            ])

            const movieApiData = movieDetailsResponse.data
            const movieCreditsData = movieCreditsResponse.data

            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                release_date: movieApiData.release_date,
                original_language: movieApiData.release_date,
                tagline: movieApiData.tagline || "",
                genres: movieApiData.genres,
                casts: movieCreditsData.cast,
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime,
            }

            // Add movie to the DB
            movie = await Movie.create(movieDetails)
        }

        const showsToCreate = []
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {},
                })
            })
        })

        if(showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate)
        }

        res.json({ success: true, message: "Show Added successfully" })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all shows from DB
export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime:  {$gte: new Date()}})
                                .populate('movie')
                                .sort({ showDateTime: 1 })

        // filter unique shows
        const uniqueShows = new Set(shows.map(show => show.movie))

        res.json({ success: true, shows: Array.from(uniqueShows) })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}



// API to get a single show from the database

export const getShow = async (req, res) => {
    try {
        const { movieId } = req.params;
        // get all upcoming shows for the given movie
        const shows = await Show.find({ movie: movieId, showDateTime: {$gte: new Date()} })
        const movie = await Movie.findById(movieId)
        const dateTime = {};

        shows.forEach((show) => {
            const date = show.showDateTime.toISOString().split("T")[0]
            if(!dateTime[date]) {
                dateTime[date] = []
            }
            dateTime[date].push({ time: show.showDateTime, showId: show._id })
        })

        res.json({ success: true, movie, dateTime })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}