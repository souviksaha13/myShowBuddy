import { SignIn } from '@clerk/clerk-react'
import React from 'react'

// when user is not logged in and tries to access the admin page, redirect the user to signin page 
// (as of now from clerk but later may be we use some other )
const Signin = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <SignIn fallbackRedirectUrl={'/admin'} />
    </div>
  )
}

export default Signin