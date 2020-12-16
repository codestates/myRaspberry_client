import { Dispatch } from "redux";
import axios from "axios";
import korData from "../lib/main/kor.json";
import engData from "../lib/main/eng.json";
import renewData from "../lib/main/new.json";
import longData from "../lib/main/long.json";
import shortData from "../lib/main/short.json";

// MOVIES DATA 상태 관련 로직
// 1. 영화 데이터 요청
const moviesGetUrl = "http://localhost:8080/search/";
const newmovie = "new";
const kormovie = "kor";
const engmovie = "eng";

// 액션 type
const MOVIES_LOADING = "movies/MOVIES_LOADING" as const;
const MOVIES_SUCCESS = "movies/MOVIES_SUCCESS" as const;
const MOVIES_FAIL = "movies/MOVIES_FAIL" as const;

// 액션 생성 함수
export const moviesLoading = () => ({
	type: MOVIES_LOADING,
});

export const moviesSuccess = (data: Data) => ({
	type: MOVIES_SUCCESS,
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
	movies:
		| { renew: Data }
		| { kor: Data }
		| { eng: Data }
		| { long: Data }
		| { short: Data }
		| any;
	err: string | undefined;
};

type Data = {
	renew: MoviesType[];
	kor: MoviesType[];
	eng: MoviesType[];
	long: MoviesType[];
	short: MoviesType[];
};

// 초깃값 설정
const defaultState: DefaultState = {
	loading: false,
	movies: {
		renew: renewData,
		kor: korData,
		eng: engData,
		long: longData,
		short: shortData,
	},
	err: "",
};

export function moviesreducer(
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

export const getMovies = () => async (dispatch: Dispatch<MoviesActions>) => {
	try {
		dispatch(moviesLoading());

		// const { data } = await axios.get(moviesGetUrl + kormovie);

		// dispatch(moviesSuccess(data));
	} catch (err) {
		dispatch(moviesFail(err));
	}
};

export default moviesreducer;
