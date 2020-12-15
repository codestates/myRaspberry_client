import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { getIntroMovies } from "../modules/introMovie";

export default function useIntroMovies() {
	const introMovieState = useSelector(
		(state: RootState) => state.introMoviesreducer
	);
	const dispatch = useDispatch();
	const getIntroMovieData = () => dispatch(getIntroMovies());

	return {
		introMovieState,
		getIntroMovieData,
	};
}
