import React, {useState} from "react";
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
		case "조제":
			return src + "/image/banner/joje.jpg";
		case "명량":
			return src + "/image/banner/mr.jpg";
		case "테넷":
			return src + "/image/banner/tn.jpg";
		case "뮤직 앤 리얼리티":
			return src + "/image/banner/mar.jpg";
		default:
			return src + "/image/banner/joje.jpg"
	}
}

const modifyData = (movies: any[]) => {
	const result: any[] = [];
	for ( let movie of movies ) {
		const src = getImage(movie.title);
		result.push({
			title: movie.title,
			poster: "https://imgraspberry.s3-accelerate.amazonaws.com" + movie.image.posters[0],
			year: movie.date.slice(0, 4),
			description: movie.plotKr.slice(0, 200),
			src: src
		});
	}
	return result;
}

function MainBanner(): any {
	const { moviesState } = useMovies();
	const [selectMovie, setSelectMovie] = useState<MoviesType>(MOVIE);
	const [showDetail, setShowDetail] = useState(false);


	const keys = Object.keys(moviesState.movies);
	const data = [moviesState.movies[keys[0]][0],moviesState.movies[keys[1]][0], moviesState.movies[keys[2]][0], moviesState.movies[keys[4]][2]];
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
	const more = onMouse ? { color: "#54BBFF", fontWeight: 600 } : { color: "whitesmoke" };
	return (
		<>
			<Slider {...settings}>
				{dataForBanner && dataForBanner.map((movie, i) => (
							<div className="pages"
								onMouseOver={handleOver}
								onMouseLeave={handleLeave}
								onClick={() => {
									// getScrollTop();
									// setModalOpen(true);
									console.log(movie.title)
									setShowDetail(true);
									setSelectMovie({ ...data[i] });
								}}>
								<div className="page_whole">
									<div className="box1">
										<img
											src={`${movie.src}`}
											alt="img"
											style={{maxWidth: "100%", maxHeight: "40rem"}}
										/>
									</div>
									<div className="box2">
									{/* <span style={{fontSize: "2rem"}}>영화소개</span> */}
										<span style={{fontSize: "2rem"}}>{movie.title}</span>
										{/* <span>{movie.year}년 라즈베리 수상작</span> */}
										<span style={{paddingRight:"1rem", fontSize: "inherit", lineHeight:"1.5"}}>
											{movie.description}
										</span>
										<span className="banner-more" style={more}>상세정보</span>
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
