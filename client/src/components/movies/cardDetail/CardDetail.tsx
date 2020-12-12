import React, { useEffect } from "react";
import "./CardDetail.css";
import { FaCompressArrowsAlt, FaRegWindowClose } from "react-icons/fa";

import { MoviesType } from "../../../modules/movies";
import useYoutube from "../../../hooks/useYoutube";
import LoadingAnimation from "../../../page/LoadingAnimation";
import Youtube from "../youtube/Youtube";
// import { Data } from "../../../api/moveis";

// 영화 카드별로 정보가 담겨야 한다.
// 영화 카드와 연결이 필요하다. 그럼 MovieCard에서 활용해야 한다.
// 어떻게? onMouse로 상태 변경으로 클래스명을 display : none 으로 활용 가능
type FromCard = {
	poster: string;
	movie: MoviesType;
	closeMovieDetail: () => void;
};
//const defaultUrl = "https://i.ibb.co/HnNxZyh/default-poster.jpg";
const CardDetail = ({ poster, movie, closeMovieDetail }: FromCard) => {
	const { videoState, getVideoData } = useYoutube();
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
	const year = date.slice(0, 4);

	useEffect(() => {
		getVideoData(title);
	}, []);

	// console.log(poster);
	// if (poster === defaultUrl) {
	// 	console.log("포스터 없음");
	// }
	const { loading, videos } = videoState;
	console.log(videos);
	if (loading) {
		return <LoadingAnimation />;
	} else {
		return (
			<>
				<div className="nav_backgroud" onClick={closeMovieDetail}></div>
				<div className="nav_detailbar">
					<div className="detail_top">
						<div className="detail_top_poster_box">
							<img className="detail_top_poster" src={poster} alt="poster" />
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
								<h5 className="genre">{genre}</h5>
							</div>
							<div className="character">
								<p className="director">감독:&nbsp;&nbsp;{director}</p>
								<p className="actor">출연:&nbsp;&nbsp;{actor}</p>
							</div>
						</div>
					</div>
					<div className="detail_bottom">
						<p className="plot">{plotKr}</p>
						<br />
						런타임: {runtime}
						<div className="image_box"></div>
						<div className="youtube_box">
							{videos &&
								videos.map(video => (
									<Youtube key={video.id.videoId} video={video.id.videoId} />
								))}
						</div>
					</div>
				</div>
			</>
		);
	}
};
export default CardDetail;
