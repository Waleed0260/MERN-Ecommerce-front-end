"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
import {signIn} from "next-auth/react"

const LoginToggle = () => {
  // const router = useRouter("useRouter")
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      });
      
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: yupResolver(schema),
        });
      
        const onSubmit = async(data) => {
          // e.preventDefault();
          const email = data.email
          const password = data.password
          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          console.log(result);
          };
  return (
    <>
     <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          {...register('email')}
          className="col-span-3"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          className="col-span-3"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>
      <Button type="submit" >Submit</Button>
      </form>
    </>
  )
}

export default LoginToggle