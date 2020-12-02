import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiMovie } from "react-icons/bi";

import {
	mainColor,
	subColor,
	inputColor,
	buttonColor,
	userColor,
} from "../../common/colors";

const Header = () => {
	return (
		<Container>
			<LeftSide />
			<LogoWrap>
				<HeaderTitle>My</HeaderTitle>
				<Logo src="https://i.ibb.co/9g9J8m1/main.png" alt="myRaspberry logo" />
				<HeaderTitle>Raspberry</HeaderTitle>
			</LogoWrap>
			<SignArea>
				{/* <FontAwesomeIcon icon="user-circle" size="2x" color="#CF3535" /> */}
				<MovieIcon />
			</SignArea>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	background-color: ${mainColor};
`;

const LeftSide = styled.div`
	display: flex;
	float: left;
	width: 33%;
`;

const LogoWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	float: left;
	width: 33%;

	margin: 0 0 0 1.5em;
	@media (max-width: 768px) {
		margin: 0 0 0 0.8em;
		min-width: 55px;
		min-height: 55px;
	}
	@media (max-width: 414px) {
		margin: 0 0.5em 0 0;
		min-width: 45px;
		min-height: 45px;
	}
`;

const HeaderTitle = styled.p`
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
`;

const Logo = styled.img`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5rem;
	height: 5rem;
	object-fit: contain;
	// margin: 0 -0.5em 0 -0.5em;
`;

const SignArea = styled.div`
	display: flex;
	float: left;
	width: 33%;
	align-items: center;
	place-content: flex-end;
	margin-right: 1rem;
`;

const MovieIcon = styled(BiMovie)`
	width: 2em;
	height: 2em;
	color: ${userColor};
	background-color: white;
	border-radius: 15%;
	:hover {
		cursor: pointer;
		background-color: ${userColor};
		color: white;
	}
`;

export default Header;
