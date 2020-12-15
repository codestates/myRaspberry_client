import React from "react";
import styled from "styled-components";
import { RiThumbDownLine } from "react-icons/ri";

const ThumbsDown = () => {
	return <RasupImg onClick={() => alert("안따봉~")} />;
};

const RasupContainer = styled.div`
	position: relative;
	display: flex;
`;

const RasupImg = styled(RiThumbDownLine)`
	justify-content: column;
	display: flex;
	width: 30%;
	top: -150px;
	left: 30px;
	position: absolute;
	cursor: pointer;
	color: whitesmoke;
	font-size: 35px;
`;

export default ThumbsDown;
