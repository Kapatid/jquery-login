import { useState, updateElem } from "../../../modules/fake-react/index.js"
import { Auth, User } from "../models.js"

const Home = () => {
  
  // let [sample, sampleSet] = useState(1)

  // $('#btn').on('click', () => {
  //   sampleSet(sample++)
  //   console.log(sample)
  // })

  $('#logout').on('click', () => {
    Auth.logout()
  })

  const template = (data) => `<div class="data">${data}</div>`
  const user = Auth.loggedInUser
  console.log(user);

  let finalString = ''

  user.payroll.attendances.forEach(d => {
    let date = new Date(d)
    finalString = finalString.concat(date) + '<br><br>'
  })
  $('.table-data').append(template(user.fullName))
  $('.table-data').append(template(user.payroll.payPerInOut))
  $('.table-data').append(template(finalString))
  $('.table-data').append(template(user.payroll.grossPay))


  return `
    <div id="home">
      <button id="logout">Logout</button>

      <div id="table">
        <div class="table-header">
          <h1>Name</h1>
          <h1>Pay Per Attendance</h1>
          <h1>Attendances</h1>
          <h1>Gross Pay</h1>
        </div>
        
        <div class="table-data"></div>
      </div>
    </div>
  `
}

export default Home