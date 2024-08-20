"use client"
import React from 'react'
import logo from "../public/images/logo.png"
import Image from 'next/image'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
  // import "./ui"
  import { Label } from './ui/label'
  import { Input } from './ui/input'
import LoginToggle from './LoginToggle'
import { useRouter } from 'next/navigation'
const Header = () => {
  const router = useRouter();

    const schema = yup.object().shape({
        fullName: yup.string().required('FullName is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        address: yup.string().required('Address is required'),
        contactNumber: yup.string().required('Contact Number is required'),
        businessName: yup.string().required('Business Name is required'),
        businessType: yup.string().required('Business Type is required'),
      });
      
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: yupResolver(schema),
        });
      
        const onSubmit = (data) => {
            console.log(data);
          
            // Constructing the body object with explicit fields
            const bodyData = {
              fullName: data.fullName,
              email: data.email,
              password: data.password,
              address: data.address,
              contactNumber: data.contactNumber,
              businessName: data.businessName,
              businessType: data.businessType
            };
          
            fetch("http://localhost:8000/sellerUser/signUp", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(bodyData)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            })
            .then(data => {
              router.push("/seller")
              // console.log("data", data);
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
          };
          
          

  return (
    <div className='w-full flex flex-row justify-around items-start'>
        <div>
            <Image src={logo} alt="" className='w-full h-full' />
        </div>
        <div>
            <input type="text" name="" id="" placeholder='Search Item' />
        </div>

        <div>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Become A Seller</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Make Seller Account</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="name" className="text-right">
          FullName
        </Label>
        <Input
          id="name"
          {...register('fullName')}
          className="col-span-3"
        />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
      </div>
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
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="address" className="text-right">
          Address
        </Label>
        <Input
          id="address"
          {...register('address')}
          className="col-span-3"
        />
        {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="contactNumber" className="text-right">
          Contact Number
        </Label>
        <Input
          id="contactNumber"
          {...register('contactNumber')}
          className="col-span-3"
        />
        {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="businessName" className="text-right">
          Business Name
        </Label>
        <Input
          id="businessName"
          {...register('businessName')}
          className="col-span-3"
        />
        {errors.businessName && <span className="text-red-500 text-sm">{errors.businessName.message}</span>}
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="businessType" className="text-right">
          Business Type
        </Label>
        <Input
          id="businessType"
          {...register('businessType')}
          className="col-span-3"
        />
        {errors.businessType && <span className="text-red-500 text-sm">{errors.businessType.message}</span>}
      </div>
      <Button type="submit">
        Make Seller Account
      </Button>
    </form>
      </DialogContent>
    </Dialog>

    <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>    <Button variant="ghost">Become A Seller</Button></DialogTitle>
      <DialogDescription>
        <LoginToggle/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


            <Button variant={"ghost"}>Login</Button>
            <Button variant={"secondary"}>SignUp</Button>
        </div>
    </div>
  )
}

export default Header