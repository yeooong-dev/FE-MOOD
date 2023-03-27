import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/loginapi'
import Footer from '../../components/footer/Footer'
import kakao from '../../assets/kakao_login_large_narrow.png'
import Header from '../../components/header/Header'
import jwt_Decode from 'jwt-decode'
import { onSetCookieHandler, onSetLocalStorageHandler } from '../../util/cookie'

function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`

 
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.profile`
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=random_string`

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onClickLoginHandler = () => {
    if (!id || !password) return
    login({ id: id, password: password })
      .then((res) => {
        const authId = res.data.token
        const decodeUserInfo = JSON.stringify(jwt_Decode(authId))
        onSetCookieHandler('authorization', authId)
        onSetLocalStorageHandler('authorization', authId)
        onSetLocalStorageHandler('userInfo', decodeUserInfo)
        navigate('/recommend')
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  const onKakaoLoginHandler = async () => {
    window.location.href = KAKAO_AUTH_URL
  }

  const onGoogleLoginHanlder = () => {
    window.location.assign(googleLoginUrl)
  }
  const onNaverLoginHandler = () => {
    window.location.href = naverLoginUrl
  }
  return (
    <>
      <Header />
      <div>
        <input
          type="text"
          placeholder="아이디"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => onClickLoginHandler()}>로그인</button>
      </div>

      <img
        src={kakao}
        alt="카카오 로그인"
        onClick={() => {
          onKakaoLoginHandler()
        }}
      />
      <button onClick={onGoogleLoginHanlder}>구글 로그인</button>
      <button onClick={onNaverLoginHandler}>네이버 로그인</button>
      <Footer />
    </>
  )
}

export default Login
