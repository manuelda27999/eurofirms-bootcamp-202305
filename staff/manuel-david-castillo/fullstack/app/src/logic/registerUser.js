import {validateName, validateEmail, validatePassword} from './helpers/validators'

export const registerUser = function (name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  return fetch('http://localhost:9000/users', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name , email, password}),
  })
  .then((res) => {
    if(res.status === 201) {
      return
    } else if(res.status === 400) {
      return res.json()
      .then((body)=> {
        throw new Error(body.error)
      })
    }
  })
};