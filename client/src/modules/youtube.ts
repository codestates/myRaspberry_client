import { Dispatch } from "redux";
import axios from "axios";
import "dotenv/config";

//1. url
//const youtubeGetUrl = "https://www.googleapis.com/youtube/v3/";
//search?part=snippet&key=${YOUTUBE_API_KEY}&q=${query}&maxResult=${max}&type=video&videoEmbeddable=true

//2. 액션 type
const SEARCH_LOADING = "youtube/SEARCH_LOADING" as const;
const SEARCH_VIDEOS = "youtube/SEARCH_VIDEOS" as const;
const UPDATE_VIDEOS = "youtube/UPDATE_VIDEOS" as const;
const SEARCH_FAIL = "youtube/SEARCH_FAIL" as const;

//3. 액션 생성 함수
export const searchLoading = () => ({
	type: SEARCH_LOADING,
});

export const searchVideos = (nowRunning: YoutubeType, data: YoutubeType[]) => ({
	type: SEARCH_VIDEOS,
	payload: [nowRunning, data],
});

export const updateVideos = (data: DefaultState) => ({
	type: UPDATE_VIDEOS,
	payload: data,
});

export const searchFail = (e: string) => ({
	type: SEARCH_FAIL,
	payload: e,
});

// export type Videos = {
// 	video: string[];
// 	id: {
// 		videoId: string;
// 	};
// };

interface searchLoading {
	type: typeof SEARCH_LOADING;
}

interface searchVideos {
	type: typeof SEARCH_VIDEOS;
	payload: any;
}

interface updateVideos {
	type: typeof UPDATE_VIDEOS;
	payload: any;
}

interface searchFail {
	type: typeof SEARCH_FAIL;
	payload?: string;
}

type YoutubeDispatchTypes =
	| searchLoading
	| searchVideos
	| updateVideos
	| searchFail;

export type YoutubeType = {
	id?: string;
	title?: string;
	url?: string;
};

// 상태를 위한 타입 선언
export type DefaultState = {
	loading: boolean;
	playingVideo: YoutubeType;
	videos: object;
	title: string;
	err: string | undefined;
};

// 초깃값 설정
const defaultState: DefaultState = {
	loading: false,
	playingVideo: {
		id: "",
		title: "",
		url: "",
	},
	videos: {
		0: {
			id: "",
			title: "",
			url: "",
		},
		1: {
			id: "",
			title: "",
			url: "",
		},

		2: {
			id: "",
			title: "",
			url: "",
		},
	},
	title: "",
	err: "",
};

export function youtubeReducer(
	state: DefaultState = defaultState,
	action: YoutubeDispatchTypes
): DefaultState {
	switch (action.type) {
		case SEARCH_LOADING:
			return {
				...state,
				loading: true,
			};
		case SEARCH_VIDEOS:
			const [runningNow, others] = action.payload;
			const [zero, first, second] = others;
			return {
				...state,
				loading: false,
				playingVideo: { ...runningNow },
				videos: {
					0: { ...zero },
					1: { ...first },
					2: { ...second },
				},
			};
		case UPDATE_VIDEOS:
			return {
				...state,
				...action.payload,
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

const copyObj = (obj: object): object => {
	const newObj: object = {};
	for (let key in obj) {
		if (typeof obj[key] === "object" && Object.keys(obj[key]).length > 0) {
			const tmp = copyObj(obj[key]);
			newObj[key] = { ...tmp };
		} else {
			newObj[key] = obj[key];
		}
	}
	return newObj;
};

export const swapVideos = key => async (
	dispatch: Dispatch<YoutubeDispatchTypes>,
	getState: any
) => {
	try {
		const prevState = getState().youtubeReducer;
		const prevVideo = prevState.playingVideo;
		const updatePlayingVideo = prevState.videos[key];
		const newState: any = {
			...copyObj(prevState),
			playingVideo: { ...updatePlayingVideo },
		};
		newState.videos[key] = prevVideo;
		dispatch(updateVideos(newState));
	} catch (e) {
		dispatch(searchFail(e));
	}
};

export const getVideos = title => async (
	dispatch: Dispatch<YoutubeDispatchTypes>
) => {
	try {
		dispatch({
			type: SEARCH_LOADING,
		});

		//`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&q=${title}&maxResults=4&type=video&videoEmbeddable=true`
		//`https://myraspberry.shop/movie/${title}`
		const { data } = await axios.get(`https://myraspberry.shop/movie/${title}`);
		const videos: YoutubeType[] = [];
		data.items.forEach((item: any) => {
			const video: YoutubeType = {
				id: item.id.videoId,
				title: item.snippet.title,
				url: item.snippet.thumbnails.medium.url,
			};
			console.log(video);
			videos.push(video);
		});
		const [nowRunning, ...others] = videos;
		dispatch(searchVideos(nowRunning, others));
	} catch (e) {
		dispatch(searchFail(e));
	}
};

export default youtubeReducer;
