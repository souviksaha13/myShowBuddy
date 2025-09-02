import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import AdminTitle from '../../components/admin/AdminTitle'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {

    const currency = import.meta.env.VITE_CURRENCY
    const { axios, getToken, user } = useAppContext()

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchAllBookings = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-bookings', {
                headers: { Authorization: `Bearer ${await getToken()}`}
            })
            setBookings(data.bookings)
            console.log(data.bookings)
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if(user) {
            fetchAllBookings()
        }
    }, [user])

    return !isLoading ? (
        <>
            <AdminTitle text1={`List`} text2={`Bookings`} />
            <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
                <thead>
                    <tr className='bg-primary/20 text-left text-white'>
                        <th className='p-2 font-medium pl-5'>User Name</th>
                        <th className='p-2 font-medium'>Movie Name</th>
                        <th className='p-2 font-medium'>Show Time</th>
                        <th className='p-2 font-medium'>Seats</th>
                        <th className='p-2 font-medium'>Amount</th>
                    </tr>
                </thead>

                <tbody className='text-sm font-light'>
                    {bookings.map((item, index) => (
                        <tr key={index} className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
                            <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                            <td className='p-2'>{item.show.movie.title}</td>
                            <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                            <td className='p-2'>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")}</td>
                            <td className='p-2'>{currency} {item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ) : <Loading />
}

export default ListBookings