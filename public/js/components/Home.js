import { Auth } from '../models.js'

const Home = () => {

  const user = Auth.loggedInUser
  const attendances = user.payroll.attendances.map(
    d => (new Date(d))).join('<br><br>')
    
  $('#logout').on('click', () => Auth.logout())

  const template = (data) => `<div class='data'>${data}</div>`
  
  $('#table').append(`
    <div class='row-data'> 
      ${template(user.fullName)}
      ${template('₱ ' + user.payroll.payPerInOut)}
      ${template(attendances)}
      ${template('₱ ' + user.payroll.grossPay)}
    </div>`
  )

  return `
    <div id='home'>
      <button id='logout'>Logout</button>

      <div id='table'>
        <div class='row-header'>
          <h1>Name</h1>
          <h1>Pay Per Attendance</h1>
          <h1>Attendances</h1>
          <h1>Gross Pay</h1>
        </div>
      </div>
    </div>
  `
}

export default Home