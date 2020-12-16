import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbUpLine } from "react-icons/ri";
import { compColor } from "../../../common/colors";
import useUser from "../../../hooks/useUser";
import ReactTooltip from "react-tooltip";

const ThumbsUp = ({ fromMovieCard }) => {
	const { userState, onTagUpdate } = useUser();
	console.log("썸즈업 처음 유저상태", userState);
	console.log("fromMovieCard: ", fromMovieCard);

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
				onClick={() =>
					onTagUpdate("up", fromMovieCard.docid, fromMovieCard.tag)
				}
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
	[data-md-tooltip] {
		position: relative;
	}
	[data-md-tooltip]:before {
		content: attr(data-md-tooltip);
		position: absolute;
		bottom: -35px;
		left: 50%;
		padding: 8px;
		transform: translateX(-50%) scale(0);
		transition: transform 0.3s ease-in-out;
		transform-origin: top;
		background: #616161e6;
		color: white;
		border-radius: 2px;
		font-size: 12px;
		font-family: Roboto, sans-serif;
		font-weight: 400;
	}
	[data-md-tooltip]:hover:before {
		transform: translateX(-50%) scale(1);
	}
`;

export default ThumbsUp;
