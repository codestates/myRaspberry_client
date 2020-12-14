import React, { useState } from "react";
import styled from "styled-components";
import { BiMovie } from "react-icons/bi";

import { headerColor, textColor, userColor } from "../../common/colors";
import NavSideBar from "../navSideBar/NavSideBar";
import { Link } from "react-router-dom";

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
			<Link to="/">
				<Logo src="https://i.ibb.co/9g9J8m1/main.png" alt="myRaspberry logo" />
				<HeaderTitle>MY RASPBERRY</HeaderTitle>
			</Link>

			<MovieIcon onClick={handleNavBarClick} />
			<NavSideBar navBarOpen={navBarOpen} handleClose={handleNavBarClick} />
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	left: 50%;
	box-sizing: border-box;
	background-color: ${headerColor};
	transform: translate(-50%, 0%);
`;

const Logo = styled.img`
	position: absolute;
	top: 5%;
	z-index: 90;
	left: 11px;
	width: 56px;
	/* object-fit: contain;
	margin: 0rem 0 1rem 1.3rem; */
`;

const HeaderTitle = styled.p`
	position: absolute;
	font-size: 1.2rem;
	font-weight: bolder;
	left: 67px;
	color: whitesmoke;
	font-family: "Montserrat", sans-serif;
	letter-spacing: 3px;
	align-self: center;
`;

const MovieIcon = styled(BiMovie)`
	position: absolute;
	z-index: 90;
	right: 14px;
	top: 7px;
	width: 2em;
	height: 2.5em;
	color: ${textColor};
	border-radius: 15%;
	:hover {
		cursor: pointer;
		color: ${userColor};
	}
`;

export default Header;
