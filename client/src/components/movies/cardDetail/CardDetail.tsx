import React from 'react';
import "./CardDetail.css";
import { FaCompressArrowsAlt } from "react-icons/fa";
// import { Data } from "../../../api/moveis";

// 영화 카드별로 정보가 담겨야 한다.
// 영화 카드와 연결이 필요하다. 그럼 MovieCard에서 활용해야 한다.
// 어떻게? onMouse로 상태 변경으로 클래스명을 display : none 으로 활용 가능
type FromCard = {
  poster : string;
  closeMovieDetail : () => void;
}


const CardDetail = ( {poster, closeMovieDetail} : FromCard) => {
  
	
	return (
		<div className="nav_detailbar" >
			<div className="detail_top">
				<div className="detail_top_poster_box">
					<img className="detail_top_poster" src={poster} alt="poster"/>
				</div>
				<div className="detail_top_context">
					<div className="title_box">
						<h3 className="title_box_title">title과 년도가 들어갑니다.</h3>
						<button className="title_box_btn" onClick={closeMovieDetail} ><FaCompressArrowsAlt /></button>
					</div>
					<h5>장르가 들어갑니다</h5>
					<p>내용이 들어갑니다.</p>
				</div>
			</div>
			<div className="detail_bottom">
				<div className="youtube_box">
					<iframe src={poster} className="one"></iframe>
					<iframe src={poster} className="two"></iframe>
				</div>
			</div>
		</div>
	);
};

export default CardDetail;