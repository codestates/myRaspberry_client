import React, { useEffect } from "react";
import MovieCard from "../card/MovieCard";
import styled from "styled-components";
import data from "../../../lib/introData.json";
import useMovies from "../../../hooks/useMovies";
import LoadingAnimation from "../../../page/LoadingAnimation";

const CardBox = () => {
	// const { moviesState, getmovieData } = useMovies();

	// useEffect(() => {
	// 	getmovieData();
	// }, []);

	// const { loading, movies } = moviesState;
	// console.log(movies);
	let introData;
	if (data && data.length > 7) {
		introData = data.slice(0, 6);
	}
	// if (loading === true) {
	// 	return <LoadingAnimation />;
	// }
	console.log(introData);
	return (
		<Container>
			{introData
				? introData.map(movie => (
						<MovieCard
							key={movie.id}
							movie={movie}
							poster={
								movie.image.posters[0] === "image/posters/default.jpg"
									? "https://i.ibb.co/HnNxZyh/default-poster.jpg"
									: `https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`
							}
						/>
				  ))
				: null}
		</Container>
	);
};
const Container = styled.div`
	display: flex;
	max-width: 65%;
`;

export default CardBox;
