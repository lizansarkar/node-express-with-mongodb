import React from 'react'

export default function Users() {

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email)

        const newUser = {name, email}

        fetch("http://localhost:3000/users", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(resData => {
            console.log('after saving user', resData)
        })
    }
  return (
    <div>
        <form onSubmit={handleAddUser}>
            <input type="text" name='name' id='' />
            <br />
            <input type="email" name='email' id=''/>
            <br />
            <input type="submit" value="Add User" />
        </form>
    </div>
  )
}
