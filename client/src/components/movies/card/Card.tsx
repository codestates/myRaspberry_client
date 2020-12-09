import React, { useState } from "react";
import "./Card.css";
import CardDetail from "../cardDetail/CardDetail";

// {year,title,summary,poster,genres, .....}  추후에 받을 props 예상....

// const poster: string =
// 	"https://yts.mx/assets/images/movies/doctor_who_the_day_of_the_doctor_2013/medium-cover.jpg";
const defaultPoster: string = "https://i.ibb.co/HnNxZyh/default-poster.jpg";

const MovieCard = ({ poster }) => {
	const [showDetail, setShowDetail] = useState(false);
	const [onMouse, setOnMouse] = useState(false);
	// -1 = hate / 0 = 보통 상태 / 1 = like
	const [hate, setHate] = useState(0);
	const handleOnMouse = () => setOnMouse(true);
	const handleOnMouseOut = () => setOnMouse(false);
	const closeMovieDetail = () => setShowDetail(false);

	return (
		<>
			<div onClick={() => setShowDetail(true)} className="moviecard_box">
				<img
					className="moviecard"
					src={poster}
					onMouseOver={handleOnMouse}
					onMouseOut={handleOnMouseOut}
					alt="moviecard-poster"
				/>
			</div>
			{showDetail ? (
				<CardDetail poster={poster} closeMovieDetail={closeMovieDetail} />
			) : null}
		</>
	);
};

export default MovieCard;
