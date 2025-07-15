import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroCards from './HeroCards';
import { assets } from '../assets/assets';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';


const NextArrow = (props) => {
    const { className, style, onClick } = props;
  return (
    <div
      className={`${className} `}
      style={{ ...style, display: "block", background: "none", position: 'absolute', right: "10px",   }}
      onClick={onClick}

    >
        {/* <ChevronRightIcon /> */}
    </div>
  );
}

const PreviousArrow = (props) => {
    const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-50 w-10`}
      style={{ ...style, display: "block", background: "none", position: 'absolute', left: "10px",   }}
      onClick={onClick}

    >
        {/* <ChevronLeftIcon /> */}
    </div>
  );
}

const HeroSection = () => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PreviousArrow />
    };

  return (
    <div className='w-full max-w-full h-screen'>
        <Slider className='w-full' {...settings}>
        <div>
            <HeroCards backgroundImageURL={"/backgroundImage.png"}
                    producerLogo={assets.marvelLogo}
                    movieTitle={<> Guardians <br /> of the Galaxy </>}
                    category={"Action | Adventure | Sci-Fi"}
                    rating={"9.1/10"}
                    duration={"2h 8m"}
                    details={"In a post-apocalyptic world where cities ride on wheels and consume each ohter to survive, two people meet in London and try to stop a conspiracy."}
            />
        </div>
        {/* TODO: Add other divs later */}

        {/* Some copies as of now */}

        <div >
            <HeroCards backgroundImageURL={"/backgroundImage.png"}
                    producerLogo={assets.marvelLogo}
                    movieTitle={<> Homw <br /> of the Galaxy </>}
                    category={"Action | Adventure | Sci-Fi"}
                    rating={"9.1/10"}
                    duration={"2h 8m"}
                    details={"In a post-apocalyptic world where cities ride on wheels and consume each ohter to survive, two people meet in London and try to stop a conspiracy."}
            />
        </div>


        <div >
            <HeroCards backgroundImageURL={"/backgroundImage.png"}
                    producerLogo={assets.marvelLogo}
                    movieTitle={<> Guardians <br /> of the Galaxy </>}
                    category={"Action | Adventure | Sci-Fi"}
                    rating={"9.1/10"}
                    duration={"2h 8m"}
                    details={"In a post-apocalyptic world where cities ride on wheels and consume each ohter to survive, two people meet in London and try to stop a conspiracy."}
            />
        </div>
        </Slider>
    </div>
  )
}

export default HeroSection