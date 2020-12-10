import React, { useEffect, useRef, useState } from "react";
import IntroBanner from "../../components/introBanner/IntroBanner";
import GoButton from "../../components/goButton/GoButton";
import MovieCard from "../../components/movies/card/Card";
import styled from "styled-components";
import { mainColor, pointColor, textColor } from "../../common/colors";
import CardBox from "../../components/movies/cordBox/CardBox";
import ResultBox from "../../components/movies/resultBox/ResultBox";
import test from "./count";

const Introduction = (): JSX.Element => {
	const prevScrollY = useRef(0);
	//스크롤 이벤트
	const [scrollEvent, setScrollEvent] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 850) {
				setScrollEvent(true);
			}
			// if (currentScrollY < 850 && setScrollEvent) {
			// 	setScrollEvent(false);
			// }
			prevScrollY.current = currentScrollY;
			//console.log(scrollEvent, currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollEvent]);

	useEffect(() => {
		scrollEvent && test();
	}, [scrollEvent]);

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
			<MainBottom>
				<BottomContainer>
					<MainImage>
						<BottomInner>
							<InnerText>
								<span>당신을 위한 확실한 영화 추천 서비스</span>
								<br />
							</InnerText>
							<InnerText2>
								무엇을 싫어하는지 잘 알고있는 당신을 위한 서비스입니다.
							</InnerText2>
						</BottomInner>
					</MainImage>
				</BottomContainer>
			</MainBottom>
			<Description>
				<MovieCount className="counting" data-count="13875">
					0
				</MovieCount>
				<TagCount className="counting" data-count="116116">
					0
				</TagCount>
			</Description>
			<IntroBanner />
			<GoButton />
		</>
	);
};

const MainTop = styled.div`
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
	margin-bottom: 4rem;
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
	display: flex;
	background-color: white;
`;

const BottomContainer = styled.div`
	width: 100%;
	height: fit-content;
`;

const MainImage = styled.div`
	height: 800px;
	display: flex;
	position: relative;
	flex-direction: column;
	-webkit-box-pack: center;
	justify-content: center;
	z-index: 1;
	background-image: url("https://c.wallhere.com/photos/59/70/movie_scenes_Joker_2019_Movie-1865461.jpg!d");
	/* opacity: 0.63; */
`;

const BottomInner = styled.div`
	position: relative;
	z-index: 1;
	text-align: center;
	right: 18%;
`;

const InnerText = styled.h3`
	color: #fff;
	font-size: 3.4722222222222223vw;
	z-index: 4;
	font-weight: 400;
	-webkit-letter-spacing: -0.24305555555555555vw;
	-moz-letter-spacing: -0.24305555555555555vw;
	-ms-letter-spacing: -0.24305555555555555vw;
	letter-spacing: -0.24305555555555555vw;
	line-height: 4.375vw;
	white-space: pre-wrap;
	margin-bottom: 1.1111111111111112vw;
`;

const InnerText2 = styled.h4`
	color: #fff;
	font-size: 1.5277777777777777vw;
	font-weight: 400;
	-webkit-letter-spacing: -0.04861111111111111vw;
	-moz-letter-spacing: -0.04861111111111111vw;
	-ms-letter-spacing: -0.04861111111111111vw;
	letter-spacing: -0.04861111111111111vw;
	line-height: 2.2916666666666665vw;
	margin-bottom: 3.75vw;
`;

const Description = styled.div`
	display: flex;
	flex-direction: column;
	background: whitesmoke;
`;

const MovieCount = styled.p`
	line-height: 1.4;
	font-size: 30px;
	font-weight: bold;
	color: #333;
`;

const TagCount = styled.div`
	line-height: 1.4;
	font-size: 30px;
	font-weight: bold;
	color: #333;
`;

export default Introduction;
