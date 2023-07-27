import {validateId, validateUrl, validateText, validateName} from './helpers/validators'

export function editUser(userId, name, image, description) {
  validateId(userId)
  validateName(name)
  validateUrl(image)
  validateText(description)

 return fetch(`http://localhost:8000/users`,{
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${userId}`,
    "Content-Type": "application/json"},
  body: JSON.stringify({name, image, description})
})
  .then((res)=> {
    if(res.status === 200) {
      return
    } else if (res.status === 400) {
      return res.json()
        .then((body) => {
          throw new Error(body.error)
        })
    }
  })
}