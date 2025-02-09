import React, { useState, useEffect } from 'react'

import {
  SignupContainer,
  SignupInput,
  SignupLabel,
  SignupForm,
  SingupButton,
  SignupErrorSpan,
  SignupCheckBtn,
  SignupInputTwo,
} from './singup'

import Footer from '../../components/footer/Footer'
import { checkId, checkNickname, register } from '../../api/signup'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'

function SignUp() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')

  const [idMessage, setIdMessage] = useState('')
  const [nicknameMessage, setNicknameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [confirmCheckMessage, setConfirmCheckMessage] = useState('')

  const [idCheck, setIdCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [confirmCheck, setConfirmCheck] = useState(false)
  const [emailCheck, setEmailCheck] = useState(false)
  const [nicknameCheck, setNicknameCheck] = useState(false)
  const navigate = useNavigate()

  const onCheckIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
    let regExp: RegExp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,}$/
    if (regExp.test(e.target.value) === false) {
      setIdMessage(
        '아이디는 영어 소문자와 숫자를 포함한 4글자 이상이어야 합니다.'
      )
      setIdCheck(false)
    } else {
      setIdMessage('올바른 id 형식입니다.')
      setIdCheck(true)
    }
  }

  const onCheckEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    let regExp: RegExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    if (regExp.test(e.target.value) === false) {
      setEmailMessage('올바른 이메일 형식이 아닙니다.')
      setEmailCheck(false)
    } else {
      setEmailMessage('올바른 이메일 형식입니다.')
      setEmailCheck(true)
    }
  }

  const onCheckPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)

    let regExp: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-={}[\]:;\"'<>?,./]).{8,}$/
    if (regExp.test(e.target.value) === false) {
      setPasswordMessage(
        '비밀번호는 영문 대소문자와 숫자, 특수문자를 포함한 8글자 이상이어야 합니다.'
      )
      setPasswordCheck(false)
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.')
      setPasswordCheck(true)
    }
  }

  const onCheckNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    if (e.target.value.length < 2) {
      setNicknameMessage('닉네임은 두글자 이상이어야 합니다.')
      setNicknameCheck(false)
    } else {
      setNicknameMessage('올바른 닉네임 형식입니다.')
      setNicknameCheck(true)
    }
  }

  const onCheckConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value)
  }
  useEffect(() => {
    if (confirm === '') {
      return
    }
    if (confirm !== password) {
      setConfirmCheckMessage('비밀번호가 동일하지 않습니다.')
      setConfirmCheck(false)
    } else {
      setConfirmCheckMessage('비밀번호가 동일합니다.')
      setConfirmCheck(true)
    }
  }, [confirm, password])
  const onSubmitSignUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const body = { id, password, confirm, email, nickname }
    if (!id || !email || !password || !confirm || !nickname) return
    if (
      idCheck &&
      nicknameCheck &&
      emailCheck &&
      passwordCheck &&
      confirmCheck
    ) {
      register(body)
        .then((res) => {
          alert('회원가입에 성공하셨습니다.')
          navigate('/login')
          return res
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const onCheckExistId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (id !== '') {
      checkId(id)
        .then((res) => {
          alert('사용 가능한 아이디입니다.')
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
  const onCheckExistNickName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (nickname !== '') {
      checkNickname(nickname)
        .then((res) => {
          alert('사용 가능한 닉네임입니다.')
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
  return (
    <>
      <Header />
      <SignupContainer>
        <SignupForm>
          <p>회원가입</p>
          <span onClick={() => {navigate("/login")}}>MOOD에 이미 가입하셨나요?</span>
          <SignupLabel>아이디</SignupLabel>
          <SignupInput
            type="text"
            name="id"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={onCheckIdHandler}
          />
          <SignupCheckBtn onClick={onCheckExistId}>중복확인</SignupCheckBtn>
          <div>
            {idCheck === false ? (
              <SignupErrorSpan style={{ color: 'red' }}>
                {idMessage}
              </SignupErrorSpan>
            ) : (
              <SignupErrorSpan style={{ color: 'gray' }}>
                {idMessage}
              </SignupErrorSpan>
            )}
          </div>
          <SignupLabel>이메일</SignupLabel>
          <SignupInputTwo
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onCheckEmailHandler}
          />
          <div>
            {emailCheck === false ? (
              <SignupErrorSpan style={{ color: 'red' }}>
                {emailMessage}
              </SignupErrorSpan>
            ) : (
              <SignupErrorSpan style={{ color: 'gray' }}>
                {emailMessage}
              </SignupErrorSpan>
            )}
          </div>
          <SignupLabel>닉네임</SignupLabel>
          <SignupInput
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={onCheckNicknameHandler}
          />
          <SignupCheckBtn onClick={onCheckExistNickName}>중복확인</SignupCheckBtn>
          <div>
            {nicknameCheck === false ? (
              <SignupErrorSpan style={{ color: 'red' }}>
                {nicknameMessage}
              </SignupErrorSpan>
            ) : (
              <SignupErrorSpan style={{ color: 'gray' }}>
                {nicknameMessage}
              </SignupErrorSpan>
            )}
          </div>
          <div>
            <SignupLabel>비밀번호</SignupLabel>
            <SignupInputTwo
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={onCheckPasswordHandler}
            />
            <div>
              {passwordCheck === false ? (
                <SignupErrorSpan style={{ color: 'red' }}>
                  {passwordMessage}
                </SignupErrorSpan>
              ) : (
                <SignupErrorSpan style={{ color: 'gray' }}>
                  {passwordMessage}
                </SignupErrorSpan>
              )}
            </div>
          </div>
          <div>
            <SignupLabel>비밀번호 확인</SignupLabel>
            <SignupInputTwo
              type="password"
              name="confirm"
              placeholder="동일한 비밀번호를 입력하세요."
              value={confirm}
              onChange={onCheckConfirmHandler}
            />
            <div>
              {confirmCheck === false ? (
                <SignupErrorSpan style={{ color: 'red' }}>
                  {confirmCheckMessage}
                </SignupErrorSpan>
              ) : (
                <SignupErrorSpan style={{ color: 'gray' }}>
                  {confirmCheckMessage}
                </SignupErrorSpan>
              )}
            </div>
          </div>
          <div>
            <SingupButton
              onClick={(e) => {
                onSubmitSignUpHandler(e)
              }}
            >
              회원가입 하기
            </SingupButton>
          </div>
        </SignupForm>
      </SignupContainer>
      <Footer />
    </>
  )
}

export default SignUp
