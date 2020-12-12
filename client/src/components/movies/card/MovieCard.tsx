import React, { useState } from "react";
import "./Card.css";
import CardDetail from "../cardDetail/CardDetail";

//const defaultPoster: string = "https://i.ibb.co/HnNxZyh/default-poster.jpg";

const MovieCard = ({ poster, movie }) => {
	const [showDetail, setShowDetail] = useState(false);
	const [onMouse, setOnMouse] = useState(false);
	// -1 = hate / 0 = 보통 상태 / 1 = like
	const [hate, setHate] = useState(0);
	const handleOnMouse = () => setOnMouse(true);
	const handleOnMouseOut = () => setOnMouse(false);
	const closeMovieDetail = () => setShowDetail(false);
	// console.log(onMouse);
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
				<CardDetail
					poster={poster}
					movie={movie}
					closeMovieDetail={closeMovieDetail}
				/>
			) : null}
		</>
	);
};

export default MovieCard;
