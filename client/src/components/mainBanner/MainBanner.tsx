import React from 'react'
import './MainBanner.css'
import Slider from 'react-slick'
import useMovies from '../../hooks/useMovies'

type Settings = {
  [key: string]: number | boolean | string
}

function MainBanner(): any {
  const {moviesState} = useMovies()
  const movies = moviesState.movies.renew
  console.log(movies)

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 15000,
    focusOnSelect: true,
    centerPadding: '0px',
    className: 'slide_box',
  }

  return (
    <Slider {...settings}>
      <div className="pages">
        <div className="page_whole">
          <div className="box1">
            <img
              src={`https://imgraspberry.s3-accelerate.amazonaws.com/${movies[0].image.posters[0]}`}
              alt="img"
            />
          </div>
          <div className="box2">
            <h1>여기가 2이다.</h1>
          </div>
        </div>
      </div>
      <div className="pages">
        <div className="page_whole">
          <div className="box">
            <h1>여기가 2-1이다.</h1>
          </div>
          <div className="box2">
            <h1>여기가 2-2이다.</h1>
          </div>
        </div>
      </div>
    </Slider>
  )
}

export default MainBanner
