import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./resultBox.css";
import { Data } from "../../../api/moveis";

SwiperCore.use([Navigation, Pagination]);
const ResultBox: React.FC = () => {
	const { movies } = Data;

	return (
		<Swiper
			tag="section"
			wrapperTag="ul"
			id="main"
			// pagination={{ clickable: true }}
			navigation
			spaceBetween={0}
			slidesPerView={6}
			loop={true}>
			{movies.map(movie => (
				<SwiperSlide key={movie.id} tag="li">
					<img
						className="cardImg"
						src={movie.medium_cover_image}
						style={{ listStyle: "none", width: "100%" }}
						alt={movie.title}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ResultBox;
