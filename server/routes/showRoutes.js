import express from 'express'
import { addShowToDB, getAllShows, getNowPlayingMovies, getShow } from '../controllers/showController.js'
import { protectAdmin } from '../middleware/auth.js'

const showRouter = express.Router()

showRouter.get('/now-playing', protectAdmin, getNowPlayingMovies)
showRouter.post('/add', protectAdmin, addShowToDB)
showRouter.get('/all', getAllShows)
showRouter.get('/:movieId', getShow)

export default showRouter