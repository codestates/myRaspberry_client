import React, { useState } from "react";
import "./MainBanner.css";
import Slider from "react-slick";
import useMovies from "../../hooks/useMovies";
import ThumbsUp from "../movies/thumbsUp/ThumbsUp";
import ThumbsDown from "../movies/thumbsDown/ThumbsDown";
import CardDetail from "../movies/cardDetail/CardDetail";
import { MoviesType } from "../../modules/movies";

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
type Settings = {
	[key: string]: number | boolean | string;
};

const getImage = (title: string) => {
	const src = "https://imgraspberry.s3-accelerate.amazonaws.com";
	switch (title) {
		case "작은 아씨들":
			return src + "/image/banner/little_ladies.jpg";
		case "극한직업":
			return src + "/image/banner/3d_job.jpg";
		case "캐롤":
			return src + "/image/banner/carol.jpg";
		case "서울역":
			return src + "/image/banner/seoul_station.jpg";
		default:
			return src + "/image/banner/joje.jpg";
	}
};

const fixRuntime = runtime => {
	let time = 0;
	while (runtime > 60) {
		runtime = runtime - 60;
		time++;
	}
	return time === 0 ? `${runtime}분` : `${time}시간 ${runtime}분`;
};

const modifyData = (movies: any[]) => {
	const result: any[] = [];
	for (let movie of movies) {
		console.log(movie.title);
		const src = getImage(movie.title);
		result.push({
			title: movie.title,
			poster:
				"https://imgraspberry.s3-accelerate.amazonaws.com" +
				movie.image.posters[0],
			year: movie.date.slice(0, 4),
			src: src,
			director: movie.director,
			actor: movie.actor.split(",").slice(0, 6),
			runtime: fixRuntime(movie.runtime),
			genre: movie.genre,
		});
	}
	return result;
};

function MainBanner(): any {
	const { moviesState } = useMovies();
	const [selectMovie, setSelectMovie] = useState<MoviesType>(MOVIE);
	const [showDetail, setShowDetail] = useState(false);

	const keys = Object.keys(moviesState.movies);
	const data = [
		moviesState.movies[keys[0]][0],
		moviesState.movies[keys[1]][0],
		moviesState.movies[keys[2]][0],
		moviesState.movies[keys[4]][0],
	];
	const dataForBanner = modifyData(data);
	const [onMouse, setOnMouse] = useState(false);

	const handleOver = e => {
		e.preventDefault();
		setOnMouse(true);
	};
	const handleLeave = e => {
		e.preventDefault();
		setOnMouse(false);
	};
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
	const closeMovieDetail = e => {
		e.preventDefault();
		setModalOpen(false);
		setSelectMovie(MOVIE);
	};
	const more = onMouse
		? { cursor: "pointer", color: "#54BBFF", fontWeight: 600 }
		: { color: "whitesmoke" };
	return (
		<>
			<Slider {...settings}>
				{dataForBanner &&
					dataForBanner.map((movie, i) => (
						<div className="pages">
							<div className="page_whole">
								<div className="box1">
									<img
										src={`${movie.src}`}
										alt="img"
										style={{
											maxWidth: "100%",
											maxHeight: "40rem",
											paddingLeft: "1rem",
										}}
									/>
								</div>
								<div className="box2">
									<span style={{ fontSize: "2rem", marginBottom: "0px" }}>
										{movie.title}({movie.year})
									</span>
									<span className="banner_info" style={{ marginTop: "-2rem" }}>
										{movie.genre} | {movie.runtime}
									</span>
									<span
										className="banner_info"
										style={{ marginBottom: "-2rem" }}>
										<b>감독 </b>
										{movie.director}
									</span>
									<span className="banner_info">
										<b>출연 </b>
										{movie.actor.join(",")}
									</span>
									<span
										className="banner-more"
										style={more}
										onMouseOver={handleOver}
										onMouseLeave={handleLeave}
										onClick={() => {
											setShowDetail(true);
											setSelectMovie({ ...data[i] });
										}}>
										상세정보
									</span>
								</div>
							</div>
						</div>
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
}

export default MainBanner;
