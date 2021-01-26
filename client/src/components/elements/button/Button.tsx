import React, { useEffect, useRef, useState } from "react";
import styles from "./button.module.css";

type fromGoBtnProps = {
	goBtn?: boolean;
};

const Button: React.FC<fromGoBtnProps> = props => {
	const { goBtn } = props;
	const prevScrollY = useRef(0);
	const [scrollEvent, setScrollEvent] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 850) {
				setScrollEvent(true);
			}
			// if (currentScrollY < 850 && setScrollEvent) {
			// 	setScrollEvent(false);
			// }
			prevScrollY.current = currentScrollY;
			//console.log(scrollEvent, currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollEvent]);

	if (goBtn) {
		return (
			<div>
				<button
					data-tut="tutorial_4"
					className={styles.GoBtn}
					style={{ color: scrollEvent ? "black" : "white" }}>
					나만의 라즈베리 고르러 가기
				</button>
			</div>
		);
	} else {
		return (
			<div>
				<button className={styles.btn}>000 변경</button>
			</div>
		);
	}
};

export default Button;
