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

const IntroResultBox = () => {
	const { introMovieState, getIntroMovieData } = useIntroMovies();
	const [showDetail, setShowDetail] = useState(false);
	const MOVIE: MoviesType = {
		id: 0,
		docid: "",
		title: "",
		titleEng: "",
		director: "",
		actor: "",
		plotKr: "",
		plotEng: "",
		runtime: 0,
		genre: "",
		image: {
			posters: "",
			stlls: "",
		},
		tag: [],
		date: "",
		score: 0,
	};
	const [selectMovie, setSelectMovie] = useState<MoviesType>(MOVIE);

	useEffect(() => {
		getIntroMovieData();
	}, []);

	const closeMovieDetail = e => {
		e.preventDefault();
		document.body.classList.remove("modal-open");
		setSelectMovie(MOVIE);
	};

	const { loading, introMovies } = introMovieState;
	// console.log("무비 한개 들어가야함", selectMovie);
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
							onClick={() => {
								document.body.classList.add("modal-open");
								setSelectMovie({ ...movie });
								setShowDetail(true);
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			{selectMovie.id ? (
				<CardDetail
					poster={
						selectMovie.image.posters[0] === "image/posters/default.jpg"
							? "https://i.ibb.co/HnNxZyh/default-poster.jpg"
							: `https://imgraspberry.s3-accelerate.amazonaws.com/${selectMovie.image.posters[0]}`
					}
					movie={selectMovie}
					closeMovieDetail={closeMovieDetail}
				/>
			) : null}
		</>
	);
};

export default IntroResultBox;
