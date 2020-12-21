import { Dispatch } from "redux";
import axios from "axios";
import korData from "../lib/main/kor.json";
import engData from "../lib/main/eng.json";
import renewData from "../lib/main/new.json";
import longData from "../lib/main/long.json";
import shortData from "../lib/main/short.json";
import { type } from "os";

// MOVIES DATA 상태 관련 로직
// 1. 영화 데이터 요청
const moviesGetUrl = "https://myraspberry.shop/search/";

// 액션 type
const MOVIES_LOADING = "movies/MOVIES_LOADING" as const;
const MOVIES_SUCCESS = "movies/MOVIES_SUCCESS" as const;
const MOVIES_SEARCH = "movies/MOVIES_SEARCH" as const;
const MOVIES_UPDATE = "movies/MOVIES_UPDATE" as const;
const MOVIES_FAIL = "movies/MOVIES_FAIL" as const;

// 액션 생성 함수
export const moviesLoading = () => ({
	type: MOVIES_LOADING,
});

export const moviesSuccess = (data: any) => ({
	type: MOVIES_SUCCESS,
	payload: data,
});

export const moviesSearch = (data: DefaultState) => ({
	type: MOVIES_SEARCH,
	payload: data,
});

export const moviesUpdate = (data: any) => ({
	type: MOVIES_UPDATE,
	payload: data,
});

export const moviesFail = (err: string) => ({
	type: MOVIES_FAIL,
	payload: err,
});

export type MoviesType = {
	id: number;
	docid: string;
	title: string;
	titleEng: string;
	director: string;
	actor: string;
	plotKr: string;
	plotEng: string;
	runtime: number;
	genre: string;
	image: {
		posters: string;
		stlls: string[];
	};
	tag: number[];
	date: string;
	score: number;
};

type MoviesActions =
	| ReturnType<typeof moviesLoading>
	| ReturnType<typeof moviesSuccess>
	| ReturnType<typeof moviesSearch>
	| ReturnType<typeof moviesUpdate>
	| ReturnType<typeof moviesFail>;

// interface MoviesLoading {
// 	type: typeof MOVIES_LOADING;
// }

// interface MoviesSuccess {
// 	type: typeof MOVIES_SUCCESS;
// 	payload: MoviesType[];
// }

// interface MoviesFail {
// 	type: typeof MOVIES_FAIL;
// 	payload?: string;
// }

// type MoviesDispatchTypes = MoviesLoading | MoviesSuccess | MoviesFail;

// 상태를 위한 타입 선언
export type DefaultState = {
	loading: boolean;
	movies: Data
		| { renew: MoviesType[] }
		| { kor: MoviesType[] }
		| { eng: MoviesType[] }
		| { long: MoviesType[] }
		| { short: MoviesType[] }
		| any;
	err: string | undefined;
};

type Data = {
	renew?: MoviesType[];
	kor?: MoviesType[];
	eng?: MoviesType[];
	long?: MoviesType[];
	short?: MoviesType[];
};

const convertArr = (obj) => {
	const keys = Object.keys(obj);
	const result: any = [];
	for ( let key of keys ) {
		result.push(obj[key]);
	}
	return result;
}

const getData = (obj) => {
	const result: any = [];
	for ( let index in obj ) {
		const { image, tag } = obj[index];
		const { posters, stlls } = image;
		obj[index].tag = convertArr(tag);
		obj[index].image.posters = convertArr(posters);
		obj[index].image.stlls = convertArr(stlls);
		result.push(obj[index]);
	}
	return result;
}

// 초깃값 설정
const defaultState: DefaultState = {
	loading: false,
	movies: {
		renew: getData(renewData),
		kor: getData(korData),
		eng: getData(engData),
		long: getData(longData),
		short: getData(shortData),
	},
	err: "",
};

