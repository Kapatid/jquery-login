import { useState, waitElemsToLoad } from "../../../modules/fake-react/index.js"
import { Auth } from "../models.js"

const Home = () => {
  
  /** let [sample, sampleSet] = useState(1)

  $('#btn').on('click', () => {
    sampleSet(sample++)
    console.log(sample)
  }) */

  const template = (data) => `<div class="data">${data}</div>`
  const user = Auth.loggedInUser

  let attendanceDiv = ''
  user.payroll.attendances.forEach(d => {
    attendanceDiv = attendanceDiv.concat(new Date(d)) + '<br><br>'
  })

  waitElemsToLoad('.table-data', () => {
    $('#logout').on('click', () => {
      Auth.logout()
    })

    $('.table-data').append(template(user.fullName))
    $('.table-data').append(template("₱ " + user.payroll.payPerInOut))
    $('.table-data').append(template(attendanceDiv))
    $('.table-data').append(template("₱ " + user.payroll.grossPay))
  })

  return (`
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
  `)
}

export default Home