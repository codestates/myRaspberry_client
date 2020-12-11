import React, {useEffect} from "react";
import MovieCard from "../card/Card";
import styled from "styled-components";
// import { Data } from "../../../api/moveis";
import useMovies  from "../../../hooks/useMovies"
import LoadingAnimation from "../../../page/LoadingAnimation";

const CardBox = () => {
	const {moviesState, getmovieData} = useMovies();
  
	useEffect(() => {
		getmovieData()
	}, [])

	const {loading, movies} = moviesState
	if(movies && movies.length > 7) {
		movies.splice(6);
	}
	if(loading === true) {
		return (
			<LoadingAnimation />
		)
	} else {

	return (
		<Container>
			{movies? movies.map(movie => (
				<MovieCard key={movie.id} poster={movie.image.posters[0] === "image/posters/default.jpg" ?  "https://i.ibb.co/HnNxZyh/default-poster.jpg" : `https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`} />
			)) : null}
		</Container>
	);
	}
};

const Container = styled.div`
	display: flex;
	max-width: 65%;
`;

export default CardBox;
