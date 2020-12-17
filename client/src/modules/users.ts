import {Dispatch} from 'redux'
import axios from 'axios'
import {Data} from '../api/moveis'
import {StringDecoder} from 'string_decoder'

// 액션 type
const USER_REQUEST = 'users/USER_REQUEST' as const
const USER_SIGNIN = 'users/USER_SIGNIN' as const
const USER_SIGNUP = 'users/USERS_SIGNUP' as const
const USER_SOCIAL_LOGIN = 'users/USERS_SOCIAL_LOGIN' as const
const USER_SELECT_MOVIE_UPDATE = 'users/USER_SELECT_MOVIE_UPDATE' as const
const USER_TAG_UPDATE = 'users/USER_TAG_UPDATE' as const
const USER_SIGNOUT = 'users/USER_SIGNOUT' as const
const USER_FAIL = 'users/USER_FAIL' as const
const UPDATE_USER_INFO = 'users/UPDATE_USER_INFO' as const

// 액션 생성 함수
export const userRequest = () => ({
  type: USER_REQUEST,
})

export const userSignin = (data: UserInfoType): any => ({
  type: USER_SIGNIN,
  payload: data,
})

export const userSignup = () => ({
  type: USER_SIGNUP,
})

export const userSocialLogin = (data: UserInfoType) => ({
  type: USER_SOCIAL_LOGIN,
  payload: data,
})

export const userSelectMovieUpdate = (selectMovie: UserInfoType) => ({
  type: USER_SELECT_MOVIE_UPDATE,
  payload: selectMovie,
})

export const userTagUpdate = (tag: UserInfoType) => ({
  type: USER_TAG_UPDATE,
  payload: tag,
})

export const updateUserInfo = (user: UserInfoType) => ({
  type: UPDATE_USER_INFO,
  payload: user,
})

export const userSignout = () => ({
  type: USER_SIGNOUT,
})

export const userFail = (err: string) => ({
  type: USER_FAIL,
  payload: err,
})

export type UserInfoType = {
  username?: string
  isLogin?: boolean
  isSignUp?: boolean
  profileImg?: string
  selectMovie?: {key: number} // 0: dislike, 1: default, 2: like
  tag?: {like: object; dislike: object}
  err?: string
  isChanged?: boolean
}

type Like = {
  tagNum: number
}

type UserTag = {
  like: Like
  dislike: Like
}

type UsersAction =
  | ReturnType<typeof userRequest>
  | ReturnType<typeof userSignin>
  | ReturnType<typeof userSignup>
  | ReturnType<typeof userSocialLogin>
  | ReturnType<typeof userSelectMovieUpdate>
  | ReturnType<typeof userTagUpdate>
  | ReturnType<typeof userSignout>
  | ReturnType<typeof userFail>
  | ReturnType<typeof updateUserInfo>

// 초깃값 설정
const defaultState: UserInfoType = {
  isLogin: false,
  isSignUp: false,
  username: '',
  profileImg: '',
  selectMovie: {key: 0},
  tag: {like: {tagNum: 0}, dislike: {tagNum: 0}},
  err: '',
  isChanged: true,
}

export function userReducer(
  state: UserInfoType = defaultState,
  action: UsersAction,
): UserInfoType {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        isLogin: true,
      }
    case USER_SIGNIN:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        username: action.payload.username,
        profileImg: action.payload.profileImg,
        tag: action.payload.tag,
        isSignUp: action.payload.isSignUp,
        err: action.payload.err,
        isChanged: action.payload.isChanged,
      }
    case USER_SIGNUP:
      return {
        ...state,
      }
    case USER_SOCIAL_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        profileImg: action.payload.profileImg,
        tag: action.payload.tag,
        isLogin: action.payload.isLogin,
      }
    case USER_SELECT_MOVIE_UPDATE:
      return {
        ...state,
        selectMovie: action.payload.selectMovie,
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        ...action.payload.user,
      }
    case USER_TAG_UPDATE:
      return {
        ...state,
        tag: action.payload,
      }
    case USER_SIGNOUT:
      return {
        ...state,
      }
    case USER_FAIL:
      return {
        ...state,
        err: action.payload,
      }
    default:
      return state
  }
}

export const goToIntro = () => (
  dispatch: Dispatch<UsersAction>,
  getState: any,
  {history},
) => {
  history.push('/main')
}

