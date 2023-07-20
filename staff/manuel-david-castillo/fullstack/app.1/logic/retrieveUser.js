function retrieveUser(userId) {
  validateId(userId)

  return fetch('http://localhost:9000/users', {
    headers: {
      Authorization: `Bearer ${userId}`
    }
  })
  .then((res) => {
    if(res.status === 200) {
      return res.json()
      .then((body)=> {
        const user = body
        
        return user
      })
    } else if(res.status === 400) {
      return res.json()
      .then((body)=> {
        throw new Error(body.error)
      })
    }
  })
}