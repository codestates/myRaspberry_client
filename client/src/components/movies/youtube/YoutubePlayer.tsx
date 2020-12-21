import React from "react";
import styles from "./youtube.module.css";

const YoutubePlayer = ({ video }) => {
	return (
		<div className={styles.videoPlayer}>
			<iframe
				className={styles.youtube}
				src={`https://www.youtube.com/embed/${video}`}
				allowFullScreen></iframe>
		</div>
	);
};

export default YoutubePlayer;
