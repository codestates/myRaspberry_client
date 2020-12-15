import React, { useState } from "react";
import styled from "styled-components";
import { RiThumbUpLine } from "react-icons/ri";
import { compColor } from "../../../common/colors";
import useUser from "../../../hooks/useUser";

const ThumbsUp = ({ fromMovieCard }) => {
	const { userState, onTagUpdate } = useUser();
	console.log("썸즈업 처음 유저상태", userState);
	console.log("fromMovieCard: ", fromMovieCard);

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
				onClick={() =>
					onTagUpdate("up", fromMovieCard.docid, fromMovieCard.tag)
				}
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
