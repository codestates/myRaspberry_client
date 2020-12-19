import React from "react";
import "./MainBanner.css";
import Slider from "react-slick";
import useMovies from "../../hooks/useMovies";

type Settings = {
	[key: string]: number | boolean | string;
};

function MainBanner(): any {
	const { moviesState } = useMovies();
	const keys = Object.keys(moviesState.movies);
	console.log("MainBanner MovieState", moviesState);
	const dataForBanner = [moviesState.movies[keys[0]][0],moviesState.movies[keys[1]][0], moviesState.movies[keys[2]][0], moviesState.movies[keys[4]][2]];

	const settings: Settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 15000,
		focusOnSelect: true,
		centerPadding: "0px",
		className: "slide_box",
	};

	return (
		<Slider {...settings}>
			{dataForBanner
				? dataForBanner.map((movie) => (
						<div className="pages">
							<div className="page_whole">
								<div className="box1">
									<img
										src={`https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`}
										alt="img"
									/>
								</div>
								<div className="box2">
									<span>{movie.title}</span>
									<span>{movie.date.slice(0, 4)}년 라즈베리 수상작</span>
									<span>
										korany 님 five1star 님 QuePark님 문구는 뭐가 좋을까요?
									</span>
								</div>
							</div>
						</div>
				  ))
				: null}
		</Slider>
	);
}

export default MainBanner;
