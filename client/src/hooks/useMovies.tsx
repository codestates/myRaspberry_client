import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../modules';
import {getMovies} from '../modules/movies';


export default function useMovies () {
	const moviesState = useSelector((state: RootState) => state.moviesReducer);
	const dispatch = useDispatch();
	const getmovieData = () => dispatch(getMovies())


	return {
		moviesState,
		getmovieData,
	};
}