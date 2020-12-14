import React from "react";
import styles from "./youtube.module.css";

const Youtube = ({ video }) => {
	return (
		<div className={styles.videoContainer}>
			<iframe
				className={styles.youtube}
				src={`https://www.youtube.com/embed/${video}`}
				allowFullScreen></iframe>
		</div>
	);
};

export default Youtube;
