import React from "react";
import MovieCard from "../card/MovieCard";
import styled from "styled-components";
import data from "../../../lib/introData.json";

const CardBox = () => {
	let introData;
	if (data && data.length > 7) {
		introData = data.slice(0, 6);
	}

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
	max-width: 100%;
`;

export default CardBox;
