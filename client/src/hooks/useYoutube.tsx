import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { getVideos } from "../modules/youtube";

export default function useYoutube() {
	const videoState = useSelector((state: RootState) => state.youtubeReducer);
	const dispatch = useDispatch();
	const getVideoData = title => dispatch(getVideos(title));

	return {
		videoState,
		getVideoData,
	};
}
