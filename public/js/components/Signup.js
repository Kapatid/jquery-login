import { updateElem, waitElemToLoad } from "../../../modules/control.js"
import { Payroll, User, UserDB } from "../models.js"
import Login from "./Login.js"

const Signup = () => { 

  waitElemToLoad('.auth-form ', () => {

    $('#login-page').on('click', () => updateElem('#root', Login))

    $('form').submit((e) => {
      e.preventDefault()
      
      // Get form data
      let firstName = $('[name="firstName"]').val().trim()
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
      let lastName = $('[name="lastName"]').val().trim()
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
      const email = $('[name="email"]').val().trim()
      const password = $('[name="password"]').val().trim()
      
      const newUser = new User({ firstName, lastName, email, password,
        payroll: new Payroll({
          employeeName: firstName + " " + lastName,
          payPerInOut: 100,
          attendances: []
        })
      })

      const db = new UserDB()

      if (db.signUp(newUser) === null ) {
        $('#status').text('Email is already in use.')
        $('#status').css({ display: 'grid', color: 'red' })
      } else {
        $('#status').text('User successfully created!')
        $('#status').css({ display: 'grid', color: 'green' })
      }
    })
  })


  return (`
    <div class="auth-form">
      <h1>Signup</h1>

      <form action="post">
        <section>
          <input type="text" name="firstName" placeholder=" " required>
          <label for="firstName">First Name</label>
        </section>
        <section>
          <input type="text" name="lastName" placeholder=" " required>
          <label for="lastName">Last Name</label>
        </section>
        <section>
          <input type="email" name="email" placeholder=" " required>
          <label for="email">Email</label>
        </section>
        <section>
          <input type="password" name="password" placeholder=" " required>
          <label for="password">Password</label>
        </section> 

        <section id="status"></section>

        <button type="submit">Signup</button>
        <a href="#" id="login-page">Already have an account?</a>
      </form>
    </div>
  `)
}

export default Signup