import React from "react";
import styled from "styled-components";

const ThumbsDown = () => {
	return (
		<RasupImg
			onClick={() => alert("안따봉~")}
			src="https://i.ibb.co/h241YJx/raspberry-new-bad-150.png"
			alt="thumbs-down"
		/>
	);
};

const RasupContainer = styled.div`
	position: relative;
	display: flex;
`;

const RasupImg = styled.img`
	justify-content: column;
	display: flex;
	width: 30%;
	top: -100px;
	left: 25px;
	position: absolute;
	cursor: pointer;
`;

export default ThumbsDown;
