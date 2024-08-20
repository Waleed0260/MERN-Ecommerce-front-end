import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../lib/auth'
import AddProducts from "../../Components/seller/AddProducts"
import ShowProducts from "../../Components/seller/ShowProducts"

const page = async() => {
    const session = await getServerSession(authOptions)
    if (!session) return <p>Access Denied</p>
  return (
    <>
    <ShowProducts/>
    </>
  )
}

export default page