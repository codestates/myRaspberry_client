import { MoviesType } from "./movies";
import { Dispatch } from "redux";
import introData from "../lib/introData.json";

// MOVIES DATA 상태 관련 로직
// 1. 영화 데이터 요청

// 액션 type
const INTRO_MOVIES_LOADING = "intro/MOVIES_LOADING" as const;
const INTRO_MOVIES_SUCCESS = "intro/MOVIES_SUCCESS" as const;
const INTRO_MOVIES_FAIL = "intro/MOVIES_FAIL" as const;

// 액션 생성 함수
export const introMoviesLoading = () => ({
	type: INTRO_MOVIES_LOADING,
});

export const introMoviesSuccess = (data: Data) => ({
	type: INTRO_MOVIES_SUCCESS,
	payload: data,
});

export const introMoviesFail = (err: string) => ({
	type: INTRO_MOVIES_FAIL,
	payload: err,
});

// type IntroMoviesActions =
// 	| ReturnType<typeof introMoviesLoading>
// 	| ReturnType<typeof introMoviesSuccess>
// 	| ReturnType<typeof introMoviesFail>;

interface IntroMoviesLoading {
	type: typeof INTRO_MOVIES_LOADING;
}

interface IntroMoviesSuccess {
	type: typeof INTRO_MOVIES_SUCCESS;
	payload: MoviesType[];
}

interface IntroMoviesFail {
	type: typeof INTRO_MOVIES_FAIL;
	payload?: string;
}

type IntroMoviesDispatchTypes =
	| IntroMoviesLoading
	| IntroMoviesSuccess
	| IntroMoviesFail;

// 상태를 위한 타입 선언
export type DefaultState = {
	loading: boolean;
	introMovies: { intro: Data } | any;
	err: string | undefined;
};

type Data = {
	intro: MoviesType[];
};

// 초깃값 설정
const defaultState: DefaultState = {
	loading: false,
	introMovies: {
		intro: introData,
	},
	err: "",
};

export function introMoviesreducer(
	state: DefaultState = defaultState,
	action: IntroMoviesDispatchTypes
): DefaultState {
	switch (action.type) {
		case INTRO_MOVIES_LOADING:
			return {
				...state,
				loading: true,
				err: "",
			};
		case INTRO_MOVIES_SUCCESS:
			return {
				...state,
				loading: false,
				introMovies: action.payload,
			};
		case INTRO_MOVIES_FAIL:
			return {
				...state,
				loading: false,
				err: action.payload,
			};
		default:
			return state;
	}
}

export const getIntroMovies = () => async (
	dispatch: Dispatch<IntroMoviesDispatchTypes>
) => {
	try {
		dispatch(introMoviesLoading());
	} catch (err) {
		dispatch(introMoviesFail(err));
	}
};

export default introMoviesreducer;
