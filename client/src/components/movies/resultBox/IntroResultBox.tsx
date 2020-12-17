import React, { useEffect, useState, useLayoutEffect } from "react";
// import {Swiper, SwiperSlide} from 'swiper/react'
// import SwiperCore, {Navigation} from 'swiper'
// import 'swiper/swiper-bundle.css'
import "./introResultBox.css";
import Slider from "react-slick";
import useIntroMovies from "../../../hooks/useIntroMovies";
import CardDetail from "../cardDetail/CardDetail";
import { MoviesType } from "../../../modules/movies";

let TOP = 0;
const gradient = `
top: -${TOP};
`;

const setModalOpen = (isSet: boolean) => {
	if ( isSet ) {
		document.body.style.setProperty("top", `-${TOP}px`);
		document.body.style.setProperty("position","fixed");
	} else {
		document.body.style.top = "";
		document.body.style.position = "";
		window.scrollTo({top:TOP, behavior:'auto'});
	}
}

const getScrollTop = () => {
	TOP = document.documentElement.scrollTop;
}

const MovieCard = ({ poster, movie, setShowDetail, setSelectMovie }) => {
	const [onMouse, setOnMouse] = useState(false);

	const handleOnMouse = e => {
		e.preventDefault();
		setOnMouse(true);
	};
	const handleOnMouseOut = e => {
		e.preventDefault();
		setOnMouse(false);
	};

	return (
		<>
			<div className="moviecard_box">
				<MovieImage
					onMouse={onMouse}
					poster={poster}
					movie={movie}
					onMouseOver={handleOnMouse}
					onMouseLeave={handleOnMouseOut}
					setShowDetail={setShowDetail}
					setSelectMovie={setSelectMovie}
				/>
			</div>
		</>
	);
};

function MovieImage(props: any): JSX.Element {
	const {
		onMouse,
		poster,
		onMouseOver,
		onMouseLeave,
		movie,
		setShowDetail,
		setSelectMovie,
	} = props;
	const blackBox = onMouse ? "resultBlack_box on" : "resultBlack_box";
	// const [defaultImage, setDefaultImage] = useState(false);
	// if (poster === "https://i.ibb.co/HnNxZyh/default-poster.jpg") {
	// 	console.log(movie.title);
	// 	setDefaultImage(true);
	// }
	// const defaultPoster = defaultImage
	// 	? "eachMovieCard defaultImage"
	// 	: "eachMovieCard";
	return (
		<div
			className="eachMovieCard"
			style={{
				backgroundImage: `url(${poster})`,
			}}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
			onClick={() => {
				getScrollTop();
				setModalOpen(true);
				setShowDetail(true);
				setSelectMovie({ ...movie });
			}}>
			<div className={blackBox}>
				{poster === "https://i.ibb.co/HnNxZyh/default-poster.jpg" &&
					movie.title}
			</div>
		</div>
	);
}

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

const IntroResultBox = () => {
	const { introMovieState, getIntroMovieData } = useIntroMovies();
	const [showDetail, setShowDetail] = useState(false);
	const width = useWindowSize();
	function calWith(args) {
		const width = args[0];
		if (width > 2200) {
			setPer(10);
		} else if (width > 2000) {
			setPer(8);
		} else if (width > 1800) {
			setPer(7);
		} else if (width > 1600) {
			setPer(6);
		} else if (width > 1200) {
			setPer(5);
		} else if (width > 1000) {
			setPer(4);
		} else if (width > 900) {
			setPer(3);
		} else if (width > 600) {
			setPer(2);
		}
	}

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
			stlls: [],
		},
		tag: [],
		date: "",
		score: 0,
	};
	const [selectMovie, setSelectMovie] = useState<MoviesType>(MOVIE);
	const [per, setPer] = useState(5);

	const closeMovieDetail = e => {
		e.preventDefault();
		setModalOpen(false);
		setSelectMovie(MOVIE);
	};

	const { loading, introMovies } = introMovieState;

	const slideSettings = {
		className: "slick_container",
		infinite: true,
		speed: 1000,
		slidesToShow: per,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 5000,
	};
	useEffect(() => {
		getIntroMovieData();
	}, []);
	useEffect(() => {
		calWith(width);
	}, [width]);

	return (
		<>
			<Slider {...slideSettings}>
				{introMovies.intro.map(movie => (
					<MovieCard
						key={movie.id}
						movie={movie}
						poster={
							movie.image.posters[0] === "image/posters/default.jpg"
								? "https://i.ibb.co/HnNxZyh/default-poster.jpg"
								: `https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`
						}
						setShowDetail={setShowDetail}
						setSelectMovie={setSelectMovie}
					/>
				))}
			</Slider>

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
