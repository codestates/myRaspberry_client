import React from "react";
import CardBox from "../../components/movies/cordBox/CardBox";
import ResultBox from "../../components/movies/resultBox/ResultBox";
import LoadingAnimation from "../LoadingAnimation";
import styled from "styled-components";
import MainBanner from "../../components/mainBanner/MainBanner";
import { mainColor, pointColor, textColor } from "../../common/colors";
import IntroBanner from "../../components/introBanner/IntroBanner";
import SlideMenu from "../../components/movies/slideMenu/SlideMenu";
import useMovies from "../..//hooks/useMovies";
import useUser from "../../hooks/useUser";

const Main = () => {
	const { moviesState, getmovieData } = useMovies();
	const { userState } = useUser();
	console.log("잘 넘어왔니? 데이터야?", userState);
	React.useEffect(() => {
		getmovieData();
	}, []);

	const { renew, kor, eng, long, short } = moviesState.movies;

	return (
		<>
			<MainTop>
				<SlideContainer>
					<MainBanner />
				</SlideContainer>
				<CardboxContainer>
					<Title>
						<TitleText>신작영화 어때요?</TitleText>
					</Title>
					<ResultBox renew={renew} />
					<Title>
						<TitleText>자막없이 보는 한국영화 어때요?</TitleText>
					</Title>
					<ResultBox kor={kor} />
					<Title>
						<TitleText>외국영화 어때요?</TitleText>
					</Title>
					<ResultBox eng={eng} />
					<Title>
						<TitleText>킬링타임용 짧은 영화는 어때요?</TitleText>
					</Title>
					<ResultBox long={long} />
					<Title>
						<TitleText>여유있게 긴 영화는 어때요?</TitleText>
					</Title>
					<ResultBox short={short} />
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
