import Home from './components/Home.js'
import { render } from '../../modules/fake-react/index.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import { Auth } from './models.js'

render([Home, Login, Signup], 'root', () => {
  if (Auth.loggedInUser) return Home()
  else return Login()
})