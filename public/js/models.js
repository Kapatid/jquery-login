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
  #grossPay = 0

  constructor(
    options = { employeeName: '', payPerInOut: '', attendances: [] }
  ) {
    options && Object.assign(this, options)
  }

  /**
   * Returns grossPay based on number of attendances.
   * @returns {number} grossPay
   */
  get grossPay() {
    this.attendances.forEach(() => 
      this.#grossPay = this.#grossPay + this.payPerInOut
    )
    return this.#grossPay
  }
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
    const userExists = this.#users 
      ? this.#users.some(u => u.email === user.email) : false

    if (!userExists) {
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
}


export class Auth {
  /**
   * @returns {User} The currently logged in user.
   */
  static get loggedInUser() {
    const result = JSON.parse(localStorage.getItem('LoggedIn'))
    const obj = result 
      ? new User({...result, payroll: new Payroll(result.payroll)}) : null

    return obj
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {null | User} User or null
   */
  static loginUser(email, password) {
    const db = new UserDB()
    const users = db.users

    const userFound = users.find(
      u => u.email === email && u.password === password
    )

    if (userFound) {
      localStorage.setItem('LoggedIn', JSON.stringify(userFound))
      location.reload()

      return userFound
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