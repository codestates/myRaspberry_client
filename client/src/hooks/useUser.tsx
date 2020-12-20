import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import {
	signIn,
	signUp,
	socialLogin,
	goToIntro,
	userFail,
	tagUpdate,
	mypageUpdate,
	myImageUpdate,
	Signout,
	callUserStateOfLocalStorage,
} from "../modules/users";

export default function useUser() {
	const userState = useSelector((state: RootState) => state.userReducer);
	const dispatch = useDispatch();
	const onSignIn = (email: string, password: string) =>
		dispatch(signIn(email, password));
	const onSignUp = (email: string, password: string) =>
		dispatch(signUp(email, password));
	const onSocialLogin = (social: string) => dispatch(socialLogin(social));
	const onGoToIntro = () => dispatch(goToIntro());
	const onUserFail = (err: string) => dispatch(userFail(err));
	const onTagUpdate = (isLike: string, docid: string, tag: number[]) =>
		dispatch(tagUpdate(isLike, docid, tag));
	const onMypageUpdate = (
		password?: string,
		newPass?: string,
		newUserName?: string,
	) => dispatch(mypageUpdate(password, newPass, newUserName));
	const onMyImageUpdate = (fd: any) => dispatch(myImageUpdate(fd));
	const onSignout = () => dispatch(Signout());
	const onCallUserStateOfLocalStorage = () =>
		dispatch(callUserStateOfLocalStorage());
	return {
		onSignIn,
		onSignUp,
		onGoToIntro,
		userState,
		onSocialLogin,
		dispatch,
		onUserFail,
		onTagUpdate,
		onMypageUpdate,
		onMyImageUpdate,
		onSignout,
		onCallUserStateOfLocalStorage,
	};
}
