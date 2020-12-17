import React from 'react'
import './navSideBar.scss'
import styled from 'styled-components'
import {
  mainColor,
  headerColor,
  textColor,
  subColor,
  inputColor,
  buttonColor,
  userColor,
} from '../../common/colors'
import {Link} from 'react-router-dom'
import useUser from '../../hooks/useUser'

const raspberryUrl = 'https://i.ibb.co/tYgpb6Z/rasbperry-potter-150.png'

const NavSideBar = ({navBarOpen, handleClose}) => {
  const {userState} = useUser()
  const {isLogin, profileImg, username} = userState
  console.log('isLogin in nav Bar', isLogin)
  return (
    <>
      <div className={navBarOpen ? 'mdl show' : 'mdl'}>
        <div
          className={navBarOpen ? 'mdl-mask show' : 'mdl-mask'}
          onClick={handleClose}
        ></div>
        <div className="sidebar">
          <SideTop>
            <p>WELCOME!</p>
            {isLogin ? <p>{username} 님</p> : <p> 게스트 님!</p>}
            {isLogin ? (
              profileImg === 'noPath' ? (
                <img src={raspberryUrl} alt="potter-raspberry" />
              ) : (
                <img src={profileImg} alt="profileImg" />
              )
            ) : (
              <img src={raspberryUrl} alt="potter-raspberry" />
            )}
            {/* <img src={raspberryUrl} alt="potter-raspberry" /> */}
          </SideTop>
          <SideBottom>
            <Link to="/intro" onClick={handleClose}>
              <p className="linkText intro"></p>
            </Link>
            <Link to="/main" onClick={handleClose}>
              <p className="linkText main"></p>
            </Link>
            <Link to="/mypage" onClick={handleClose}>
              <p className="linkText mypage"></p>
            </Link>

            <Link to={isLogin ? '/signout' : '/user'} onClick={handleClose}>
              {isLogin ? (
                <p className="linkText signout"></p>
              ) : (
                <p className="linkText sign"></p>
              )}
            </Link>
          </SideBottom>
        </div>
      </div>
    </>
  )
}

const SideTop = styled.div`
  grid-area: SideTop;
  text-align: center;
  p {
    font-size: 1.5rem;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bolder;
  }
  img {
    margin-top: 0.5rem;
    max-width: 7rem;
  }
`

const SideBottom = styled.div`
  grid-area: SideBottom;
  text-align: center;
`

export default NavSideBar
