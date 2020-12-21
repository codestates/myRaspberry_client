import React, { useState, useLayoutEffect, useEffect } from "react";
import "./resultBox.css";
import data from "../../../lib/introData.json";
import { MoviesType } from "../../../modules/movies";
import Slider from "react-slick";
import CardDetail from "../cardDetail/CardDetail";
import { FaLongArrowAltUp } from "react-icons/fa";
import ThumbsUp from "../thumbsUp/ThumbsUp";
import ThumbsDown from "../thumbsDown/ThumbsDown";
import "swiper/swiper-bundle.css";
import useMovies from "../../../hooks/useMovies";

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

let TOP = 0;
const gradient = `
top: -${TOP};
`;

const setModalOpen = (isSet: boolean) => {
	if (isSet) {
		document.body.style.setProperty("overflow-y", "hidden");
	} else {
		document.body.style.setProperty("overflow-y", "");
		window.scrollTo({ top: TOP, behavior: "auto" });
	}
};

const getScrollTop = () => {
	TOP = document.documentElement.scrollTop;
};

type Movie = {
	renew: MoviesType[];
	kor: MoviesType[];
	eng: MoviesType[];
	long: MoviesType[];
	short: MoviesType[];
};

const MovieCard = ({ poster, movie, setShowDetail, setSelectMovie }) => {
	const [onMouse, setOnMouse] = useState(false);
	// -1 = hate / 0 = 보통 상태 / 1 = like

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
			<div className="thumbs_box">
				{/* <div className="moviecard_box"> */}
				{onMouse && <ThumbsDown fromMovieCard={movie} />}
				{onMouse && <ThumbsUp fromMovieCard={movie} />}
				{/* <ThumbsDown />
				<ThumbsUp /> */}
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

const ResultBox: any = ({ tag, data }) => {
	const { moviesState, onUpdateMovies } = useMovies();
	const [showDetail, setShowDetail] = useState(false);
	const [selectMovie, setSelectMovie] = useState<MoviesType>(MOVIE);
	const [per, setPer] = useState(5);
	const { loading, movies } = moviesState;
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

	const closeMovieDetail = e => {
		e.preventDefault();
		setModalOpen(false);
		setSelectMovie(MOVIE);
	};

	const slideSettings = {
		className: "slick_container",
		infinite: true,
		speed: 1000,
		slidesToShow: per,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 35000,
		swipeToSlide: true,
	};

	useEffect(() => {
		onUpdateMovies();
	}, []);

	useEffect(() => {
		calWith(width);
	}, [width]);

	const setSlider = (data: any) => (
		<>
			<Slider {...slideSettings}>
				{data.map(movie => (
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
	const isArray = tag => Array.isArray(tag);
	if (isArray(movies[tag])) {
		return setSlider(movies[tag]);
	} else {
		return setSlider(data);
	}
};

export default ResultBox;
