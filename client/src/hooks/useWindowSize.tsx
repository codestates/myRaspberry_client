import { useEffect, useState } from "react";

export default function useWindowSize() {
	const isBrowser = typeof window === "object";

	function getSize() {
		return {
			width: isBrowser ? window.innerWidth : undefined,
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect((): any => {
		if (!isBrowser) {
			return false;
		}
		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
}
