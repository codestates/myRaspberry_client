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
import count from "./count";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Tour from "reactour";
import "./introduction.css";

const Introduction = (): JSX.Element => {
	const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
	const { onCallUserStateOfLocalStorage } = useUser();
	const [goRender, setGoRender] = useState<boolean>(false);

	const accentColor = "#363232";
	const prevScrollY = useRef(0);
	//스크롤 이벤트
	const [scrollEvent, setScrollEvent] = useState(false);

	useEffect(() => {
		setIsTourOpen(true);
	}, [isTourOpen]);

	React.useEffect(() => {
		onCallUserStateOfLocalStorage();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 2000) {
				setScrollEvent(true);
			}
			prevScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrollEvent]);

	useEffect(() => {
		scrollEvent && count();
	}, [scrollEvent]);

	return (
		<>
			<MainTop>
				<CardBoxContainer data-tut="tutorial_1">
					<CardBox />
				</CardBoxContainer>
				<ResultBoxContainer data-tut="tutorial_2">
					<Title>
						<TitleText>오늘 이 영화 어때요?</TitleText>
					</Title>
					<IntroResultBox setGoRender={setGoRender} />
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
						<BottomInner data-tut="tutorial_3">
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

			{isTourOpen ? (
				<Tour
					steps={tourConfig}
					isOpen={isTourOpen}
					maskClassName="mask"
					className="helper"
					rounded={10}
					accentColor={accentColor}
					onAfterOpen={() => (document.body.style.overflowY = "hidden")}
					onBeforeClose={() => (document.body.style.overflowY = "auto")}
					onRequestClose={() => setIsTourOpen(false)}
				/>
			) : null}
		</>
	);
};

const tourConfig = [
	{
		selector: "[data-tut='tutorial_1']",
		content: () => (
			<>
				<div style={{ fontWeight: "bolder", textAlign: "center" }}>
					WELCOME! 🎥
				</div>
				<br />
				<div>
					혹시 이 중 좋아하지 않는 영화가 있나요? 영화 포스터에 마우스를 올려{" "}
					<span
						style={{
							fontWeight: "bolder",
							color: "rgb(207, 53,53)",
							border: "1px solid #f7f7f7",
							background: "none",
							fontSize: "inherit",
						}}>
						내 취향이 아니에요!
					</span>{" "}
					를 클릭해보세요.
				</div>
			</>
		),
		position: "center",
	},
	{
		selector: "[data-tut='tutorial_2']",
		content: () => (
			<>
				<div style={{ fontWeight: "bolder", textAlign: "left" }}>
					🕺선택한 영화가 목록에서 사라지죠!
				</div>
				<br />
				<div>
					<span
						style={{
							fontWeight: "bolder",
							color: "rgb(207, 53,53)",
							border: "1px solid #f7f7f7",
							background: "none",
							fontSize: "inherit",
						}}>
						마이 라즈베리
					</span>
					는 이렇게 당신의 선호를 즉시 반영하여 끊임없이 추천해 드릴 거예요!{" "}
					<img
						src="https://emoji.slack-edge.com/TR5603XSB/cool-doge/30e08c36f1f31db1.gif"
						alt="emoji"
						style={{ width: "16px" }}
					/>
				</div>
			</>
		),
	},
	{
		//https://emoji.slack-edge.com/TR5603XSB/raspberry_saw/a195b7c1dd17c311.png
		selector: "[data-tut='tutorial_3']",
		content: () => (
			<>
				<div style={{ fontWeight: "bolder", textAlign: "left" }}>
					좋아하지 않는 영화가 너무 많으신가요?
				</div>
				<br />
				<div>
					괜찮습니다!{" "}
					<span
						style={{
							fontWeight: "bolder",
							color: "rgb(207, 53,53)",
							border: "1px solid #f7f7f7",
							background: "none",
							fontSize: "inherit",
						}}>
						마이 라즈베리
					</span>
					에게는 아무리 싫어해도 추천할 영화 데이터가 이렇게나 많답니다!{" "}
					<img
						src="https://emoji.slack-edge.com/TR5603XSB/raspberry_saw/a195b7c1dd17c311.png"
						alt="emoji"
						style={{ position: "absolute", width: "20px" }}
					/>
				</div>
			</>
		),
		position: "left",
	},
	{
		selector: "[data-tut='tutorial_4']",
		content: ({ goTo }) => (
			<>
				<div style={{ fontWeight: "bolder", textAlign: "left" }}>
					더 많은 영화를 지금 바로 경험하세요!
				</div>
				<br />
				<div>
					지금 바로 하단의 버튼을 눌러주세요!
					<br />
					튜토리얼 페이지에 더 머물고 싶다면...{" "}
					<button
						style={{
							border: "1px solid #f7f7f7",
							background: "none",
							padding: ".3em .7em",
							fontSize: "inherit",
							display: "block",
							cursor: "pointer",
							margin: ".3em 1em 1em 2em",
						}}
						onClick={() => goTo(0)}>
						튜토리얼 또 체험하기{" "}
						<span aria-label="finger" role="img">
							☝
						</span>
					</button>
				</div>
			</>
		),
		position: "top",
		action: () =>
			console.log(
				` 🕺 마이 라즈베리에 방문해주셔서 감사합니다! 🕺\n\ 마이 라즈베리 서비스는 YGM 팀이 애정을 가지고 만들었습니다.\n\ 🖇 http://bit.ly/3pjNxYw`
			),
	},
];

const MainTop = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 5.5rem;
`;

const CardBoxContainer = styled.div`
	/* NOTE 반응형 만들기,,*/
	max-width: -webkit-fill-available;
	display: flex;
	-webkit-box-align: center;
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-around;
	margin-bottom: 2.2rem;
	@media (max-width: 425px) {
		overflow: hidden;
	}
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
	z-index: 1;
	background-image: url("https://www.evanerichards.com/wp-content/uploads/2009/10/DarkKnight283.jpeg");
	::after {
		z-index: 1;
		opacity: 0.2 !important;
	}
`;

const MainImage3 = styled(MainImage)`
	z-index: 0;
	background-image: url("https://wallpapercave.com/wp/i2JDlzW.jpg");
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
`;

const Description = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const MovieCount = styled.div`
	font-size: 2.2rem;
	font-weight: bold;
	letter-spacing: 5px;
	color: #fff;
	margin-right: 10.5rem;
`;

const TagCount = styled.div`
	font-size: 2.2rem;
	font-weight: bold;
	letter-spacing: 5px;
	color: #fff;
`;

const CountIcon1 = styled(RiMovie2Line)`
	color: #fff;
	margin-right: 14.5rem;
`;

const CountIcon2 = styled(AiFillTags)`
	color: #fff;
`;

export default Introduction;
