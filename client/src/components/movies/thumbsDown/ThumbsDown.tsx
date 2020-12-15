import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbDownLine } from "react-icons/ri";
import { pointColor } from "../../../common/colors";

const ThumbsDown = () => {
	const [onMouse, setOnMouse] = useState(false);
	const handleOver = e => {
		e.preventDefault();
		setOnMouse(true);
	};
	const handleLeave = e => {
		e.preventDefault();
		setOnMouse(false);
	};
	return (
		<RasupContainer
			onMouseOver={handleOver}
			onMouseLeave={handleLeave}
			className={onMouse ? "changeThumbsColor" : ""}>
			<RasupImg
				className={onMouse ? "changeThumbsColor" : ""}
				onClick={() => alert("안따봉~")}
			/>
		</RasupContainer>
	);
};

const RasupContainer = styled.div`
	position: relative;
	width: 35%;
	top: -5.5rem;
	height: 74px;
	display: inline-block;
	border-radius: 100%;
	z-index: 99;
	opacity: 1;
	border: solid 2.5px whitesmoke;
	&.changeThumbsColor {
		border: solid 2.5px ${pointColor};
	}
`;

const RasupImg = styled(RiThumbDownLine)`
	justify-content: column;
	position: relative;
	cursor: pointer;
	color: whitesmoke;
	font-size: 35px;
	margin: auto;
	display: flex;
	top: 25%;
	z-index: 100;
	overflow: auto;
	&.changeThumbsColor {
		color: ${pointColor};
	}
`;

export default ThumbsDown;
