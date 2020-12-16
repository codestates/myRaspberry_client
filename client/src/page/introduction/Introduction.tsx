import React, { useEffect, useRef, useState } from "react";
import IntroBanner from "../../components/introBanner/IntroBanner";
import GoButton from "../../components/goButton/GoButton";
import MovieCard from "../../components/movies/card/MovieCard";
import IntroResultBox from "../../components/movies/resultBox/IntroResultBox";
import styled from "styled-components";
import { mainColor, pointColor, textColor } from "../../common/colors";
import CardBox from "../../components/movies/cordBox/CardBox";
import ResultBox from "../../components/movies/resultBox/ResultBox";
import { RiMovie2Line } from "react-icons/ri";
import { AiFillTags } from "react-icons/ai";
import test from "./count";
import { Link } from "react-router-dom";

const Introduction = (): JSX.Element => {
	const prevScrollY = useRef(0);
	//스크롤 이벤트
	const [scrollEvent, setScrollEvent] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 2000) {
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
					<IntroResultBox />
				</ResultBoxContainer>
			</MainTop>
			<MainBottom>
				<BottomContainer>
					<MainImage>
						<BottomInner>
							<InnerText>
								<span>"영화나 한 편 볼까?"</span>
								<br />
								<span>"고르다 시간 다 갔네!"</span>
								<br />
							</InnerText>
							<InnerText2>
								혹시 당신도 영화보는 시간보다 고르는 시간이 더 길진 않으신가요?
							</InnerText2>
						</BottomInner>
					</MainImage>
					<MainImage2>
						<BottomInner>
							<InnerText>
								<span>오늘도 고르다가 잠드실 건가요</span>
								<br />
							</InnerText>
							<InnerText2>
								호불호가 확실한 당신을 위한
								<br />
								'불호 맞춤' 마이 라즈베리 서비스로 시간을 절약하세요
							</InnerText2>
						</BottomInner>
					</MainImage2>
					<MainImage3>
						<BottomInner>
							<InnerText>
								<Description>
									<CountIcon1 />
									<CountIcon2 />
								</Description>
								<Description>
									<MovieCount className="counting" data-count="13875">
										0
									</MovieCount>
									<TagCount className="counting" data-count="116116">
										0
									</TagCount>
								</Description>
							</InnerText>
							<InnerText2>
								정확한 취향 분석 시스템을 구현합니다.
								<br />
								지금 바로 라즈베리 서비스를 이용해보세요!
							</InnerText2>
						</BottomInner>
						<Link to="main">
							<GoButton />
						</Link>
					</MainImage3>
				</BottomContainer>
			</MainBottom>
			<IntroBanner />
		</>
	);
};

const MainTop = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 5.5rem;
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
	background-color: #353535;
	margin-bottom: 2.3rem;
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-left: 5%;
	margin-top: 1rem;
	margin-bottom: 0.8rem;
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
	flex: 1;
	background-color: white;
`;

const BottomContainer = styled.div`
	width: 100%;
	height: fit-content;
`;

const MainImage = styled.div`
	position: relative;
	height: 100vh;
	display: flex;
	z-index: 1;
	flex-direction: column;
	-webkit-box-pack: center;
	justify-content: center;
	background: url("https://cdn.onebauer.media/one/empire-tmdb/films/11216/images/tVi83ttAeyMJinYpy6xfgJSpzvP.jpg")
		center center / cover no-repeat;

	::after {
		top: 0;
		left: 0;
		/* background-size: 100%; */
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

const BottomInner = styled.div`
	position: relative;
	z-index: 1;
	text-align: center;
`;

const MainImage2 = styled(MainImage)`
	z-index: 5;
	background-image: url("https://www.evanerichards.com/wp-content/uploads/2009/10/DarkKnight283.jpeg");
	::after {
		z-index: 1;
		opacity: 0.2 !important;
	}
`;

const MainImage3 = styled(MainImage)`
	z-index: 0;
	background-image: url("https://wallpapercave.com/wp/i2JDlzW.jpg");
	background-position-y: -242px;
	::after {
		z-index: -1;
		background: rgb(0, 0, 0);
	}
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
	flex-direction: row;
	justify-content: center;
`;

const MovieCount = styled.div`
	font-size: 50px;
	font-weight: bold;
	letter-spacing: 5px;
	color: #fff;
	margin-right: 5rem;
`;

const TagCount = styled.div`
	font-size: 50px;
	font-weight: bold;
	letter-spacing: 5px;
	color: #fff;
`;

const CountIcon1 = styled(RiMovie2Line)`
	color: #fff;
	margin-right: 12.5rem;
`;

const CountIcon2 = styled(AiFillTags)`
	color: #fff;
`;

export default Introduction;
