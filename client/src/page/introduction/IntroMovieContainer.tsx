import React, { useEffect } from "react";
import IntroResultBox from "../../components/movies/resultBox/IntroResultBox";
import useIntroMovies from "../../hooks/useIntroMovies";
import LoadingAnimation from "../LoadingAnimation";

const IntroMovieContainer = () => {
	const { introMovieState, getIntroMovieData } = useIntroMovies();

	useEffect(() => {
		getIntroMovieData();
	}, []);

	const { loading, introMovies } = introMovieState;
	//console.log("intromovies:", introMovies);
	if (loading === true) {
		return <LoadingAnimation />;
	} else {
		return null;
		// <>{introMovies ? <IntroResultBox movies={introMovies.intro} /> : null}</>
	}
};

export default IntroMovieContainer;
