import React from 'react'
import { useLoaderData } from 'react-router'

export default function UpdateUser() {
    const user = useLoaderData();
    console.log(user)

    const handleEdit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email)

        const updateUser = {name, email}
        fetch(`http://localhost:3000/users/${user._id}`, {
          method: "PATCH",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(updateUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log('data', data)

          if(data.modifiedCound) {
            alert('user info updated')
          }
        })
    }
  return (
    <div>
        <div>edit a user</div>
        <form onSubmit={handleEdit}>
            <input type="text" name='name' id='' defaultValue={user.name}/>
            <br />
            <input type="email" name='email' id='' defaultValue={user.email}/>
            <br />
            <input type="submit" value="update user" />
        </form>
    </div>
  )
}
