import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../modules';
import {getMovies, updateMovies} from '../modules/movies';


export default function useMovies () {
	const moviesState = useSelector((state: RootState) => state.moviesReducer);
	const dispatch = useDispatch();
	const getmovieData = () => dispatch(getMovies())
	const onUpdateMovies = () => dispatch(updateMovies())

	return {
		moviesState,
		getmovieData,
		onUpdateMovies
	};
}