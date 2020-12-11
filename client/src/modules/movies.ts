
import {Dispatch} from "redux";
import axios from "axios";


// MOVIES DATA 상태 관련 로직
// 1. 영화 데이터 요청
const moviesGetUrl = "http://localhost:8080/search/new"


// 액션 type
const MOVIES_LOADING = 'movies/MOVIES_LOADING' as const;
const MOVIES_SUCCESS = 'movies/MOVIES_SUCCESS' as const;
const MOVIES_FAIL = 'movies/MOVIES_FAIL' as const;


// 액션 생성 함수
export const moviesLoading = () => ({
  type: MOVIES_LOADING,
});

export const moviesSuccess = (data : MoviesType[]) => ({
  type: MOVIES_SUCCESS,
  payload : data
});

export const moviesFail = (e : string) => ({
  type: MOVIES_FAIL,
  payload: e,
});


export type MoviesType = {
  id: number,
  docid: string,
  title: string,
  titleEng: string,
  director: string,
  actor: string[],
  plotKr: string,
  plotEng: string,
  runtime: number,
  genre: string,
  image: {
    posters: string,
    stlls: string
  },
  tag: number[],
  date: string,
  score: number
}

interface MoviesLoading {
  type : typeof MOVIES_LOADING
}

interface MoviesSuccess {
  type : typeof MOVIES_SUCCESS,
  payload : MoviesType[]
}

interface MoviesFail {
  type : typeof MOVIES_FAIL,
  payload? : string
}


type MoviesDispatchTypes = MoviesLoading | MoviesSuccess | MoviesFail;

  
// 상태를 위한 타입 선언
export type DefaultState = {
 loading : boolean;
 movies? : MoviesType[];
 err : string;
};

// 초깃값 설정
const defaultState: DefaultState = {
  loading : false,
  movies : [],
  err : ""
}

export function moviesreducer(state: DefaultState = defaultState, action: MoviesDispatchTypes): DefaultState {
  switch (action.type) {
    case MOVIES_LOADING :
      return {
        loading : true,
        movies : [],
        err : ""
      };
    case MOVIES_SUCCESS :
      return {
        ...state, loading : false, movies : action.payload
      };
    case MOVIES_FAIL :
      return {
        ...state, loading : false, err : "what the XX"
      };
    default :
      return state;
  }
}

export const getMovies = () => async (dispatch : Dispatch<MoviesDispatchTypes>) => {
  try {
    dispatch ({
      type: MOVIES_LOADING
    })
    
    const { data }= await axios.get(
          moviesGetUrl
    );

    dispatch(moviesSuccess(data))
  }
  catch (e) {
    dispatch(moviesFail(e))
  }
}



export default moviesreducer;