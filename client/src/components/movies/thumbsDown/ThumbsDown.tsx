import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbDownLine } from "react-icons/ri";
import { pointColor } from "../../../common/colors";
import useUser from "../../../hooks/useUser";
import ReactTooltip from "react-tooltip";
import useIntroMovies from "../../../hooks/useIntroMovies";

const ThumbsDown = ({ fromMovieCard }) => {
	const { introMovieState, onUpdateIntroMovies } = useIntroMovies();
	const [onMouse, setOnMouse] = useState(false);
	const { userState, onTagUpdate } = useUser();

	const isSelected = () => userState.selectMovie && userState.selectMovie[fromMovieCard.docid] !== undefined && userState.selectMovie[fromMovieCard.docid] === 0;
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
			data-for="thumbsDownTip"
			onMouseOver={handleOver}
			onMouseLeave={handleLeave}
			className={isSelected() || onMouse ? "changeThumbsColor" : ""}>
			<RasupImg
				className={isSelected() || onMouse ? "changeThumbsColor" : ""}
				onClick={(e) => {
					e.stopPropagation();
					onTagUpdate("down", fromMovieCard.docid, fromMovieCard.tag);
					onUpdateIntroMovies();
				}}
			/>
			<ReactTooltip
				className="tooltip"
				id="thumbsDownTip"
				place="top"
				type="light"
				effect="solid">
				내 취향이 아니에요!
			</ReactTooltip>
		</RasupContainer>
	);
};

const RasupContainer = styled.div`
	position: relative;
	width: 28%;
	top: -5.1rem;
	height: 61px;
	display: inline-block;
	border-radius: 100%;
	z-index: 99;
	opacity: 1;
	border: solid 3.2px whitesmoke;
	&.changeThumbsColor {
		border: solid 3.2px ${pointColor};
	}
`;

const RasupImg = styled(RiThumbDownLine)`
	justify-content: column;
	position: relative;
	cursor: pointer;
	color: whitesmoke;
	font-size: 35px;
	margin: auto;
	display: flex;
	top: 19%;
	z-index: 100;
	overflow: auto;
	&.changeThumbsColor {
		color: ${pointColor};
	}
`;

export default ThumbsDown;
