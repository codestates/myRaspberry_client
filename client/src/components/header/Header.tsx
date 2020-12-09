import React, { useState } from "react";
import styled from "styled-components";
import { BiMovie } from "react-icons/bi";

import {
	mainColor,
	headerColor,
	textColor,
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
			<LeftSide>
				<Logo src="https://i.ibb.co/9g9J8m1/main.png" alt="myRaspberry logo" />
				<HeaderTitle>MY RASPBERRY</HeaderTitle>
			</LeftSide>
			<LogoWrap></LogoWrap>
			<SignArea>
				<MovieIcon onClick={handleNavBarClick} />
				<NavSideBar navBarOpen={navBarOpen} handleClose={handleNavBarClick} />
			</SignArea>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	height: 5.5rem;
	justify-content: center;
	background-color: ${headerColor};
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
	font-size: 1.2rem;
	font-weight: bolder;
	color: whitesmoke;
	font-family: "Montserrat", sans-serif;
	letter-spacing: 3px;
	align-self: center;
`;

const Logo = styled.img`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 4rem;
	height: 4rem;
	object-fit: contain;
	margin: 0.5rem 0 1rem 1.5rem;
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
	width: 2.5em;
	height: 2.8em;
	color: ${textColor};
	border-radius: 15%;
	:hover {
		cursor: pointer;
		color: ${userColor};
	}
`;

export default Header;