const setTag = (like: object, tag: number[], cancel: boolean): object => {
  tag.forEach(x => {
    if (like[x] === undefined) {
      like[x] = 0
    }
    like[x] = cancel ? Number(like[x]) - 1 : Number(like[x]) + 1
    if (like[x] === 0) {
      delete like[x]
    }
  })
  return like
}

const setIsLike = (
  prevStatus: number,
  userTag: UserTag,
  tag: number[],
  isLike: boolean,
) => {
  interface NEWTAG {
    like: object
    dislike: object
  }
  let newStatus: number = 1
  let cancel: boolean = false // 취소냐?
  let newTag: NEWTAG = {
    like: {...userTag.like},
    dislike: {...userTag.dislike},
  }

  switch (prevStatus) {
    case 0:
      newStatus = isLike ? 2 : 1
      cancel = true
      newTag.dislike = setTag(newTag.dislike, tag, cancel)
      if (isLike) {
        newTag.like = setTag(newTag.like, tag, !cancel)
      }
      break
    case 2:
      newStatus = isLike ? 1 : 0
      cancel = true
      newTag.like = setTag(newTag.like, tag, cancel)
      if (!isLike) {
        newTag.dislike = setTag(newTag.dislike, tag, !cancel)
      }
      break
    default:
      newStatus = isLike ? 2 : 0
      if (isLike) {
        newTag.like = setTag(newTag.like, tag, cancel)
      } else {
        newTag.dislike = setTag(newTag.dislike, tag, cancel)
      }
      break
  }

  return [newStatus, newTag]
}

export const tagUpdate = (isUp: string, docid: string, tag: number[]) => async (
  dispatch: Dispatch<UsersAction>,
  getState: any,
) => {
  const user = getState().userReducer
  let status: number = 1
  let isLike: boolean = isUp === 'up' // 어떤 버튼을 누른거냐
  if (user.selectMovie === undefined) {
    user.selectMovie = {}
  }

  if (user.selectMovie[docid] === undefined) {
    user.selectMovie[docid] = status
  }

  if (isLike) {
    const [tmpStatus, tmpTag] = setIsLike(
      user.selectMovie[docid],
      user.tag,
      tag,
      isLike,
    )
    user.selectMovie[docid] = tmpStatus
    console.log(tmpStatus)
    user.tag = tmpTag
  } else {
    const [tmpStatus, tmpTag] = setIsLike(
      user.selectMovie[docid],
      user.tag,
      tag,
      isLike,
    )
    user.selectMovie[docid] = tmpStatus
    console.log(tmpStatus)
    user.tag = tmpTag
  }

  dispatch(updateUserInfo({...user}))
  // dispatch(
  // 	userSelectMovieUpdate({
  // 		...user.selectMovie,
  // 		selectMovie: user.selectMovie,
  // 	}),
  // );
  // dispatch(userTagUpdate({ ...user.tag.like, tag: user.tag.like }));
}

export const signIn = (email: string, password: string) => async (
  dispatch: Dispatch<UsersAction>,
  getState: any,
) => {
  // try {
  dispatch(userRequest())
  // const { data, status } =
  await axios
    .post('http://localhost:8080/auth/signin', {
      // .post("https://myraspberry.shop/auth/signin", {
      email,
      password,
    })
    .then(data => {
      dispatch(userSignin({...data.data, isLogin: true}))
      console.log('여기는 유저스 테에스에서 나온 결과', getState().userReducer)
      dispatch(goToIntro())
    })

    .catch(err => {
      const {message} = err.response.data
      const data = getState().userReducer
      if (message === '일치하는 정보가 존재하지 않습니다.') {
        dispatch(userSignin({...data, isSignUp: true}))
      } else if (message === '비밀번호가 일치하지 않습니다.') {
        dispatch(userSignin({...data, err: message}))
      }
    })

  //send["message"] ==='일치하는 정보가 존재하지 않습니다 => 회원가입으로 전환
  //send["message"] ==='비밀번호가 일치하지 않습니다 => setErrormessage => send['message']내용을 담아준다
  // { message: "비밀번호가 일치하지 않습니다." }
  // { message: "일치하는 정보가 존재하지 않습니다."}

  // console.log("after", getState().userReducer);
  // } catch (err) {
  // 	console.log("에러다")
  // 	dispatch(userFail(err));
  // }
}

