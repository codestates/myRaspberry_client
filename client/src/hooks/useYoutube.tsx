import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { getVideos, swapVideos } from "../modules/youtube";

export default function useYoutube() {
	const videoState = useSelector((state: RootState) => state.youtubeReducer);
	const dispatch = useDispatch();
	const getVideoData = title => dispatch(getVideos(title));
	const updateVideos = key => dispatch(swapVideos(key));

	return {
		videoState,
		getVideoData,
		updateVideos,
	};
}
