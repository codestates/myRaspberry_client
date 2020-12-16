import React, {useState} from 'react'
import styles from './mypage.module.css'

import useUser from '../../hooks/useUser'

const Mypage = () => {
  const [confirmChange, setConfirmChange] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newPass, setNewPass] = useState('')
  const [password, setPassword] = useState('')

  const [errMessage, setErrorMessage] = useState('')

  const userNameChange = e => setNewUserName(e.target.value)
  const passwordChange = e => setNewPass(e.target.value)
  const checkPassword = e => setPassword(e.target.value)

  const onClick = () => {
    if (confirmChange) {
      // patch /mypage/changeinfo 로 {password,newPass,newUserName} 을 보내줘야합니다. 바뀐 정보를 보내줘야겠네요
      // patch /mypage/changeimage 로 img = 이미지값으로 이미지를 변경해줘야합니다. 바뀐 정보를 보내줘야겠네요
      // 변경 후에는 user 스테이트의 변경된 상태를 업데이트시켜야합니다.
    } else if (newUserName || newPass) {
      if (newPass) {
        if (passwordValidationCheck(newPass)) {
          setErrorMessage('')
          setConfirmChange(true)
        }
      } else {
        setConfirmChange(true)
      }
    } else {
      setErrorMessage('정보를 업데이트해주세요')
    }
  }

  const passwordValidationCheck = upw => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
      setErrorMessage(
        '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.',
      )
      return false
    }
    var chk_num = upw.search(/[0-9]/g)
    var chk_eng = upw.search(/[a-z]/gi)
    if (chk_num < 0 || chk_eng < 0) {
      setErrorMessage('비밀번호는 숫자와 영문자를 혼용하여야 합니다.')
      return false
    }
    if (/(\w)\1\1\1/.test(upw)) {
      setErrorMessage('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.')
      return false
    } else return true
  }

  return (
    <div className={styles.outBox}>
      <div className={styles.mypageBox}>
        <h1 className={styles.mypage_title}>마이페이지 입니다.</h1>
        <div className={styles.mypage_upper}>
          <div className={styles.change_img_box}>
            <div className={styles.img_box}>
              <img
                className={styles.img}
                src={'https://i.ibb.co/tYgpb6Z/rasbperry-potter-150.png'}
                alt="userProfileImg"
              ></img>
              <div className={styles.img_submit}>
                <input
                  name="img"
                  type="file"
                  id="img"
                  onChange={() => {
                    onClick()
                  }}
                  accept="image/png, image/jpeg, image/jpg"
                  hidden
                />
                <label className={styles.submitBtn} htmlFor="img">
                  변경
                </label>
              </div>
            </div>
          </div>
          <div className={styles.change_info_box}>
            <ul className={styles.chage_info_ul}>
              <li className={styles.chage_info_li}>
                <input
                  type="text"
                  className={styles.change_info_li_item}
                  value={newUserName}
                  placeholder="변경하실 유저네임을 입력해주세요(선택)"
                  onChange={userNameChange}
                ></input>
              </li>
              <li className={styles.chage_info_li}>
                <input
                  type="password"
                  className={styles.change_info_li_item}
                  value={newPass}
                  placeholder="변경하실 비밀번호를 입력해주세요(선택)"
                  onChange={passwordChange}
                ></input>
              </li>
            </ul>
            <div className={styles.errMessage}>{errMessage}</div>
          </div>
          <button className={styles.submitBtn} onClick={() => onClick()}>
            정보 변경
          </button>
        </div>

        <div className={confirmChange ? styles.mypage_lower : styles.invisible}>
          <div className={styles.checkPass}>
            <input
              type="password"
              className={styles.change_info_li_item}
              value={password}
              placeholder="현재 비밀번호를 입력해주세요"
              onChange={checkPassword}
            ></input>
            <div className={styles.checkPass_btnBox}>
              <button className={styles.submitBtn} onClick={() => onClick()}>
                제출
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage
