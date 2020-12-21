import React from "react";
import styled from "styled-components";
import { BiCameraMovie } from "react-icons/bi";
import { FaRegCopyright } from "react-icons/fa";

import { pointColor } from "../../common/colors";

const Footer = (): JSX.Element => {
	return (
		<Container>
			<FooterArea>
				<About>
					<AboutText>
						<CameraMovie />
						아마도 국내 최초, 비선호 기반 영화 추천 서비스&nbsp;{" "}
						<b>MY RASPBERRY</b>에 오신걸 환영합니다!
					</AboutText>
					<AboutText2>
						<CopyRight /> 2020. YGM all rights reserved.
					</AboutText2>
				</About>
			</FooterArea>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	padding: 0 0 0 1.5em;
`;

const FooterArea = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;

	width: 100%;
	padding: 0.3em;
	@media (max-width: 768px) {
		flex-direction: column-reverse;
	}
`;
const About = styled.div`
	display: flex;
	flex-direction: column;
`;
const AboutText = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	font-family: "Lato";
	line-height: 1.5;
	font-weight: 500;
	font-size: 15px;
	color: whitesmoke;
	b {
		color: whitesmoke;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
const AboutText2 = styled(AboutText)`
	margin: 0.7em 0 0 0;
	font-size: 10px;
	@media (max-width: 768px) {
		display: flex;
	}
	@media (max-width: 360px) {
		font-size: 0.7em;
	}
`;
const CameraMovie = styled(BiCameraMovie)`
	width: 1.3em;
	height: 1.3em;
	margin: -0.3em 0.2em 0 0;
	color: ${pointColor};
`;

const CopyRight = styled(FaRegCopyright)`
	width: 1.3em;
	height: 1.3em;
	margin: -0.3em 0.2em 0 0;
	color: #fff;
`;

export default Footer;
