import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./resultBox.css";
import data from "../../../lib/introData.json";
import { MoviesType } from "../../../modules/movies";

type Movie = {
	renew: MoviesType[];
	kor: MoviesType[];
	eng: MoviesType[];
	long: MoviesType[];
	short: MoviesType[];
};

SwiperCore.use([Navigation, Pagination]);

const ResultBox: any = ({ renew, eng, kor, long, short }: Movie) => {
	//const { movies } = Data;

	if (Array.isArray(renew)) {
		return (
			<Swiper
				tag="section"
				wrapperTag="ul"
				id="main"
				// pagination={{ clickable: true }}
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{renew.map((movie) => (
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
	}

	if (Array.isArray(kor)) {
		return (
			<Swiper
				tag="section"
				wrapperTag="ul"
				id="main"
				// pagination={{ clickable: true }}
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{kor.map((movie) => (
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
	}

	if (Array.isArray(eng)) {
		return (
			<Swiper
				tag="section"
				wrapperTag="ul"
				id="main"
				// pagination={{ clickable: true }}
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{eng.map((movie) => (
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
	}

	if (Array.isArray(short)) {
		return (
			<Swiper
				tag="section"
				wrapperTag="ul"
				id="main"
				// pagination={{ clickable: true }}
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{short.map((movie) => (
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
	}

	if (Array.isArray(long)) {
		return (
			<Swiper
				tag="section"
				wrapperTag="ul"
				id="main"
				// pagination={{ clickable: true }}
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{long.map((movie) => (
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
	} else {
		return (
			<Swiper
				tag="section"
				wrapperTag="ul"
				id="main"
				// pagination={{ clickable: true }}
				navigation
				spaceBetween={0}
				slidesPerView={25}
				loop={true}>
				{data.map((movie) => (
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
	}
};

export default ResultBox;
