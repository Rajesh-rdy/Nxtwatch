import Cookies from 'js-cookie'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginCard = styled.div`
  width: 350px;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Logo = styled.img`
  width: 150px;
  margin-bottom: 30px;
`
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`

const Input = styled.input`
  height: 40px;
  border: 1px solid #64748b;
  border-radius: 3px;
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 14px;
  outline: none;
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const LoginButton = styled.button`
  height: 40px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const onSubmitLogin = async event => {
    event.preventDefault()
    setApiStatus(apiStatusConstants.loading)

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      setErrorMsg(data.error_msg)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  return (
    <LoginPage>
      <LoginCard>
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />

        <LoginForm onSubmit={onSubmitLogin}>
          <Label htmlFor="username">USERNAME</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />

          <Label htmlFor="password">PASSWORD</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <CheckboxContainer>
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={event => setShowPassword(event.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </CheckboxContainer>

          <LoginButton
            type="submit"
            disabled={apiStatus === apiStatusConstants.loading}
          >
            {apiStatus === apiStatusConstants.loading ? (
              <Loader type="ThreeDots" color="#ffffff" height={30} width={30} />
            ) : (
              'Login'
            )}
          </LoginButton>
          {apiStatus === apiStatusConstants.failure && <p>{errorMsg}</p>}
        </LoginForm>
      </LoginCard>
    </LoginPage>
  )
}

export default Login
