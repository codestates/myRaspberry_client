import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { getIntroMovies, updateIntroMovies } from "../modules/introMovie";

export default function useIntroMovies() {
	const introMovieState = useSelector(
		(state: RootState) => state.introMoviesreducer,
	);
	const dispatch = useDispatch();
	const getIntroMovieData = () => dispatch(getIntroMovies());
	const onUpdateIntroMovies = () => dispatch(updateIntroMovies());
	return {
		introMovieState,
		getIntroMovieData,
		onUpdateIntroMovies,
	};
}
