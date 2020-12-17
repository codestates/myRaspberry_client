import { MoviesType } from "./movies";
import { Dispatch } from "redux";
import introData from "../lib/introData.json";
import userReducer from "./users";

// 액션 type
const INTRO_MOVIES_LOADING = "intro/MOVIES_LOADING" as const;
const INTRO_MOVIES_SUCCESS = "intro/MOVIES_SUCCESS" as const;
const INTRO_MOVIES_FAIL = "intro/MOVIES_FAIL" as const;
const INTRO_MOVIES_UPDATE = "intro/INTRO_MOVIES_UPDATE" as const;

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

export const introMovieUpdate = (data: MoviesType[]) => ({
	type: INTRO_MOVIES_UPDATE,
	payload: data,
});

type IntroMoviesDispatchTypes =
	| ReturnType<typeof introMoviesLoading>
	| ReturnType<typeof introMoviesSuccess>
	| ReturnType<typeof introMoviesFail>
	| ReturnType<typeof introMovieUpdate>;

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
	action: IntroMoviesDispatchTypes,
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
		case INTRO_MOVIES_UPDATE:
			return {
				...state,
				loading: false,
				introMovies: {
					intro: action.payload,
				},
			};
		default:
			return state;
	}
}

export const getIntroMovies = () => async (
	dispatch: Dispatch<IntroMoviesDispatchTypes>,
) => {
	try {
		dispatch(introMoviesLoading());
	} catch (err) {
		dispatch(introMoviesFail(err));
	}
};

const getScore = (tag: object, movie: number[]): number => {
	if (Object.keys(tag).length > 0 && movie) {
		const userFav: number[] = Object.keys(tag).map((x) => Number(x));
		const isUserLike: number[] = userFav.filter((x) => movie.includes(x));

		return isUserLike.reduce((a, c) => (tag[c] ? a + tag[c] : a), 0) * 10;
	}
	return 0;
};

const updateMovies = (userTag: any, movies: MoviesType[]): MoviesType[] => {
	if (Object.keys(userTag).length > 0) {
		const { like, dislike } = userTag;
		for (let movie of movies) {
			movie.score += getScore(like, movie.tag);
			movie.score -= getScore(dislike, movie.tag);
		}
	}
	return movies;
};

export const updateIntroMovies = () => async (
	dispatch: Dispatch<IntroMoviesDispatchTypes>,
	getState: any,
) => {
	try {
		let movies = getState().introMoviesreducer;

		// const user = useUser().userState --> hook 요청은 함수 컴포넌트 내에서만 가능
		const user = getState().userReducer;
		console.log(
			"introMovie.ts에서 업 다운 버튼 클릭 하면 가져오는 유저 데이터 ",
			user,
		);
		const likeMovies: MoviesType[] = [];
		const dislikeMovies: MoviesType[] = [];
		let neutralMovies: MoviesType[] = [];
		
		for ( let movie of movies.introMovies.intro ) {
			if ( user.selectMovie[movie.docid] === 0) {
				if (movie.score > 800) {
					movie.score -= 200;
				}
				dislikeMovies.push(movie);
			} else if ( user.selectMovie[movie.docid] === 2 ) {
				if (movie.score < 1300) {
					movie.score += 100;
				}
				likeMovies.push(movie);
			} else {
				neutralMovies.push(movie);
			}
		}

		neutralMovies = updateMovies(user.tag, neutralMovies);
		const newMovies = [...likeMovies, ...neutralMovies, ...dislikeMovies].sort((a, b) => b.score - a.score);
		
		console.log("likeMovies: ", likeMovies);
		console.log("dislikeMovies: ", dislikeMovies);
		console.log("neutralMovies: ", neutralMovies);

		dispatch(introMovieUpdate([...newMovies]));
	} catch (err) {
		dispatch(introMoviesFail(err));
	}
};

export default introMoviesreducer;
