import { ArrowRight, ClockIcon, StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroCards = ({
    backgroundImageURL,
    producerLogo = null,
    movieTitle,
    category,
    rating,
    duration,
    details = null,
}) => {

    const navigate = useNavigate()

  return (
    <div className={`flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen w-full `} style={{ backgroundImage: `url(${backgroundImageURL})` }}>
      
      {/* Optional: Logo of the producer */}
      {producerLogo && <img src={producerLogo} alt='' className='max-h-11 lg:h-11 mt-20' />}

      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>{movieTitle}</h1>

      <div className='flex items-center gap-4 text-gray-300'>
        <span>{category}</span>

        <div className='flex items-center gap-1'>
            <StarIcon className='w-4.5 h-4.5' /> {rating}
        </div>

        <div className='flex items-center gap-1'>
            <ClockIcon className='w-4.5 h-4.5' /> {duration}
        </div>
      </div>

      <p className='max-w-md text-gray-300'>{details}</p>
      <button onClick={() => navigate("/movies")} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Explore Movies
        <ArrowRight className='w-5 h-5' />
      </button>
    </div>
  )
}

export default HeroCards