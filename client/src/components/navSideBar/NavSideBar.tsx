//Task017-re
//import React from 'react'
//import './navSideBar.scss'
//import styled from 'styled-components'
//=======
import React, { useState } from "react";
import "./navSideBar.scss";
import styled from "styled-components";
//test
import {
	mainColor,
	headerColor,
	textColor,
	subColor,
	inputColor,
	buttonColor,
	userColor,
} from "../../common/colors";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const raspberryUrl = "https://i.ibb.co/tYgpb6Z/rasbperry-potter-150.png";

const NavSideBar = ({ navBarOpen, handleClose }) => {
	const { userState, onSignout } = useUser();
	const { isLogin, profileImg, username } = userState;
	console.log("isLogin in nav Bar", isLogin);
	const [onMouse, setOnMouse] = useState({
		0: false,
		1: false,
		2: false,
		3: false,
	});
	const handleOver = key => {
		const newState = { ...onMouse };
		newState[key] = true;
		setOnMouse(newState);
	};
	const handleLeave = key => {
		const newState = { ...onMouse };
		newState[key] = false;
		setOnMouse(newState);
	};

	const setPTag = (
		listOfClass: string[],
		listOfText: string[],
		key: number
	) => {
		listOfText = listOfText.map(x => x.toUpperCase());
		const nameOfClass = listOfClass.join(" ");
		const text = onMouse[key] ? listOfText[1] : listOfText[0];
		const color = { color: onMouse[key] ? "#cf3535" : "whitesmoke" };
		return (
			<p
				style={color}
				className={nameOfClass}
				onMouseOver={e => {
					e.preventDefault();
					handleOver(key);
				}}
				onMouseLeave={e => {
					e.preventDefault();
					handleLeave(key);
				}}>
				{text}
			</p>
		);
	};
	const linkText = "linkText";
	return (
		<>
			<div className={navBarOpen ? "mdl show" : "mdl"}>
				<div
					className={navBarOpen ? "mdl-mask show" : "mdl-mask"}
					onClick={handleClose}></div>
				<div className="sidebar">
					<SideTop>
						<p>WELCOME!</p>
						{isLogin ? <p>{username} 님</p> : <p> 게스트 님!</p>}
						{isLogin ? (
							profileImg === "noPath" || profileImg === "none" ? (
								<img src={raspberryUrl} alt="potter-raspberry" />
							) : (
								<img
									src={profileImg}
									style={{ borderRadius: "50%" }}
									alt="profileImg"
								/>
							)
						) : (
							<img src={raspberryUrl} alt="potter-raspberry" />
						)}
						{/* <img src={raspberryUrl} alt="potter-raspberry" /> */}
					</SideTop>
					<SideBottom>
						<Link to="/intro" onClick={handleClose}>
							{setPTag(
								[linkText, "intro"],
								["introduction", "라즈베리 서비스란?"],
								0
							)}
						</Link>
						<Link to="/main" onClick={handleClose}>
							{setPTag([linkText, "main"], ["raspberry", "영화고르러 가기"], 1)}
						</Link>
						{isLogin && (
							<>
								<Link to="/mypage" onClick={handleClose}>
									{setPTag(
										[linkText, "mypage"],
										["mypage", "내 정보 보러가기"],
										2
									)}
								</Link>
							</>
						)}
						<Link
							to={isLogin ? "/" : "/user"}
							onClick={() => {
								onSignout();
								handleClose();
							}}>
							{isLogin
								? setPTag([linkText, "signout"], ["signout", "로그아웃"], 3)
								: setPTag([linkText, "sigin"], ["signin", "로그인"], 3)}
						</Link>
					</SideBottom>
				</div>
			</div>
		</>
	);
};

const SideTop = styled.div`
	grid-area: SideTop;
	text-align: center;
	p {
		font-size: 1.5rem;
		font-family: "Times New Roman", Times, serif;
		font-weight: bolder;
	}
	img {
		margin-top: 0.5rem;
		max-width: 7rem;
	}
`;

const SideBottom = styled.div`
	grid-area: SideBottom;
	text-align: center;
`;

export default NavSideBar;
