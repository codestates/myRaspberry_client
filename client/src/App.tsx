import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Introduction from "./page/introduction/Introduction";
import Main from "./page/main/Main";
import Mypage from "./page/mypage/Mypage";
import Sign from "./page/sign/Sign";

import {
	mainColor,
	subColor,
	inputColor,
	buttonColor,
	userColor,
} from "./common/colors";

const App = (): JSX.Element => (
	<BrowserRouter>
		<Container>
			<HeaderContainer>
				<Header />
			</HeaderContainer>
			<MainContainer>
				<Switch>
					<Route path={["/", "/intro"]} exact component={Introduction} />
					<Route path="/main" component={Main} />
					<Route path="/mypage" component={Mypage} />
					<Route path="/user" component={Sign} />
				</Switch>
			</MainContainer>
			<FooterContainer>
				<Footer />
			</FooterContainer>
		</Container>
	</BrowserRouter>
);

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
		grid-template-rows: auto auto auto;
		grid-template-columns: 100%;
	}
`;

const HeaderContainer = styled.div`
	grid-area: HeaderContainer;
	width: 100%;
	margin: 0 0 0 0;
	@media (max-width: 768px) {
		margin: 0 0 0;
	}
	@media (max-width: 414px) {
		margin: 0 0 0;
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
		margin: 0 0 0;
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

export default App;

{
	/* <Switch>
			<Route path="/" exact component={Introduction} />
			<Route path="/main" component={Main} />
			<Route path="/mypage" component={Mypage} />
			<Route path="/user" component={Sign} />
		</Switch> */
}
