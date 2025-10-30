import React, { use, useState } from 'react'
import { data } from 'react-router';

export default function Users({ userPromise }) {

    const initialUsers = use(userPromise);
    const [users, setUser] = useState(initialUsers)
    console.log(initialUsers);

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
            if(resData.insertedId) {
                newUser._id = resData.insertedId;

                const newUsers = [...users, newUser];
                setUser(newUsers)

                alert("user added successfylly")

            }
            e.target.reset();
        })
    }

    const handleRemoveUser = (id) => {
        console.log("delete a user", id)
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            console.log(`after delete data`, data);
            if(data.deletedCount) {
                const remainingUsers = users.filter(user => user._id != id);
                setUser(remainingUsers);
            }
        })
    }

  return (
    <div>
        <h4>Users : {users.length}</h4>
        <form onSubmit={handleAddUser}>
            <input type="text" name='name' id='' />
            <br />
            <input type="email" name='email' id=''/>
            <br />
            <input type="submit" value="Add User" />
        </form>
        <p>lizan..............</p>
        <div>
            {           
                users.map(user => <p key={user._id}>{user.name} == <button onClick={() => handleRemoveUser(user._id)}>X</button></p>)
            }
        </div>
    </div>
  ) 
}
