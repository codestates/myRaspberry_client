import React from "react";
import MovieCard from "../card/Card";
import styled from "styled-components";
import { Data } from "../../../api/moveis";

const { movies } = Data;
if (movies.length > 7) {
	movies.splice(6);
}
const CardBox = () => {
	return (
		<Container>
			{movies.map(movie => (
				<MovieCard key={movie.id} poster={movie.medium_cover_image} />
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	max-width: 45%;
	margin-left: 2rem;
	margin-right: 2rem;
`;

export default CardBox;
