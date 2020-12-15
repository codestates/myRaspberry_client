import { Dispatch } from "redux";
import axios from "axios";
import { Data } from "../api/moveis";
import { StringDecoder } from "string_decoder";

// user 상태 관련 로직
// <1. 로그인 요청>
// 		- 일반 로그인
// 		- 소셜 로그인
//    -----> 로그인 후에는 profileimg / username / tag (로그인 상태는 쿠키에 담긴 토큰으로 확인 가능)
// 	1-1 로그인 상태 (isUser = true or false  (로그인 상태는 쿠키에 담긴 토큰으로 확인 가능) )

// <2. 좋아요, 싫어요 선택>

// * 로그인 전 = 저장된 데이터로만 결과 보여주기 tag 저장 안 함

// * 로그인 후
//  -> user 정보에 (좋아요 영화, 싫어요 영화) 정보 저장
//  -> 서버에 put ? patch (태그별 카운트 body에 담아서) 요청. (취향이 반영된 영화 데이터 받기)
//  -> 프론트 user 상태에 태그별 카운트 변경

// 액션 type
const USER_REQUEST = "users/USER_REQUEST" as const;
const USER_SIGNIN = "users/USER_SIGNIN" as const;
const USER_SIGNUP = "users/USERS_SIGNUP" as const;
const USER_SOCIAL_LOGIN = "users/USERS_SOCIAL_LOGIN" as const;
const USER_SELECT_MOVIE_UPDATE = "users/USER_SELECT_MOVIE_UPDATE" as const;
const USER_TAG_UPDATE = "users/USER_TAG_UPDATE" as const;
const USER_SIGNOUT = "users/USER_SIGNOUT" as const;
const USER_FAIL = "users/USER_FAIL" as const;
const UPDATE_USER_INFO = "users/UPDATE_USER_INFO" as const;

// 액션 생성 함수
export const userRequest = () => ({
	type: USER_REQUEST,
});

export const userSignin = (data: UserInfoType): any => ({
	type: USER_SIGNIN,
	payload: data,
});

export const userSignup = () => ({
	type: USER_SIGNUP,
});

export const userSocialLogin = (data: UserInfoType) => ({
	type: USER_SOCIAL_LOGIN,
	payload: data,
});

export const userSelectMovieUpdate = (selectMovie: UserInfoType) => ({
	type: USER_SELECT_MOVIE_UPDATE,
	payload: selectMovie,
});

export const userTagUpdate = (tag: UserInfoType) => ({
	type: USER_TAG_UPDATE,
	payload: tag,
});

export const updateUserInfo = (user: UserInfoType) => ({
	type: UPDATE_USER_INFO,
	payload: user,
});

export const userSignout = () => ({
	type: USER_SIGNOUT,
});

export const userFail = (err: string) => ({
	type: USER_FAIL,
	payload: err,
});

type UserInfoType = {
	username?: string;
	isLogin?: boolean;
	isSignUp?: boolean;
	profileImg?: string;
	selectMovie?: { key: number }; // 0: dislike, 1: default, 2: like
	tag?: { like: object; dislike: object };
	err?: string;
};

type Like = {
	tagNum: string;
};

type UserTag = {
	like: Like;
	dislike: Like;
};

type UsersAction =
	| ReturnType<typeof userRequest>
	| ReturnType<typeof userSignin>
	| ReturnType<typeof userSignup>
	| ReturnType<typeof userSocialLogin>
	| ReturnType<typeof userSelectMovieUpdate>
	| ReturnType<typeof userTagUpdate>
	| ReturnType<typeof userSignout>
	| ReturnType<typeof userFail>
	| ReturnType<typeof updateUserInfo>;

// 상태를 위한 타입 선언
export type DefaultState = {
	isLogin?: boolean;
	isSignUp?: boolean;
	username?: string;
	profileImg?: string;
	selectMovie: object;
	tag?: UserTag;
	err?: string;
};

// 초깃값 설정
const defaultState: DefaultState = {
	isLogin: false,
	isSignUp: false,
	username: "",
	profileImg: "",
	selectMovie: {},
	tag: { like: { tagNum: "" }, dislike: { tagNum: "" } },
	err: "",
};

export function userReducer(
	state: DefaultState = defaultState,
	action: UsersAction,
): DefaultState {
	switch (action.type) {
		case USER_REQUEST:
			return {
				...state,
				isLogin: true,
			};
		case USER_SIGNIN:
			return {
				...state,
				isLogin: action.payload.isLogin,
				username: action.payload.username,
				profileImg: action.payload.profileImg,
				tag: action.payload.tag,
				isSignUp: action.payload.isSignUp,
				err: action.payload.err,
			};
		case USER_SIGNUP:
			return {
				...state,
			};
		case USER_SOCIAL_LOGIN:
			return {
				...state,
				username: action.payload.username,
				profileImg: action.payload.profileImg,
				tag: action.payload.tag,
				isLogin: action.payload.isLogin,
			};
		case USER_SELECT_MOVIE_UPDATE:
			return {
				...state,
				selectMovie: action.payload.selectMovie,
			};
		case UPDATE_USER_INFO:
			return {
				...state,
				...action.payload.user,
			};
		case USER_TAG_UPDATE:
			return {
				...state,
				tag: action.payload,
			};
		case USER_SIGNOUT:
			return {
				...state,
			};
		case USER_FAIL:
			return {
				...state,
				err: action.payload,
			};
		default:
			return state;
	}
}

