import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import loadingPage from "../lottie/movie-theatre.json";

//TODO promise tracker 찾아보기

const LoadingAnimation = (): JSX.Element => {
	const defaultOption = {
		loop: true,
		autoplay: true,
		animationData: loadingPage,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<>
			<Wrap>
				<Loading>
					<Lottie options={defaultOption} height="90%" width="90%" />
				</Loading>
			</Wrap>
		</>
	);
};

const Wrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: lightgray;
	opacity: 0.6;
	z-index: 99;
`;

const Loading = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
	background-color: black;
	border-radius: 50%;
	width: 13.5vw;
	height: 13.5vw;
`;

export default LoadingAnimation;
