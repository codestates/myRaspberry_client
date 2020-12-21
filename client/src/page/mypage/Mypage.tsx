import React, { useState } from "react";
import styles from "./mypage.module.css";
import axios from "axios";
import useUser from "../../hooks/useUser";
import { formatDiagnosticsWithColorAndContext } from "typescript";

const Mypage = () => {
	const {
		userState,
		onMypageUpdate,
		onMyImageUpdate,
		onCallUserStateOfLocalStorage,
	} = useUser();
	const { profileImg } = userState;
	const [confirmChange, setConfirmChange] = useState(false);
	const [newUserName, setNewUserName] = useState("");
	const [newPass, setNewPass] = useState("");
	const [password, setPassword] = useState("");
	// console.log("유저상태 확인용", userState.isLogin);
	const [errMessage, setErrorMessage] = useState("");
	// console.log("유저네임 변경인데, 생기려나?", newUserName);
	React.useEffect(() => {
		onCallUserStateOfLocalStorage();
	}, []);

	// 새로 작성 이미지 변경

	// const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files !== null) {
	// 		const fd = new FormData();
	// 		fd.append("profileImg", e.target.files[0]);
	// 		onMyImageUpdate(fd);
	// 	}
	// };

	const photoChange = e => {
		e.target.nextSibling.click();
	};

	const PhotoSubmit = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("img", e.target.childNodes[0].files[0]);
		onMyImageUpdate(formData);
	};

	const userNameChange = e => setNewUserName(e.target.value);
	const passwordChange = e => setNewPass(e.target.value);
	const checkPassword = e => setPassword(e.target.value);

	const onClick = () => {
		if (confirmChange) {
			let data = [password, newPass, newUserName];
			onMypageUpdate(...data);
		} else if (newUserName || newPass) {
			if (newPass) {
				if (passwordValidationCheck(newPass)) {
					setErrorMessage("");
					setConfirmChange(true);
				}
			} else {
				setConfirmChange(true);
			}
		} else {
			setErrorMessage("정보를 업데이트해주세요");
		}
	};

	const passwordValidationCheck = upw => {
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

	/*
editProfile: async (isImageDeleted, image, bodyData, headers) => {
    const body = formDataMaker(image, bodyData);
    try {
      const response = axios.patch(
        `${endpoint}?img-del=${isImageDeleted}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },

const formDataMaker = (photo, body) => {
  const data = new FormData();

  if (typeof photo === 'object' && photo !== null) {
    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
  }

  Object.keys(body).forEach(key => {
    if (key !== 'image') {
      data.append(key, body[key]);
    }
  });

  return data;
};


  */

	return (
		<div className={styles.outBox}>
			<div className={styles.mypageBox}>
				<div className={styles.titleBox}>
					<h1 className={styles.mypage_title}>마이페이지</h1>
				</div>
				<div className={styles.mypage_upper}>
					<div className={styles.manage_profile}>
						<div className={styles.change_img_box}>
							<div className={styles.img_box}>
								<img
									className={styles.img}
									src={
										!profileImg || profileImg === "noPath"
											? "https://i.ibb.co/tYgpb6Z/rasbperry-potter-150.png"
											: profileImg
									}
									alt="userProfileImg"></img>
							</div>
						</div>
						<form
							encType="multipart/form-data"
							style={{ position: "relative" }}
							onSubmit={PhotoSubmit}
							className={styles.img_submit}>
							<input
								name="img"
								type="file"
								id="img"
								// onChange={onChange}
								onChange={photoChange}
								accept="image/*"
								required
								hidden
							/>
							<input type="submit" style={{ display: "none" }}></input>
							<label className={styles.submitBtn} htmlFor="img">
								이미지 변경
							</label>
						</form>
					</div>
					<div className={styles.change_info_box}>
						<div className={styles.mypage_subtitle}>
							안녕하세요 {userState.username}님!
						</div>
						<ul className={styles.chage_info_ul}>
							<li className={styles.chage_info_li}>
								<input
									type="text"
									className={styles.change_info_li_item}
									value={newUserName}
									placeholder={userState.username}
									onChange={userNameChange}></input>
							</li>
							<li
								className={
									newUserName && confirmChange
										? styles.invisible
										: styles.chage_info_li
								}>
								<input
									type="password"
									className={styles.change_info_li_item}
									value={newPass}
									placeholder="변경하실 비밀번호를 입력해주세요(선택)"
									onChange={passwordChange}></input>
							</li>
							<li
								className={
									confirmChange ? styles.chage_info_li : styles.invisible
								}>
								<input
									type="password"
									className={styles.change_info_li_item}
									value={password}
									placeholder="현재 비밀번호를 입력해주세요"
									onChange={checkPassword}></input>
							</li>
						</ul>
						<div className={styles.errMessage}>{errMessage}</div>
					</div>
					<button
						className={confirmChange ? styles.invisible : styles.submit_button}
						onClick={() => onClick()}>
						변경
					</button>

					<button
						className={confirmChange ? styles.submit_button : styles.invisible}
						onClick={() => onClick()}>
						제출
					</button>
				</div>

				{/* <div className={confirmChange ? styles.mypage_lower : styles.invisible}>
					<div className={styles.checkPass}>
						<input
							type="password"
							className={styles.change_info_li_item}
							value={password}
							placeholder="현재 비밀번호를 입력해주세요"
							onChange={checkPassword}></input>
						<div className={styles.checkPass_btnBox}>
							<button
								className={styles.submit_button}
								onClick={() => onClick()}>
								제출
							</button>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Mypage;
