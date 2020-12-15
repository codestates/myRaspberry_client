import React, { useEffect } from "react";
import IntroResultBox from "../../components/movies/resultBox/IntroResultBox";
import useIntroMovies from "../../hooks/useIntroMovies";

const IntroMovieContainer = () => {
	const { introMovieState, getIntroMovieData } = useIntroMovies();

	useEffect(() => {
		getIntroMovieData();
	}, []);

	const { loading, introMovies } = introMovieState;
	console.log("intromovies:", introMovies);
	return (
		<>
			{introMovies.intro.map(movie => (
				<IntroResultBox
					movie={movie}
					poster={
						movie.image.posters[0] === "image/posters/default.jpg"
							? "https://i.ibb.co/HnNxZyh/default-poster.jpg"
							: `https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`
					}
				/>
			))}
		</>
	);
};

export default IntroMovieContainer;
