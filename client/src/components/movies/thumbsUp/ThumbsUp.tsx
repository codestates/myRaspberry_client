import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbUpLine } from "react-icons/ri";
import { compColor } from "../../../common/colors";
import useUser from "../../../hooks/useUser";
import ReactTooltip from "react-tooltip";
import useIntroMovies from "../../../hooks/useIntroMovies";

const ThumbsUp = ({ fromMovieCard }) => {
	const { introMovieState, onUpdateIntroMovies } = useIntroMovies();
	console.log(
		"썸즈업 버튼을 누르기 전과 후에 결과를 확인하기 위한 콘솔",
		introMovieState
	);

	const { userState, onTagUpdate } = useUser();
	const [onMouse, setOnMouse] = useState(false);
	const handleOver = e => {
		e.preventDefault();
		setOnMouse(true);
	};
	const handleLeave = e => {
		e.preventDefault();
		setOnMouse(false);
	};
	return (
		<RasupContainer
			data-tip
			data-for="thumbsUpTip"
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
			<ReactTooltip
				className="tooltip"
				id="thumbsUpTip"
				place="top"
				type="light"
				effect="solid">
				좋아요!
			</ReactTooltip>
		</RasupContainer>
	);
};

const RasupContainer = styled.div`
	position: relative;
	width: 28%;
	top: -5.1rem;
	height: 61px;
	border-radius: 100%;
	border: solid 3.2px whitesmoke;
	&.changeThumbsColor {
		border: solid 3.2px ${compColor};
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
	top: 19%;
	&.changeThumbsColor {
		color: ${compColor};
	}
`;

export default ThumbsUp;
