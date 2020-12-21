import { Dispatch } from "redux";
import axios from "axios";
import { Data } from "../api/moveis";
import { StringDecoder } from "string_decoder";
import { RiContactsBookLine } from "react-icons/ri";
// import { bcrypt } from "bcrypt";
const saltRounds = 10;
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
export const userRequest = (isLogin: UserInfoType) => ({
	type: USER_REQUEST,
	payload: isLogin,
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
export type UserInfoType = {
	username?: string;
	isLogin?: boolean;
	isSignUp?: boolean;
	profileImg?: string;
	selectMovie?: { key: number }; // 0: dislike, 1: default, 2: like
	tag?: { like: object; dislike: object };
	err?: string;
	isChanged?: boolean;
};
type Like = {
	tagNum: number;
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
// 초깃값 설정
const defaultState: UserInfoType = {
	isLogin: false,
	isSignUp: false,
	username: "",
	profileImg: "",
	selectMovie: { key: 0 },
	tag: { like: { tagNum: 0 }, dislike: { tagNum: 0 } },
	err: "",
	isChanged: false,
};
export function userReducer(
	state: UserInfoType = defaultState,
	action: UsersAction,
): UserInfoType {
	switch (action.type) {
		case USER_REQUEST:
			return {
				...state,
				...action.payload,
			};
		case USER_SIGNIN:
			return {
				...state,
				...action.payload,
				// isLogin: action.payload.isLogin,
				// username: action.payload.username,
				// profileImg: action.payload.profileImg,
				// tag: action.payload.tag,
				// isSignUp: action.payload.isSignUp,
				// err: action.payload.err,
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
				...defaultState,
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
// 로컬스토리지에 유저의 상태를 저장한다.
// 업데이트를 할 때마다 구 데이터를 지우고 새로운 데이터를 저장한다.
export const saveLocalStorage = () => (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	localStorage.removeItem("userState");
	const userState = getState().userReducer;
	localStorage.setItem("userState", JSON.stringify(userState));
};
export const callUserStateOfLocalStorage = () => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	const stateOfUser: any = localStorage.getItem("userState");
	// const result = JSON.parse(stateOfUser);
	const userState = getState().userReducer;
	const token = document.cookie.split("=")[0];
	if (token) {
		await axios
			.get("https://myraspberry.shop/auth/getinfo")
			.then((res) => {
				dispatch(userSignin({ ...userState, ...res.data, isLogin: true }));
				const updatedUserState = getState().userReducer;
				localStorage.setItem("userState", JSON.stringify(updatedUserState));
			})
			.catch((err) => localStorage.removeItem("userState"));
	} else {
		if (!stateOfUser) {
			return;
		} else {
			localStorage.removeItem("userState");
		}
	}
};
// 토큰 있다. - 로컬에 유저 정보가 있거나 없거나 --> 서버에 유저 정보를 요청 보낸다. 그리고 받은 정보를 로컬과 유저 상태에 저장한다.
//																		 --> 요청 결과가 err면 로컬 정보를 지운다.
// 토큰 없다. - 로컬에 유저 정보가 없다. --> 그냥 둔다. (로그인 전에도 체험 가능)
//      		- 로컬에 유저 정보가 있다. --> 로컬 유저 정보를 지운다. (로그인 전에도 체험 가능)
export const goToMyPage = () => (
	dispatch: Dispatch<UsersAction>,
	getState: any,
	{ history },
) => {
	history.push("/mypage");
};
export const goToIntro = () => (
	dispatch: Dispatch<UsersAction>,
	getState: any,
	{ history },
) => {
	history.push("/");
};
const setTag = (like: object, tag: number[], cancel: boolean): object => {
	tag.forEach((x) => {
		if (like[x] === undefined) {
			like[x] = 0;
		}
		like[x] = cancel ? Number(like[x]) - 1 : Number(like[x]) + 1;
		if (like[x] === 0) {
			delete like[x];
		}
	});
	return like;
};
const setIsLike = (
	prevStatus: number,
	userTag: UserTag,
	tag: number[],
	isLike: boolean,
) => {
	interface NEWTAG {
		like: object;
		dislike: object;
	}
	let newStatus: number = 1;
	let cancel: boolean = false; // 취소냐?
	let newTag: NEWTAG = {
		like: { ...userTag.like },
		dislike: { ...userTag.dislike },
	};
	switch (prevStatus) {
		case 0:
			newStatus = isLike ? 2 : 1;
			cancel = true;
			newTag.dislike = setTag(newTag.dislike, tag, cancel);
			if (isLike) {
				newTag.like = setTag(newTag.like, tag, !cancel);
			}
			break;
		case 2:
			newStatus = isLike ? 1 : 0;
			cancel = true;
			newTag.like = setTag(newTag.like, tag, cancel);
			if (!isLike) {
				newTag.dislike = setTag(newTag.dislike, tag, !cancel);
			}
			break;
		default:
			newStatus = isLike ? 2 : 0;
			if (isLike) {
				newTag.like = setTag(newTag.like, tag, cancel);
			} else {
				newTag.dislike = setTag(newTag.dislike, tag, cancel);
			}
			break;
	}
	return [newStatus, newTag];
};
export const tagUpdate = (isUp: string, docid: string, tag: number[]) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	const user = getState().userReducer;
	let status: number = 1;
	let isLike: boolean = isUp === "up"; // 어떤 버튼을 누른거냐
	if (user.selectMovie === undefined) {
		user.selectMovie = {};
	}
	if (user.selectMovie[docid] === undefined) {
		user.selectMovie[docid] = status;
	}
	if (isLike) {
		const [tmpStatus, tmpTag] = setIsLike(
			user.selectMovie[docid],
			user.tag,
			tag,
			isLike,
		);
		user.selectMovie[docid] = tmpStatus;
		user.tag = tmpTag;
	} else {
		const [tmpStatus, tmpTag] = setIsLike(
			user.selectMovie[docid],
			user.tag,
			tag,
			isLike,
		);
		user.selectMovie[docid] = tmpStatus;
		user.tag = tmpTag;
	}
	dispatch(updateUserInfo({ ...user }));
	dispatch(saveLocalStorage());
};
export const signIn = (email: string, password: string) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	// const { data, status } =
	await axios
		.post("https://myraspberry.shop/auth/signin", {
			email,
			password,
		})
		.then((data) => {
			dispatch(userSignin({ ...data.data, isLogin: true }));
			dispatch(saveLocalStorage());
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
};
export const socialLogin = (social: string) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	// 소셜로그인 응답 데이터를 어떻게 받아오나? Sign페이지에서 a태그 href로 요청을 보내니까....
	// dispatch(userSignin({ ...data.data, isLogin: true }));
	const url = `https://myraspberry.shop/auth/${social}`;
	await axios.get(url);

	// 	.then((data) => {
	// 		dispatch(userSignin({ ...data.data, isLogin: true }));
	// 		const isLogin = getState().userReducer.isLogin;
	// 		localStorage.setItem("isLogin", isLogin);
	// 		// console.log("여기는 소셜 로그인에서 나온 결과", getState().userReducer);
	// 		dispatch(goToIntro());
	// 	})
	// 	.catch((err) => {
	// 		dispatch(userFail(err));
	// 	});
};
export const signUp = (email: string, password: string) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	// const cryptPassword = await bcrypt.genSalt(
	// 	saltRounds,
	// 	async (err: any, salt: any) => {
	// 		if (err) throw new Error(err);
	// 		await bcrypt.hash(password, salt, (err: any, hash: any) => {
	// 			if (err) throw new Error(err);
	// 		});
	// 	},
	// );
	await axios
		.post("https://myraspberry.shop/auth/signup", {
			email,
			password,
		})
		.then((data) => {
			dispatch(userSignin({ ...data.data, isSignUp: false }));
			dispatch(saveLocalStorage());
		})
		.catch((err) => {
			dispatch(userFail(err));
		});
};
export const myImageUpdate = (formData?: any) => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	// await axios
	// 	.post("https://httpbin.org/anything", formData, {
	// 		headers: { "content-type": "multipart/form-data" },
	// 	})
	// 	.then((res) => console.log(res))
	// 	.catch((err) => console.log(err));
	await axios
		.post("https://myraspberry.shop/mypage/changeimage", formData, {
			headers: {
				"content-type": "multipart/form-data",
			},
		})
		.then((data) => {
			const userState = getState().userReducer;
			dispatch(userSignin({ ...userState, ...data.data }));
			dispatch(saveLocalStorage);
			dispatch(goToMyPage());
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
};

export const mypageUpdate = (
	password?: string,
	newPass?: string,
	newUserName?: string,
) => async (dispatch: Dispatch<UsersAction>, getState: any) => {
	await axios
		// .patch('http://localhost:8080/mypage/changeinfo', {
		.patch("https://myraspberry.shop/mypage/changeinfo", {
			password,
			newPass,
			newUserName,
		})
		.then((data) => {
			// 결과값  { username, isChanged: true }
			// console.log("AAAAAAAAAAAAAAAA");
			const userState = getState().userReducer;
			dispatch(userSignin({ ...userState, ...data.data }));
			dispatch(saveLocalStorage());
			dispatch(goToMyPage());
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
};

export const Signout = () => async (
	dispatch: Dispatch<UsersAction>,
	getState: any,
) => {
	dispatch(userSignout());
	localStorage.removeItem("userState");
	await axios.get("https://myraspberry.shop/auth/signout");
};

export default userReducer;
