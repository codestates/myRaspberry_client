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
	// console.log("잘 넘어왔니? 데이터야?", userState);

	React.useEffect(() => {
		getmovieData();
	}, []);

	// console.log("main", moviesState);
	const titleText = [
		"신작영화 어때요?",
		"자막없이 보는 한국영화 어때요?",
		"외국영화 어때요?",
		"킬링타임용 짧은 영화는 어때요?",
		"여유있게 긴 영화는 어때요?",
	];
	const tags = ["renew", "kor", "eng", "long", "short"];
	return (
		<>
			<MainTop>
				<SlideContainer>
					<MainBanner />
				</SlideContainer>
				<CardboxContainer>
					{tags.map((tag, i) => {
						return (
							<>
								<Title>
									<TitleText>{titleText[i]}</TitleText>
								</Title>
								<ResultBox tag={tag} data={moviesState.movies[tag]} key={tag} />
							</>
						);
					})}
				</CardboxContainer>
			</MainTop>
		</>
	);
};

const MainTop = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 7.5rem;
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
