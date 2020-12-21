import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbUpLine } from "react-icons/ri";
import { compColor } from "../../../common/colors";
import useUser from "../../../hooks/useUser";
import ReactTooltip from "react-tooltip";
import useIntroMovies from "../../../hooks/useIntroMovies";
import useMovies from "../../../hooks/useMovies";

const ThumbsUp = ({ fromMovieCard }) => {
	const { introMovieState, onUpdateIntroMovies } = useIntroMovies();
	const { moviesState, onUpdateMovies } = useMovies();
	const { userState, onTagUpdate } = useUser();
	const [onMouse, setOnMouse] = useState(false);
	const isSelected = () => userState.selectMovie && userState.selectMovie[fromMovieCard.docid] !== undefined && userState.selectMovie[fromMovieCard.docid] === 2;
	
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
			className={isSelected() || onMouse ? "changeThumbsColor" : ""}>
			<RasupImg
				className={isSelected() || onMouse ? "changeThumbsColor" : ""}
				onClick={(e) => {
					e.stopPropagation();
					onTagUpdate("up", fromMovieCard.docid, fromMovieCard.tag);
					onUpdateIntroMovies();
					onUpdateMovies();
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