export const goToIntro = () => (
	dispatch: Dispatch<UsersAction>,
	getState: any,
	{ history },
) => {
	history.push("/main");
};

const setTag = (isLike: Like, tag: number[]): object => {
	tag.forEach((x) => {
		if (isLike[x] === undefined) {
			isLike[x] = 0;
		}
		isLike[x] = Number(isLike[x]) + 1;
	});
	return isLike;
};

export const tagUpdate = (
	isLike: string,
	docid: string,
	tag: number[],
) => async (dispatch: Dispatch<UsersAction>, getState: any) => {
	const user = getState().userReducer;
	let status: number = 1;
	if (user.selectMovie === undefined) {
		user.selectMovie = {};
	}
	if (user.selectMovie[docid] === undefined) {
		user.selectMovie[docid] = status;
	} else {
		if (user.selectMovie[docid] === 0 || user.selectMovie[docid] === 2) {
			status = 1;
		} else {
			if (isLike === "up") {
				status = 2;
				user.tag.like = setTag(user.tag.like, tag);
			} else {
				status = 0;
				user.tag.dislike = setTag(user.tag.dislike, tag);
			}
		}
		user.selectMovie[docid] = status;
	}
	dispatch(updateUserInfo({ ...user }));
	// dispatch(
	// 	userSelectMovieUpdate({
	// 		...user.selectMovie,
	// 		selectMovie: user.selectMovie,
	// 	}),
	// );
	// dispatch(userTagUpdate({ ...user.tag.like, tag: user.tag.like }));
};

export const signIn = (email: string, password: string) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	// try {
	dispatch(userRequest());
	// const { data, status } =
	await axios
		.post("https://myraspberry.shop/auth/signin", {
			email,
			password,
		})
		.then((data) => {
			dispatch(userSignin({ ...data.data, isLogin: true }));
			console.log("여기는 유저스 테에스에서 나온 결과", getState().userReducer);
			dispatch(goToIntro());
		})

		.catch((err) => {
			const { message } = err.response.data;
			const data = getState().userReducer;
			if (message === "일치하는 정보가 존재하지 않습니다.") {
				dispatch(userSignin({ ...data, isSignUp: true }));
			} else if (message === "비밀번호가 일치하지 않습니다.") {
				dispatch(userSignin({ ...data, err: message }));
			}
		});

	//send["message"] ==='일치하는 정보가 존재하지 않습니다 => 회원가입으로 전환
	//send["message"] ==='비밀번호가 일치하지 않습니다 => setErrormessage => send['message']내용을 담아준다
	// { message: "비밀번호가 일치하지 않습니다." }
	// { message: "일치하는 정보가 존재하지 않습니다."}

	// console.log("after", getState().userReducer);
	// } catch (err) {
	// 	console.log("에러다")
	// 	dispatch(userFail(err));
	// }
};

export const socialLogin = (social: string) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	console.log(social);
	const url = `https://myraspberry.shop/auth/${social}`;
	console.log(url);
	await axios
		.get(url)
		.then((data) => {
			console.log("에러 2");
			dispatch(userSignin({ ...data.data, isLogin: true }));
			console.log("에러 3");
			console.log("여기는 소셜 로그인에서 나온 결과", getState().userReducer);
			dispatch(goToIntro());
		})
		.catch((err) => {
			dispatch(userFail(err));
		});

	// try {
	// 	const { data } = await axios.get(`https://myraspberry.shop/auth/${social}`);

	// 	dispatch(userSocialLogin({ ...data, isLogin: true }));
	// 	dispatch(goToIntro());
	// } catch (err) {
	// 	dispatch(userFail(err));
	// }
};

export const signUp = (email: string, password: string) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	await axios
		.post("https://myraspberry.shop/auth/signup", {
			email,
			password,
		})
		.then((data) => {
			dispatch(userSignin({ ...data.data, isSignUp: false }));
		})

		.catch((err) => {
			const { message } = err.response.data;
			const data = getState().userReducer;
			dispatch(userSignin({ ...data, err: message }));
			console.log("fail and 400", message);
			// if (message === "일치하는 정보가 존재하지 않습니다.") {
			// 	dispatch(userSignin({ ...data, isSignUp: true }));
			// } else if (message === "비밀번호가 일치하지 않습니다.") {
			// 	dispatch(userSignin({ ...data, err: message }));
			// }
		});
};

export default userReducer;
