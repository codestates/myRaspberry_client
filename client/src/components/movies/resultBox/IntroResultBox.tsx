import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./resultBox.css";
import useIntroMovies from "../../../hooks/useIntroMovies";
import moviesreducer, { MoviesType } from "../../../modules/movies";
// import data from "../../../lib/introData.json";

SwiperCore.use([Navigation]);

const IntroResultBox: any = ({ poster, movie }) => {
	return (
		<>
			<Swiper
				tag="section"
				wrapperTag="ul"
				className="mainResult"
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				<SwiperSlide key={poster} tag="li">
					<img
						className="cardImg"
						src={poster}
						style={{ listStyle: "none", width: "100%" }}
						alt="영화카드"
						onClick={() => alert("카드 눌림")}
					/>
				</SwiperSlide>
			</Swiper>
		</>
	);
};

export default IntroResultBox;
