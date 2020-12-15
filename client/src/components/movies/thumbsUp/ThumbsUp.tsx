import React from "react";
import styled from "styled-components";
import { RiThumbUpLine } from "react-icons/ri";

const ThumbsUp = () => {
	return <RasupImg onClick={() => alert("따봉!")} />;
};

const RasupContainer = styled.div`
	position: relative;
	display: flex;
`;

const RasupImg = styled(RiThumbUpLine)`
	display: flex;
	justify-content: column;
	width: 30%;
	top: -150px;
	color: whitesmoke;
	right: 15px;
	position: absolute;
	cursor: pointer;
	font-size: 35px;
`;

export default ThumbsUp;
