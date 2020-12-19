import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Introduction from "./page/introduction/Introduction";
import Main from "./page/main/Main";
import Mypage from "./page/mypage/Mypage";
import Sign from "./page/sign/Sign";

const App = (): JSX.Element => {
	return (
		<div>
			<HeaderContainer>
				<Header />
			</HeaderContainer>
			<Switch>
				<MainContainer>
					<Route path={["/", "/intro"]} exact component={Introduction} />
					<Route path="/main" component={Main} />
					<Route path="/mypage" component={Mypage} />
					<SignContainer>
						<Route path="/user" component={Sign} />
					</SignContainer>
				</MainContainer>
			</Switch>
			<FooterContainer>
				<Footer />
			</FooterContainer>
		</div>
	);
};

const HeaderContainer = styled.header`
	position: fixed;
	width: 100%;
	height: 60px;
	z-index: 100;
	top: 0;
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #111;
	height: 100%; //100% 바꾸지 말 것
	padding: 0px 0 0;
`;

const SignContainer = styled(MainContainer)`
	background: url("https://c.wallhere.com/photos/59/70/movie_scenes_Joker_2019_Movie-1865461.jpg!d")
		center center / cover no-repeat;
	position: relative;
	height: 100vh;
	/* display: flex; */
	z-index: 1;
	/* flex-direction: column; */
	-webkit-box-pack: center;
	justify-content: center;
	::after {
		top: 0;
		left: 0;
		filter: alpha(opacity=50);
		width: 100%;
		height: 100%;
		position: absolute;
		content: "";
		z-index: -1;
		background: rgb(0, 0, 0);
		opacity: 0.63 !important;
	}
`;

const FooterContainer = styled.footer`
	overflow: auto;
	width: 100%;
	padding: 40px 18px 18px;
	padding-bottom: 100px;
	position: relative;
	background-color: #28323c;
	box-sizing: border-box;
	padding-bottom: 25px;
`;

export default App;
