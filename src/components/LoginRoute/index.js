import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const LoginRoute = props => {
  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return <Route {...props} />
}

export default LoginRoute
