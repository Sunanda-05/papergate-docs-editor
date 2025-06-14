"use client"

import { useLoginMutation } from '@/hooks/auth'
import React from 'react'

const LoginPage = () => {

    const {mutate: login} = useLoginMutation()
    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        const form = e.currentTarget;
        
    // const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    // const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        login({
            email: "testuser1@example.com", password: "1234"
        })
    }
  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' name='email'/>
            <input type='password' name='password'/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default LoginPage