import React from "react";
import styled from "styled-components";

const SlideMenu = () => {
	return (
		<SlideContainer>
			<h1>슬라이드 영역</h1>
		</SlideContainer>
	);
};

const SlideContainer = styled.div`
	background-color: #fff;
	height: 100%;
	color: #353535 !important;
	margin-top: 6rem;
`;
export default SlideMenu;
