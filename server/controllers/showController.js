import axios from 'axios'

export const getNowPlayingMovies = async (req, res) => {
    try {
        // Got the API endpoint from -> "https://developer.themoviedb.org/reference/movie-now-playing-list"
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`}
        })

        const movies = data.results
        res.json({ success: true, movies: movies })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

