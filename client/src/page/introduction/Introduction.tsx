import React from "react";
import IntroBanner from "../../components/introBanner/IntroBanner";
import GoButton from "../../components/goButton/GoButton";
import MovieCard from "../../components/movies/card/Card";
import styled from "styled-components";
import { mainColor, pointColor, textColor } from "../../common/colors";
import CardBox from "../../components/movies/cordBox/CardBox";
import ResultBox from "../../components/movies/resultBox/ResultBox";

const Introduction = (): JSX.Element => {
	return (
		<>
			<MainTop>
				<CardBoxContainer>
					<CardBox />
				</CardBoxContainer>
				<Title>
					<TitleText>오늘 이 영화 어때요?</TitleText>
				</Title>
				<ResultBoxContainer>
					<ResultBox />
				</ResultBoxContainer>
			</MainTop>
			<MainBottom />
			<IntroBanner />
			<GoButton />
		</>
	);
};

const MainTop = styled.div`
	/* grid-area: MainTop; */
	display: flex;
	flex-direction: column;
	margin-top: 2rem;
`;

const CardBoxContainer = styled.div`
	width: 100%;
	display: flex;
	-webkit-box-align: center;
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-around;
	margin-bottom: 1rem;
`;

const ResultBoxContainer = styled.div`
	width: 100vw;
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-left: 7%;
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

const MainBottom = styled.div`
	/* grid-area: MainBottom; */
	display: flex;
	background-color: white;
`;

const Empty = styled.div`
	grid-area: Empty;
`;

export default Introduction;
