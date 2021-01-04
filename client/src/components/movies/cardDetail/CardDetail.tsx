import React, { useEffect, useState } from "react";
import "./CardDetail.css";
import { FaRegWindowClose } from "react-icons/fa";
import { MoviesType } from "../../../modules/movies";
import useYoutube from "../../../hooks/useYoutube";
import LoadingAnimation from "../../../page/LoadingAnimation";
import Youtube from "../youtube/Youtube";
import ThumbsDown from "../thumbsDown/ThumbsDown";
import ThumbsUp from "../thumbsUp/ThumbsUp";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import YoutubePlayer from "../youtube/YoutubePlayer";
import useWindowSize from "../../../hooks/useWindowSize";
SwiperCore.use([Navigation, Autoplay]);

type FromCard = {
	poster: string;
	movie: MoviesType;
	closeMovieDetail: any;
};

const fixRuntime = runtime => {
	let time = 0;
	while (runtime > 60) {
		runtime = runtime - 60;
		time++;
	}
	return time === 0 ? `${runtime}분` : `${time}시간 ${runtime}분`;
};

const CardDetail = ({ poster, movie, closeMovieDetail }: FromCard) => {
	const {
		title,
		titleEng,
		director,
		actor,
		plotKr,
		plotEng,
		runtime,
		genre,
		image,
		tag,
		date,
	} = movie;

	//youtube 불러오기
	const { videoState, getVideoData } = useYoutube();
	const { loading, playingVideo, videos } = videoState;
	const videosArray = Object.keys(videos);
	useEffect(() => {
		getVideoData(title);
	}, []);

	//넓이 반응형
	const size = useWindowSize();
	const minSize = 1027;
	let resize = 915.02;

	if (size.width && size.width < minSize) {
		resize = size.width - 150;
	}

	//줄거리 표출 state
	const [viewAllPlot, setViewAllPlot] = useState(false);
	const newPlotKr = plotKr.slice(0, 250);
	const viewmore = "더보기";
	const viewclosed = "접기";

	//상연년도만 표출
	const year = date.slice(0, 4);

	//runtime => 시간단위로 변환
	const runtimeKor = fixRuntime(runtime);

	//배우 6명만 노출
	let actorArr = actor.split(",");
	actorArr = actorArr.slice(0, 6);
	let actorString = actorArr.join(",");

	if (loading) {
		return <LoadingAnimation />;
	} else {
		return (
			<>
				<div className="nav_backgroud">
					<div className="nav_showoff" onClick={closeMovieDetail}></div>
					<div
						role="dialog"
						className="nav_detailbar"
						style={{ width: `${resize}px` }}>
						<div className="detail_top">
							<div className="detail_top_poster_box">
								<img className="detail_top_poster" src={poster} alt="poster" />
								<div className="detail_thumbs_box">
									<ThumbsDown fromMovieCard={movie} />
									<ThumbsUp fromMovieCard={movie} />
								</div>
							</div>
							<div className="detail_top_context">
								<div className="title_box">
									<h3 className="title_box_title">
										{title}({year})
										<br />
										{titleEng}
									</h3>
								</div>
								<div className="genre_box">
									<h5 className="genre">
										{genre}&nbsp; | &nbsp;{runtimeKor}
									</h5>
								</div>
								<div className="character">
									<p className="director">
										<b>감독</b>&nbsp;&nbsp;
										<span className="smallText">{director}</span>
									</p>
									<p className="actor">
										<b>출연</b>&nbsp;&nbsp;
										<span className="smallText">{actorString}</span>
									</p>
								</div>
								<span className={viewAllPlot ? "plot _off" : "plot"}>
									{newPlotKr}
									{plotKr[250] && "..."}
								</span>
								<span className={viewAllPlot ? "plot-long _on" : "plot-long"}>
									{plotKr}
								</span>
								{plotKr[250] && (
									<>
										<b
											className={viewAllPlot ? "view-btn" : "view-btn open"}
											onClick={() => setViewAllPlot(true)}>
											{viewmore}
										</b>
										<b
											className={viewAllPlot ? "view-btn open" : "view-btn"}
											onClick={() => setViewAllPlot(false)}>
											{viewclosed}
										</b>
									</>
								)}
							</div>
						</div>
						<div className="title_box_btn" onClick={closeMovieDetail}>
							<FaRegWindowClose />
						</div>
						<div className="detail_bottom">
							{image.stlls[0] !== "image/stlls/default.jpg" && (
								<div className="detail_still_container">
									<Swiper
										tag="section"
										wrapperTag="ul"
										className="datail_ul"
										navigation
										autoplay={true}
										spaceBetween={25}
										slidesPerView={4}
										loop={true}>
										{image
											? image.stlls.map((movie, i) => (
													<SwiperSlide key={i} tag="li" className="detail_li">
														<img
															src={`https://imgraspberry.s3-accelerate.amazonaws.com/${movie}`}
															alt="img"
															className="still_img"
														/>
													</SwiperSlide>
											  ))
											: null}
									</Swiper>
								</div>
							)}
							<div className="youtube_one">
								{playingVideo.id && <YoutubePlayer video={playingVideo.id} />}
							</div>
							<div className="youtube_box">
								{videosArray.map((key, i) => (
									<Youtube key={i} video={videos[key]} videosKey={key} />
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};
export default CardDetail;
