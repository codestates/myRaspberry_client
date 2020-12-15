import { Dispatch } from "redux";
import axios from "axios";
import "dotenv/config";

//1. url
//const youtubeGetUrl = "https://www.googleapis.com/youtube/v3/";
//search?part=snippet&key=${YOUTUBE_API_KEY}&q=${query}&maxResult=${max}&type=video&videoEmbeddable=true

//2. 액션 type
const SEARCH_LOADING = "youtube/SEARCH_LOADING" as const;
const SEARCH_VIDEOS = "youtube/SEARCH_VIDEOS" as const;
const SEARCH_FAIL = "youtube/SEARCH_FAIL" as const;

//3. 액션 생성 함수
export const searchLoading = () => ({
	type: SEARCH_LOADING,
});

export const searchVideos = (data: Videos[]) => ({
	type: SEARCH_VIDEOS,
	payload: data,
});

export const searchFail = (e: string) => ({
	type: SEARCH_FAIL,
	payload: e,
});

export type Videos = {
	video: string[];
	id: {
		videoId: string;
	};
};

interface searchLoading {
	type: typeof SEARCH_LOADING;
}

interface searchVideos {
	type: typeof SEARCH_VIDEOS;
	payload: Videos[];
}

interface searchFail {
	type: typeof SEARCH_FAIL;
	payload?: string;
}

type YoutubeDispatchTypes = searchLoading | searchVideos | searchFail;

// 상태를 위한 타입 선언
export type DefaultState = {
	loading: boolean;
	videos?: Videos[];
	err: string;
};

// 초깃값 설정
const defaultState: DefaultState = {
	loading: false,
	videos: [],
	err: "",
};

export function youtubeReducer(
	state: DefaultState = defaultState,
	action: YoutubeDispatchTypes
): DefaultState {
	switch (action.type) {
		case SEARCH_LOADING:
			return {
				loading: true,
				videos: [],
				err: "",
			};
		case SEARCH_VIDEOS:
			return {
				...state,
				loading: false,
				videos: action.payload,
			};
		case SEARCH_FAIL:
			return {
				...state,
				loading: false,
				err: "NOT FOUND: YOUTUBE",
			};
		default:
			return state;
	}
}

export const getVideos = title => async (
	dispatch: Dispatch<YoutubeDispatchTypes>
) => {
	try {
		dispatch({
			type: SEARCH_LOADING,
		});

		const { data } = await axios.get(`https://localhost/movie/${title}`);
		dispatch(searchVideos(data.items));
	} catch (e) {
		dispatch(searchFail(e));
	}
};

export default youtubeReducer;
