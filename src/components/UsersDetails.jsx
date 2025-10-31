import React from 'react'
import { useLoaderData } from 'react-router'

export default function UsersDetails() {
    const user = useLoaderData()
    console.log(user)
  return (
    <div>UsersDetails</div>
  )
}
