import React, { useEffect, useState } from "react";
import "./CardDetail.css";
import { FaCompressArrowsAlt, FaRegWindowClose } from "react-icons/fa";

import { MoviesType } from "../../../modules/movies";
import useYoutube from "../../../hooks/useYoutube";
import LoadingAnimation from "../../../page/LoadingAnimation";
import Youtube from "../youtube/Youtube";
import ThumbsDown from "../thumbsDown/ThumbsDown";
import ThumbsUp from "../thumbsUp/ThumbsUp";
// import { Data } from "../../../api/moveis";

// 영화 카드별로 정보가 담겨야 한다.
// 영화 카드와 연결이 필요하다. 그럼 MovieCard에서 활용해야 한다.
// 어떻게? onMouse로 상태 변경으로 클래스명을 display : none 으로 활용 가능
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

//const defaultUrl = "https://i.ibb.co/HnNxZyh/default-poster.jpg";
const CardDetail = ({ poster, movie, closeMovieDetail }: FromCard) => {
	const { videoState, getVideoData } = useYoutube();
	const [viewAllPlot, setViewAllPlot] = useState(false);
	// const [defaultPoster, setDefaultPoster] = useState(false);

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

	//상연년도만 표출
	const year = date.slice(0, 4);
	//runtime => 시간단위로
	const runtimeKor = fixRuntime(runtime);
	useEffect(() => {
		getVideoData(title);
	}, []);

	// if (poster === defaultUrl) {
	// 	console.log("포스터 없음");
	// }

	let actorArr = actor.split(",");
	actorArr = actorArr.slice(0, 6);
	let actorString = actorArr.join(",");
	const { loading, videos } = videoState;
	console.log(plotKr.slice(0, 100));
	const newPlotKr = plotKr.slice(0, 40);
	const viewmore = "더보기";
	console.log(viewAllPlot);
	if (loading) {
		return <LoadingAnimation />;
	} else {
		return (
			<>
				<div className="nav_showoff" onClick={closeMovieDetail}></div>
				<div className="nav_backgroud">
					<div className="nav_detailbar">
						<div className="detail_top">
							<div className="detail_top_poster_box">
								<img className="detail_top_poster" src={poster} alt="poster" />
								{/* <div className="detail_thumbs_box">
									<ThumbsDown />
									<ThumbsUp />
								</div> */}
							</div>
							<div className="detail_top_context">
								<div className="title_box">
									<h3 className="title_box_title">
										{title}({year})
										<br />
										{titleEng}
									</h3>
									<button className="title_box_btn" onClick={closeMovieDetail}>
										<FaRegWindowClose />
									</button>
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
								<span className={viewAllPlot ? "plot off" : "plot"}>
									{newPlotKr}...
									<b onClick={() => setViewAllPlot(true)}>{viewmore}</b>
								</span>
								<span className={viewAllPlot ? "plot-long on" : "plot-long"}>
									{plotKr}
								</span>
							</div>
						</div>
						<div className="detail_bottom">
							<div className="image_box"></div>
							<div className="youtube_box">
								{videos &&
									videos.map(video => (
										<Youtube key={video.id.videoId} video={video.id.videoId} />
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