export const socialLogin = (social: string) => async (
  dispatch: Dispatch<UsersAction>,
  getState: any,
) => {
  console.log(social)
  const url = `https://myraspberry.shop/auth/${social}`
  //   const url = `http://localhost:8080/auth/${social}`
  console.log(url)
  await axios
    .get(url)
    .then(data => {
      console.log('에러 2')
      dispatch(userSignin({...data.data, isLogin: true}))
      console.log('에러 3')
      console.log('여기는 소셜 로그인에서 나온 결과', getState().userReducer)
      dispatch(goToIntro())
    })
    .catch(err => {
      dispatch(userFail(err))
    })

  // try {
  // 	const { data } = await axios.get(`https://myraspberry.shop/auth/${social}`);

  // 	dispatch(userSocialLogin({ ...data, isLogin: true }));
  // 	dispatch(goToIntro());
  // } catch (err) {
  // 	dispatch(userFail(err));
  // }
}

export const signUp = (email: string, password: string) => async (
  dispatch: Dispatch<UsersAction>,
  getState: any,
) => {
  await axios
    // .post('http://localhost:8080/auth/signup', {
    .post('https://myraspberry.shop/auth/signup', {
      email,
      password,
    })
    .then(data => {
      dispatch(userSignin({...data.data, isSignUp: false}))
    })

    .catch(err => {
      const {message} = err.response.data
      const data = getState().userReducer
      dispatch(userSignin({...data, err: message}))
      console.log('fail and 400', message)
      // if (message === "일치하는 정보가 존재하지 않습니다.") {
      // 	dispatch(userSignin({ ...data, isSignUp: true }));
      // } else if (message === "비밀번호가 일치하지 않습니다.") {
      // 	dispatch(userSignin({ ...data, err: message }));
      // }
    })
}

//PATCH  /mypage/${changeinfo} => req.body {}
// {
// 	"password": "string", 필수
// 	"newPass"?: "string",
// 	"newUsername"?: "string",

//   }

//PATCH /mypage/${changeimage} => img를 키값으로 이미지 파일을 보낸다

export const myImageUpdate = (formData?: any) => async (
  dispatch: Dispatch<UsersAction>,
  getState: any,
) => {
  console.log('들어오니?', formData)

  dispatch(userRequest())

  await axios
    // .patch('http://localhost:8080/mypage/changeimage', {
    .post('https://myraspberry.shop/mypage/changeimage', {
      formData,
    })
    .then(data => {
      // 결과값  { username, isChanged: true }
      console.log('AAAAAAAAAAAAAAAA')
      dispatch(userSignin({...data.data}))
      console.log(
        '여기는 마이페이지 수정 요청 후 나온 결과',
        getState().userReducer,
      )
      // dispatch(goToIntro())
    })
    .catch(err => {
      const {message} = err.response.data
      const data = getState().userReducer
      if (message === '일치하는 정보가 존재하지 않습니다.') {
        dispatch(userSignin({...data, isSignUp: true}))
      } else if (message === '비밀번호가 일치하지 않습니다.') {
        dispatch(userSignin({...data, err: message}))
      }
    })
}

export const mypageUpdate = (
  password?: string,
  newPass?: string,
  newUserName?: string,
) => async (dispatch: Dispatch<UsersAction>, getState: any) => {
  dispatch(userRequest())

  await axios
    // .patch('http://localhost:8080/mypage/changeinfo', {
    .post('https://myraspberry.shop/mypage/changeinfo', {
      password,
      newPass,
      newUserName,
    })
    .then(data => {
      // 결과값  { username, isChanged: true }
      console.log('AAAAAAAAAAAAAAAA')
      dispatch(userSignin({...data.data}))
      console.log(
        '여기는 마이페이지 수정 요청 후 나온 결과',
        getState().userReducer,
      )
      // dispatch(goToIntro())
    })
    .catch(err => {
      const {message} = err.response.data
      const data = getState().userReducer
      if (message === '일치하는 정보가 존재하지 않습니다.') {
        dispatch(userSignin({...data, isSignUp: true}))
      } else if (message === '비밀번호가 일치하지 않습니다.') {
        dispatch(userSignin({...data, err: message}))
      }
    })
}

export default userReducer
