import React from "react";
import MovieCard from "../card/Card";
import styled from "styled-components";
import { Data } from "../../../api/moveis";

const { movies } = Data;
if (movies.length > 7) {
	movies.splice(6);
}

// const posterImg = [
// 	{
// 		url: "https://images-na.ssl-images-amazon.com/images/I/81K5OyA6+dL.jpg",
// 	},
// 	{
// 		url:
// 			"https://i0.wp.com/kiramonthly.com/wp-content/uploads/2020/02/1.jpg?fit=1000%2C1429",
// 	},
// 	{
// 		url:
// 			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS65HI0J1VzlfskrpZsOEkIFJOcQzh69xSiow&usqp=CAU",
// 	},
// 	{
// 		url:
// 			"https://upload.wikimedia.org/wikipedia/ko/b/b8/1917%EC%98%81%ED%99%94_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
// 	},
// 	{
// 		url:
// 			"https://img.khan.co.kr/news/2019/07/30/l_2019073001003557100286352.jpg",
// 	},
// 	{
// 		url:
// 			"https://i.pinimg.com/originals/3f/f1/7a/3ff17a3c429df8e8b5d536e699ab4f72.jpg",
// 	},
// ];

const CardBox = () => {
	return (
		<Container>
			{movies.map(movie => (
				<MovieCard key={movie.id} poster={movie.medium_cover_image} />
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	max-width: 60%;
`;

export default CardBox;
