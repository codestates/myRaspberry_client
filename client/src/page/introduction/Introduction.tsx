import React from "react";
import IntroBanner from "../../components/introBanner/IntroBanner";
import GoButton from "../../components/goButton/GoButton";
import MovieCard from "../../components/movies/card/Card";
import styled from "styled-components";
import { mainColor, textColor } from "../../common/colors";
import CardBox from "../../components/movies/cordBox/CardBox";
import ResultBox from "../../components/movies/resultBox/ResultBox";

const Introduction = (): JSX.Element => {
	return (
		<>
			<MainTop>
				<CardBoxContainer>
					<CardBox />
				</CardBoxContainer>
				<ResultBoxContainer>
					<ResultBox />
				</ResultBoxContainer>
			</MainTop>
			<MainBottom />
			{/* <IntroBanner />
			<GoButton /> */}
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

const MainBottom = styled.div`
	/* grid-area: MainBottom; */
	display: flex;
	background-color: white;
`;

const Empty = styled.div`
	grid-area: Empty;
`;

export default Introduction;
