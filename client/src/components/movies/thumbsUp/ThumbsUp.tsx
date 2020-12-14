import React from "react";
import styled from "styled-components";

const ThumbsUp = () => {
	return (
		<RasupImg
			onClick={() => alert("따봉!")}
			src="https://i.ibb.co/zfLpY3s/raspberry-new-good-150.png"
			alt="thumbs-up"
		/>
	);
};

const RasupContainer = styled.div`
	position: relative;
	display: flex;
`;

const RasupImg = styled.img`
	//background-image: url("https://i.ibb.co/zfLpY3s/raspberry-new-good-150.png");
	display: flex;
	justify-content: column;
	width: 30%;
	top: -105px;
	left: 90px;
	position: absolute;
	cursor: pointer;
`;

export default ThumbsUp;
