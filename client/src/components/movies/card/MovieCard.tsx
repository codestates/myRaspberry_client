import React, { useState } from "react";
import "./Card.css";
import CardDetail from "../cardDetail/CardDetail";
import ThumbsUp from "../thumbsUp/ThumbsUp";
import ThumbsDown from "../thumbsDown/ThumbsDown";

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
			<div className="moviecard_box" onClick={() => setShowDetail(true)}>
				<img
					className="moviecard"
					src={poster}
					onMouseEnter={handleOnMouse}
					onMouseLeave={handleOnMouseOut}
					alt="moviecard-poster"
				/>
				<div className={onMouse ? "moviecard_box" : "moviecard_box hoverOff"}>
					<ThumbsDown />
					<ThumbsUp />
				</div>
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

//onClick={() => setShowDetail(true)}
