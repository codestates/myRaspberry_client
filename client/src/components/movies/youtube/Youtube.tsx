import React from "react";
import useYoutube from "../../../hooks/useYoutube";
import styles from "./youtube.module.css";

const he = require("he");

const Youtube = ({ video, videosKey }) => {
	const { updateVideos } = useYoutube();

	return (
		<figure
			className={styles.videoContainer}
			onClick={e => {
				e.preventDefault();
				updateVideos(videosKey);
			}}>
			<img className={styles.videos} src={video.url} alt="" />
			<figcaption>
				<h3 className={styles.title}>
					{(video.title = he.decode(video.title))}
				</h3>
			</figcaption>
		</figure>
	);
};

export default Youtube;
