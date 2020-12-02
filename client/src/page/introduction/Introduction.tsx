import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styled from "styled-components";

import {
	mainColor,
	subColor,
	inputColor,
	buttonColor,
	userColor,
} from "../../common/colors";

const Introduction = (): JSX.Element => {
	return (
		<Container>
			<HeaderContainer>
				<Header />
			</HeaderContainer>
			<MainContainer />
			<FooterContainer>
				<Footer />
			</FooterContainer>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	width: 100%;
	grid-template-rows: auto auto auto;
	grid-template-columns: 100%;
	grid-template-areas:
		"HeaderContainer"
		"MainContainer"
		"FooterContainer";
	@media (max-width: 768px) {
		grid-template-rows: 1.5em auto auto auto 3em;
		grid-template-columns: auto 86% auto;
	}
`;

const HeaderContainer = styled.div`
	grid-area: HeaderContainer;
	width: 100%;
	margin: 0 0 0 0;
	@media (max-width: 768px) {
		margin: 0 0 1em 0;
	}
	@media (max-width: 414px) {
		margin: 0 0 0.4em 0;
	}
`;

const MainContainer = styled.div`
	display: grid;
	grid-area: MainContainer;
	background-color: ${mainColor};
	grid-template-columns: 15em auto;
	min-height: 600px;
	margin: 0 0 9em 0;
	@media (max-width: 768px) {
		margin: 0 0 4em 0;
	}
	@media (max-width: 414px) {
		margin: 0;
		min-height: 0;
	}
`;

const FooterContainer = styled.div`
	grid-area: FooterContainer;
	margin: 0 0 2em 0;
	@media (max-width: 768px) {
		display: none;
	}
`;

export default Introduction;
