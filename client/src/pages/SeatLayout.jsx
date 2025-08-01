import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'

const SeatLayout = () => {

  const navigate = useNavigate()

  const {id, date} = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const getShow = async() => {
    const show = dummyShowsData.find(show => show._id === id)
    if(show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [])

  return show? (
    <div>
      
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout