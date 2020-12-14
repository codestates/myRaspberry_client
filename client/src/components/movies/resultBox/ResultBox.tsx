import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./resultBox.css";
//import { Data } from "../../../api/moveis";
import data from "../../../lib/introData.json";

SwiperCore.use([Navigation, Pagination]);
const ResultBox: React.FC = () => {
	//const { movies } = Data;

	return (
		<Swiper
			tag="section"
			wrapperTag="ul"
			id="main"
			pagination={{ clickable: true }}
			navigation
			spaceBetween={0}
			//slidesPerView={6}
			loop={true}>
			{data.map(movie => (
				<SwiperSlide key={movie.id} tag="li">
					<img
						className="cardImg"
						src={
							movie.image.posters[0] === "image/posters/default.jpg"
								? "https://i.ibb.co/HnNxZyh/default-poster.jpg"
								: `https://imgraspberry.s3-accelerate.amazonaws.com/${movie.image.posters[0]}`
						}
						style={{ listStyle: "none", width: "100%" }}
						alt={movie.title}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ResultBox;
