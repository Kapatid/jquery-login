import Home from './components/Home.js'
import { render } from '../../modules/control.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import { Auth } from './models.js'

render([Home, Login, Signup], 'root', () => {
  return Auth.loggedInUser ? Home : Login
})