export function moviesReducer(
	state: DefaultState = defaultState,
	action: MoviesActions
): DefaultState {
	switch (action.type) {
		case MOVIES_LOADING:
			return {
				...state,
				loading: true,
				err: "",
			};
		case MOVIES_SUCCESS:
			return {
				...state,
				loading: false,
				movies: action.payload,
			};
		case MOVIES_SEARCH:
			return {
				...state,
				...action.payload,
			};
		case MOVIES_UPDATE:
			return {
				...state,
				movies: action.payload,
			};
		case MOVIES_FAIL:
			return {
				...state,
				loading: false,
				err: action.payload,
			};
		default:
			return state;
	}
}

const getScore = (tag: object, movie: number[]): number => {
	if (Object.keys(tag).length > 0 && movie) {
		const userFav: number[] = Object.keys(tag).map((x) => Number(x));
		const isUserLike: number[] = userFav.filter((x) => movie.includes(x));

		return isUserLike.reduce((a, c) => (tag[c] ? a + tag[c] : a), 0) * 10;
	}
	return 0;
};

const updateMovieScore = (userTag: any, movies: MoviesType[]): MoviesType[] => {
	if (Object.keys(userTag).length > 0) {
		const { like, dislike } = userTag;
		for (let movie of movies) {
			movie.score += getScore(like, movie.tag);
			movie.score -= getScore(dislike, movie.tag);
		}
	}
	return movies;
};

export const updateMovies = () => async (
	dispatch: Dispatch<MoviesActions>,
	getState: any,
) => {
	try {
		const originState = getState().moviesReducer;
		const moviesState = {...originState};
		const user = getState().userReducer;
		const categories = Object.keys(moviesState.movies);

		for ( let category of categories ) {
			const likeMovies: MoviesType[] = [];
			const dislikeMovies: MoviesType[] = [];
			let neutralMovies: MoviesType[] = [];
			for ( let movie of moviesState.movies[category] ) {
				switch (user.selectMovie[movie.docid]) {
					case 0:
						if (movie.score > 800) {
							movie.score -= 200;
						}
						dislikeMovies.push(movie);
						break;
					case 1:
							movie.score = 1000;
							neutralMovies.push(movie);
							break;
					case 2:
						if (movie.score < 1300) {
							movie.score += 100;
						}
						likeMovies.push(movie);
						break;
					default:
						neutralMovies.push(movie);
						break;
				}
			}
			neutralMovies = updateMovieScore(user.tag, neutralMovies);
			moviesState.movies[category] = [...likeMovies, ...neutralMovies, ...dislikeMovies].sort((a, b) => b.score - a.score);
		}

		dispatch(moviesUpdate({...moviesState.movies}));
	} catch (err) {
		console.log(err);
		dispatch(moviesFail(err));
	}
};


export const searchMovies = (tag: string) => async (dispatch: Dispatch<MoviesActions>, getState: any ) => {
	try {
		const moviesState = getState().moviesReducer;

		const { data } = await axios.get(moviesGetUrl + tag);
		moviesState.movies[tag] = data;

		dispatch(moviesSearch({...moviesState}));
	} catch (err) {
		dispatch(moviesFail(err));
	}
};

export const getMovies = () => async (dispatch: Dispatch<MoviesActions> ) => {
	try {
		dispatch(moviesLoading());

		// const kor = "kor";
		// const eng = "eng";
		// const renew = "renew";
		// const long = "long";
		// const short = "short";
		// // const { data } = await axios.get(moviesGetUrl + kormovie);
		// const korPath = "../lib/main/kor.json";
		// const engPath = "../lib/main/eng.json";
		// const renewPath = "../lib/main/new.json";
		// const longPath = "../lib/main/long.json";
		// const shortPath = "../lib/main/short.json";
		// const defaultItems = [[kor, korPath], [eng, engPath], [renew, renewPath], [short, shortPath], [long, longPath]];
		// const data = {};

		// for ( let el of defaultItems) {
		// 	const movies: MoviesType[] = await axios.get(el[1]);
		// 	data[el[0]] = movies;
		// }
		// console.log("getMovies: ", data);
		// dispatch(moviesSuccess({...data}));
	} catch (err) {
		dispatch(moviesFail(err));
	}
};

export default moviesReducer;
