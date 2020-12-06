import React, { useState } from "react";
import styled from "styled-components";
import { BiMovie } from "react-icons/bi";

import {
	mainColor,
	subColor,
	inputColor,
	buttonColor,
	userColor,
} from "../../common/colors";
import NavSideBar from "../navSideBar/NavSideBar";

// type HeaderProps = {
// 	navBarOpen: boolean;
// 	handleClose: (navBarOpen: boolean) => void;
// };

const Header = (): JSX.Element => {
	const [navBarOpen, setNavBarOpen] = useState<boolean>(false);

	const handleNavBarClick = () => {
		setNavBarOpen(!navBarOpen);
		console.log(navBarOpen);
	};

	return (
		<Container>
			<LeftSide />
			<LogoWrap>
				<HeaderTitle>My</HeaderTitle>
				<Logo src="https://i.ibb.co/9g9J8m1/main.png" alt="myRaspberry logo" />
				<HeaderTitle>Raspberry</HeaderTitle>
			</LogoWrap>
			<SignArea>
				<MovieIcon onClick={handleNavBarClick} />
				<NavSideBar navBarOpen={navBarOpen} handleClose={handleNavBarClick} />
			</SignArea>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	height: 7.5rem;
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
	font-size: 1.9rem;
	font-weight: bold;
	color: white;
	font-family: "Montserrat", sans-serif;
	border-top-style: outset;
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
	margin-right: 1.9rem;
`;

const MovieIcon = styled(BiMovie)`
	width: 3em;
	height: 2.8em;
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
