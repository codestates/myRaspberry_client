import React from "react";
import useYoutube from "../../../hooks/useYoutube";
import styles from "./youtube.module.css";

const Youtube = ({ video, videosKey }) => {
	console.log("위에서", videosKey);
	const { updateVideos } = useYoutube();
	return (
		<div
			className={styles.videoContainer}
			onClick={e => {
				console.log("안에서", videosKey);
				e.preventDefault();
				updateVideos(videosKey);
			}}>
			<img className={styles.videos} src={video.url} alt="" />
		</div>
	);
};

export default Youtube;
