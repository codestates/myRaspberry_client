import React, { useState } from "react";
import "./Card.css";
import CardDetail from "../cardDetail/CardDetail";
import ThumbsUp from "../thumbsUp/ThumbsUp";
import ThumbsDown from "../thumbsDown/ThumbsDown";
import styled from "styled-components";

//const defaultPoster: string = "https://i.ibb.co/HnNxZyh/default-poster.jpg";

const MovieCard = ({ poster, movie }) => {
	const [showDetail, setShowDetail] = useState(false);
	const [onMouse, setOnMouse] = useState(false);
	// -1 = hate / 0 = 보통 상태 / 1 = like
	const [hate, setHate] = useState(0);
	const handleOnMouse = e => {
		e.preventDefault();
		setOnMouse(true);
	};
	const handleOnMouseOut = e => {
		e.preventDefault();
		setOnMouse(false);
	};
	const closeMovieDetail = e => {
		e.preventDefault();
		setShowDetail(false);
	};
	console.log(onMouse);
	return (
		<>
			<div className="moviecard_box">
				<MovieImage
					onMouse={onMouse}
					poster={poster}
					movie={movie}
					onMouseOver={handleOnMouse}
					onMouseLeave={handleOnMouseOut}
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

function MovieImage(props: any): JSX.Element {
	const { onMouse, poster, onMouseOver, onMouseLeave, movie } = props;
	const blackBox = onMouse ? "black_box on" : "black_box";
	return (
		<div
			className="movie_image"
			style={{
				backgroundImage: `url(${poster})`,
			}}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}>
			<div className={blackBox}></div>
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

/* const MovieImage = styled.div`
  background : url(${poster})
`; */

export default MovieCard;

//onClick={() => setShowDetail(true)}
