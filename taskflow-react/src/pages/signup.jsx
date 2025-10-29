// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import axiosClient from '../api/axiosClient.js';

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const [confirmPassIconSetVisibility, setConfirmPassIconVisibility] = useState(false);
    const [passwordIconVisibility, setPasswordIconVisibility] = useState(false);
    const navigate = useNavigate()

    const password = watch("password");
    // @ts-ignore
    const onSubmit = async (data) => {
        // @ts-ignore
        // const BaseURL = import.meta.env.VITE_API_BASE_URL
        try {
            const response = await axiosClient.post('/auth/register',data)
            data = response.data
            console.log(data.data.token);
            // @ts-ignore
            localStorage.setItem('token', data.data.token)
            localStorage.setItem('user', JSON.stringify(data.data.user))
            setTimeout(()=>navigate('/blogs'),1500)

            toast.success("User registered successfully!");
        } catch (error) {
            const message =
                !(error.response?.data?.data && typeof error.response.data.data === 'object')
                    ? error.response?.data?.message || 'Something went wrong!'
                    : Object.values(error.response.data.data)?.[0]?.[0];
            toast.error(message);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-[url('/assets/images/bg-image.jpg')] bg-cover bg-center h-screen flex items-center justify-start pl-[12%] px-4 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-50">
                <div className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg  lg:-translate-x-16">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up!</h2>
                        <p className="text-gray-700 mb-6">Please create an account</p>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                    Full Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="name" placeholder="Full Name" {...register("name", { required: "The name field is required", })} />
                                {errors.name && (<span className="text-sm text-red-500">{errors.name.message}</span>)}
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="email" placeholder="Email Address" {...register("email", { required: "The email field is required", pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    } })} />
                                {errors.email && (<span className="text-sm text-red-500">{errors.email.message}</span>)}
                            </div>
                            <div className="mb-6 relative">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password" type={passwordIconVisibility ? 'text': 'password'} placeholder="Password" {...register('password',
                                    {
                                        required: 'The password field is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long'
                                        },
                                        validate: {
                                            hasUpperCase: (value) =>
                                                /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                            hasLowerCase: (value) =>
                                                /[a-z]/.test(value) || 'Password must contain at least one lowercase letter'
                                        }
                                    })}
                                />
                                {!passwordIconVisibility && <FontAwesomeIcon icon={faEyeSlash} className={'w-5 h-5 absolute right-3 top-11 text-gray-500 cursor-pointer'} onClick={() => setPasswordIconVisibility(!passwordIconVisibility)}/>}

                                {passwordIconVisibility && <FontAwesomeIcon icon={faEye} className={'w-5 h-5 absolute right-3 top-11 text-gray-500 cursor-pointer'} onClick={() => setPasswordIconVisibility(!passwordIconVisibility)}/>}

                                {errors.password && (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>)}
                            </div>

                            <div className="mb-6 relative">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                    Confirm Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password" type={confirmPassIconSetVisibility ? 'text': 'password'}
                                    placeholder="Password" {...register('confirm_password',
                                    {
                                        required: 'The confirm password field is required',
                                        validate: (value) =>
                                            value === password || 'Passwords do not match'
                                    })} />
                                {!confirmPassIconSetVisibility && <FontAwesomeIcon icon={faEyeSlash} className={'w-5 h-5 absolute right-3 top-11 text-gray-500 cursor-pointer'} onClick={()=> setConfirmPassIconVisibility(!confirmPassIconSetVisibility)}/>}

                                {confirmPassIconSetVisibility && <FontAwesomeIcon icon={faEye} className={'w-5 h-5 absolute right-3 top-11 text-gray-500 cursor-pointer'} onClick={() => setConfirmPassIconVisibility(!confirmPassIconSetVisibility)}/>}

                                {errors.confirm_password && (
                                    <span className="text-sm text-red-500">{errors.confirm_password.message}</span>)}
                            </div>


                            <div className="flex items-center justify-between">
                                <button disabled={isSubmitting}
                                    className={`${isSubmitting ? 'bg-blue-400':'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                    type="submit">
                                    {isSubmitting ? 'Sign Up ...':'Sign Up'}
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500 py-5">Already have an account?
                                <NavLink to={'/login'}
                                   className="font-semibold text-blue-600 hover:underline focus:text-blue-800 focus:outline-none">Sign
                                    In
                                </NavLink>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;
