import { updateElem, waitElemsToLoad } from "../../../modules/fake-react/index.js"
import { Auth } from "../models.js"
import Signup from "./Signup.js"

const Login = () => { 

  waitElemsToLoad('.auth-form ', () => {
    $('#signup-page').on('click', () => updateElem('#root', Signup) )
  
    $('form').submit((e) => {
      e.preventDefault()
  
      const email = $('[name="email"]').val()
      const password = $('[name="password"]').val()
  
      if (Auth.loginUser(email, password) === null) {
        $('#status').text('Credentials are incorrect.')
        $('#status').css({ display: 'grid', color: 'red' })
      } else {
        $('#status').css({ display: 'none' })
      }
    })
  })

  return (`
    <div class="auth-form">
      <h1>LOGIN</h1>
      <form action="post">
        <section>
          <input type="email" name="email" placeholder=" " required>
          <label for="email">Email</label>
        </section>
        <section>
          <input type="password" name="password" placeholder=" " required>
          <label for="password">Password</label>
        </section>

        <section id="status"></section>
        
        <button type="submit" id="login">Login</button>
        <a href="#" id="signup-page">Need an account?</a>
      </form>
    </div>
  `)
}

export default Login