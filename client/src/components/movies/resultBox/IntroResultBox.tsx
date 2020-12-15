import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./resultBox.css";
import useIntroMovies from "../../../hooks/useIntroMovies";
import CardDetail from "../cardDetail/CardDetail";
import { MoviesType } from "../../../modules/movies";
// import data from "../../../lib/introData.json";

SwiperCore.use([Navigation]);

interface IntroMovieProps {
	movies?: any;
}

const IntroResultBox = () => {
	const { introMovieState, getIntroMovieData } = useIntroMovies();
	const [showDetail, setShowDetail] = useState(false);
	useEffect(() => {
		getIntroMovieData();
	}, []);

	const { loading, introMovies } = introMovieState;
	console.log("intro", introMovies);
	return (
		<>
			<Swiper
				tag="section"
				wrapperTag="ul"
				className="mainResult"
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{introMovies.intro.map(movie => (
					<SwiperSlide key={movie.id} tag="li">
						<img
							className="cardImg"
							src={
								movie.image.posters[0] === "image/posters/default.jpg"
									? "https://i.ibb.co/HnNxZyh/default-poster.jpg"
									: `https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`
							}
							style={{ listStyle: "none", width: "100%" }}
							alt={movie.title}
							onClick={() => alert(setShowDetail(true))}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default IntroResultBox;
