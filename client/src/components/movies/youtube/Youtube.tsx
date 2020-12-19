import React from "react";
import useYoutube from "../../../hooks/useYoutube";
import styles from "./youtube.module.css";

const Youtube = ({ video, videosKey }) => {
	const { updateVideos } = useYoutube();
	return (
		<div
			className={styles.videoContainer}
			onClick={e => {
				e.preventDefault();
				updateVideos(videosKey);
			}}>
			<img className={styles.videos} src={video.url} alt="" />
		</div>
	);
};

export default Youtube;
