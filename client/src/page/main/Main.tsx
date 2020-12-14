import React from "react";
import CardBox from "../../components/movies/cordBox/CardBox";
import ResultBox from "../../components/movies/resultBox/ResultBox";
import LoadingAnimation from "../LoadingAnimation";
import styled from "styled-components";
import { mainColor, pointColor, textColor } from "../../common/colors";
import IntroBanner from "../../components/introBanner/IntroBanner";
import SlideMenu from "../../components/movies/slideMenu/SlideMenu";

import kor from "../../lib/main/kor.json";
import eng from "../../lib/main/eng.json";
import renew from "../../lib/main/new.json";

const Main = () => {
	return (
		<>
			<MainTop>
				<SlideContainer>
					<h1>슬라이드 영역</h1>
				</SlideContainer>
				<CardboxContainer>
					<Title>
						<TitleText>신작영화 어때요?</TitleText>
					</Title>
					<ResultBox />
					<Title>
						<TitleText>자막없이 보는 한국영화 어때요?</TitleText>
					</Title>
					<ResultBox />
					<Title>
						<TitleText>외국영화 어때요?</TitleText>
					</Title>
					<ResultBox />
				</CardboxContainer>
			</MainTop>
			{/* TODO loading 이미지가 보고싶다면 주석을 풀어주세요 */}
			{/* <LoadingAnimation /> */}
		</>
	);
};

const MainTop = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 6rem;
`;

const SlideContainer = styled.div`
	width: 100%;
	display: flex;
	-webkit-box-align: center;
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-around;
	margin-bottom: 1rem;
	h1 {
		margin-top: 8rem;
		margin-bottom: 8rem;
	}
`;

const CardboxContainer = styled.div`
	background-color: #353535;
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-left: 5%;
	margin-top: 15px;
`;

const TitleText = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	font-family: "Lato";
	line-height: 1.5;
	font-weight: 900;
	font-size: 1.3vw;
	color: ${textColor};
	justify-content: flex-start;
`;

export default Main;
