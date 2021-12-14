/**
 * Throws a type error.
 * @param {any} property 
 * @param {any} type 
 */
 function typeCheck(property, type) {
  if (typeof property === type) {
    return property
  } else {
    throw new TypeError(`${property} is not ${type}`)
  }
}

export class Payroll {

  constructor(
    options = { employeeName: '', payPerInOut: '', attendances: [] }
  ) {
    options && Object.assign(this, options)
  }

  /**
   * Returns grossPay based on number of attendances.
   * @returns {number} grossPay
   */
  get grossPay() { return this.attendances.length * this.payPerInOut }
}


export class User {

  constructor(
    options = { firstName: '', lastName: '', email: '', password: '', payroll: {}}
  ) {
    options && Object.assign(this, options)
  }

  /**
   * Returns concatenated firstName and lastName
   * @returns {string} fullName
   */
  get fullName() { return this.firstName + " " + this.lastName }
}


export class UserDB {
  #users = []

  constructor() {
    const localUsers = JSON.parse(localStorage.getItem('Users'))
    localUsers ? this.#users = localUsers : []
  }

  /**
   * Returns all users
   * @returns {User[]} users
   */
  get users() { return this.#users }

  /**
   * Add user to database.
   * @param {User} user 
   * @returns {null | User} User or null
   */
  signUp(user) {
    const userExists = this.findUser(user.email)

    if (userExists === null) {
      this.#users.push(user)
      localStorage.setItem('Users', JSON.stringify(this.#users))

      return user
    } else return null
  }

  /**
   * Update user in DB
   * @param {User} updatedUser 
   * @returns {void | User}
   */
  updateUser(updatedUser) {
    const newList = this.#users.map(user => {
      if (user.email === updatedUser.email) {
        return updatedUser
      }
      return user
    })

    localStorage.setItem('Users', JSON.stringify(newList))
  }

  /**
   * 
   * @param {string} email 
   * @returns {User}
   */
  findUser(email) {
    const userExists = this.#users.find(u => u.email === email)
    return userExists ? userExists : null
  }
}


export class Auth {

  static get loggedInUser() {
    const result = JSON.parse(localStorage.getItem('LoggedIn'))
      
    return result 
      ? new User({...result, payroll: new Payroll(result.payroll)}) 
      : null
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {null | User} User or null
   */
  static loginUser(email, password) {
    const db = new UserDB()
    const userExists = db.findUser(email)

    if (userExists !== null && userExists.password === password) {
      localStorage.setItem('LoggedIn', JSON.stringify(userExists))
      location.reload()

      return userExists
    } else return null
  }

  static logout() {
    const db = new UserDB()
    const user = this.loggedInUser

    user.payroll.attendances.push(new Date())
    db.updateUser(user)

    localStorage.removeItem('LoggedIn')
    location.reload()
  }
}