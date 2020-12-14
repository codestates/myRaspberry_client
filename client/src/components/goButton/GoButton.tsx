import React, { useState } from "react";
import Button from "../elements/button/Button";
import styles from "./goButton.module.css";

const GoButton: React.FC = () => {
	const [goBtn, setIsIntroBtn] = useState(true);

	return (
		<div className={styles.goBtnBox}>
			<Button goBtn={goBtn} />
		</div>
	);
};

export default GoButton;
