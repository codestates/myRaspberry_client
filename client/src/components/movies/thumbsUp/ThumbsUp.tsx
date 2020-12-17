import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbUpLine } from "react-icons/ri";
import { compColor } from "../../../common/colors";
import useUser from "../../../hooks/useUser";
import useIntroMovies from "../../../hooks/useIntroMovies";

const ThumbsUp = ({ fromMovieCard }) => {
	const { introMovieState, onUpdateIntroMovies } = useIntroMovies();
	console.log(
		"썸즈업 버튼을 누르기 전과 후에 결과를 확인하기 위한 콘솔",
		introMovieState,
	);

	const { userState, onTagUpdate } = useUser();
	const [onMouse, setOnMouse] = useState(false);
	const handleOver = (e) => {
		e.preventDefault();
		setOnMouse(true);
	};
	const handleLeave = (e) => {
		e.preventDefault();
		setOnMouse(false);
	};
	return (
		<RasupContainer
			onMouseOver={handleOver}
			onMouseLeave={handleLeave}
			className={onMouse ? "changeThumbsColor" : ""}>
			<RasupImg
				className={onMouse ? "changeThumbsColor" : ""}
				onClick={() => {
					onTagUpdate("up", fromMovieCard.docid, fromMovieCard.tag);
					onUpdateIntroMovies();
				}}
				// onClick={() => alert("따봉!")}
			/>
		</RasupContainer>
	);
};

const RasupContainer = styled.div`
	position: relative;
	width: 35%;
	top: -5.5rem;
	height: 74px;
	border-radius: 100%;
	border: solid 2.5px white;
	&.changeThumbsColor {
		border: solid 2.5px ${compColor};
	}
`;

const RasupImg = styled(RiThumbUpLine)`
	justify-content: column;
	position: relative;
	cursor: pointer;
	color: whitesmoke;
	font-size: 35px;
	margin: auto;
	display: flex;
	overflow: visible;
	top: 25%;
	&.changeThumbsColor {
		color: ${compColor};
	}
`;

export default ThumbsUp;
