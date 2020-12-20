import React, { useState } from "react";
import styles from "./sign.module.css";
import useUser from "../../hooks/useUser";
import { goToIntro } from "../../modules/users";

const Sign = () => {
	const {
		onSignIn,
		onSignUp,
		userState,
		onSocialLogin,
		onUserFail,
		onCallUserStateOfLocalStorage,
	} = useUser();

	const { isLogin, isSignUp, err } = userState;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [errMessage, setErrorMessage] = useState("");

	React.useEffect(() => {
		onCallUserStateOfLocalStorage();
		goToIntro();
	}, [isLogin]);

	const emailChange = e => setEmail(e.target.value);
	const passwordChange = e => setPassword(e.target.value);
	const confirmPassChange = e => setConfirmPass(e.target.value);

	const onClick = () => {
		if (isSignUp) {
			//회원가입
			onUserFail("");
			if (email === "") {
				setErrorMessage("이메일을 입력해주세요");
				return;
			} else if (!ValidateEmail(email)) {
				setErrorMessage("유효하지 않은 이메일입니다.");
				return;
			}

			if (password === "") {
				setErrorMessage("비밀번호를 입력해주세요");
				return;
			} else if (checkPassword(password)) {
				if (confirmPass === "") {
					setErrorMessage("비밀번호를 다시 한번 입력해주세요");
					return;
				} else if (password === confirmPass) {
					setErrorMessage("");
					//회원가입 통신.
					onSignUp(email, password);
					setEmail("");
					setPassword("");
					setConfirmPass("");
					return;
				} else {
					setErrorMessage("확인용 비밀번호를 정확하게 입력해주세요");
					return;
				}
			}
		} else {
			// 로그인
			if (email === "") {
				setErrorMessage("이메일을 입력해주세요");
				return;
			} else if (!ValidateEmail(email)) {
				setErrorMessage("유효하지 않은 이메일주소입니다.");
				return;
			} else setErrorMessage("");

			if (password === "") {
				setErrorMessage("비밀번호를 입력해주세요");
				return;
			} else if (checkPassword(password)) {
				//로그인 통신
				onSignIn(email, password);
				return;
			}
		}
	};

	const ValidateEmail = email => {
		if (
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				email
			)
		) {
			return true;
		}
		return false;
	};

	const checkPassword = upw => {
		if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
			setErrorMessage(
				"비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다."
			);
			return false;
		}
		var chk_num = upw.search(/[0-9]/g);
		var chk_eng = upw.search(/[a-z]/gi);
		if (chk_num < 0 || chk_eng < 0) {
			setErrorMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
			return false;
		}
		if (/(\w)\1\1\1/.test(upw)) {
			setErrorMessage("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.");
			return false;
		} else return true;
	};
	const newlineText = `아직 회원이 아니신가요?\n회원이 아니시면 원하는 이메일과 비밀번호를 눌러주세요`;

	return (
		<div className={styles.outBox}>
			<div className={styles.signBox}>
				<div className={styles.sign_upper}>
					<h1 className={styles.sign_text}>
						{isSignUp
							? "마이 라즈베리 가족이 되어주세요!"
							: "안녕하세요 회원님!"}
					</h1>
					<h5 className={styles.sign_subText}>
						{isSignUp ? `비밀번호를 한번 더 입력해주세요.` : newlineText}
					</h5>
					<ul className={styles.inputList_ul}>
						<li className={styles.inputList_li}>
							<input
								type="text"
								className={`${styles.input_item} ${styles.email}`}
								value={email}
								placeholder="이메일을 입력해주세요"
								onFocus={e => (e.target.placeholder = "")}
								onBlur={e => (e.target.placeholder = "이메일을 입력해주세요")}
								onChange={emailChange}></input>
						</li>
						<li className={styles.inputList_li}>
							<input
								type="password"
								className={
									isSignUp
										? `${styles.input_item} ${styles.pass1}`
										: `${styles.input_item} ${styles.pass2}`
								}
								value={password}
								placeholder="비밀번호를 입력해주세요"
								onFocus={e => (e.target.placeholder = "")}
								onBlur={e => (e.target.placeholder = "비밀번호를 입력해주세요")}
								onChange={passwordChange}></input>
						</li>
						<li className={isSignUp ? styles.inputList_li : styles.invisible}>
							<input
								type="password"
								className={`${styles.input_item} ${styles.pass2}`}
								value={confirmPass}
								placeholder="비밀번호 확인"
								onChange={confirmPassChange}
								onFocus={e => (e.target.placeholder = "")}
								onBlur={e => (e.target.placeholder = "비밀번호 확인")}></input>
						</li>
					</ul>
					<div className={errMessage ? styles.errMessage : styles.noErrMessage}>
						{err ? err : errMessage}
					</div>
					<div className={styles.submitDiv}>
						<button className={styles.submitBtn} onClick={() => onClick()}>
							{isSignUp ? "회원가입" : "로그인"}
						</button>
					</div>
				</div>
				<div className={styles.sign_down}>
					<ul className={styles.social_ul}>
						<li className={styles.social_kakao}>
							<button
								className={styles.kakaoIcon}
								onClick={() => onSocialLogin("kakao")}></button>
						</li>
						<li className={styles.social_google}>
							<a href="/auth/google">
								<button
									className={styles.googleIcon}
									onClick={() => onSocialLogin("google")}></button>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sign;
