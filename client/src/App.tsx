import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Introduction from "./page/introduction/Introduction";
import Main from "./page/main/Main";
import Mypage from "./page/mypage/Mypage";
import Sign from "./page/sign/Sign";
import { GlobalStyle } from "./styles/global-styles";
import { headerColor } from "./common/colors";
import "./App.css";

const App = (): JSX.Element => {
	const [scrollEvent, setScrollEvent] = useState<boolean>(false);
	const prevScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 100) {
				setScrollEvent(true);
			}

			if (currentScrollY < 100) {
				setScrollEvent(false);
			}
			prevScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollEvent]);

	return (
		<div>
			<GlobalStyle />
			<HeaderContainer className={scrollEvent ? "act smooth" : ""}>
				<Header />
			</HeaderContainer>
			<Switch>
				<MainContainer>
					<Route path={["/", "/intro"]} exact component={Introduction} />
					<Route path="/main" component={Main} />
					<Route path="/mypage" component={Mypage} />
					<Route path="/user" component={Sign} />
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
	z-index: 2;
	top: 0;
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #111;
	height: 100%; //100% 바꾸지 말 것
	padding: 0px 0 0;
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
