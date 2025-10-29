// @ts-ignore
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { toast, ToastContainer } from 'react-toastify';
import axiosClient from '../api/axiosClient.js';

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const navigate = useNavigate()
    const [passwordIconVisibility, setPasswordIconVisibility] = useState(false);
    // @ts-ignore
    const onSubmit = async (data) => {
        // @ts-ignore
        // const BaseURL = import.meta.env.VITE_API_BASE_URL
        try {
            // vedu@mailinator.com
            const response = await axiosClient.post('/auth/login',data)
            data = response.data
            // @ts-ignore
            localStorage.setItem('token', data.data.token)
            localStorage.setItem('user', JSON.stringify(data.data.user))
            setTimeout(()=>navigate('/blogs'),1500)

            toast.success("Logged In successfully!");
        }catch (error) {
            console.log('Error response:', error.response?.data);
            let message = 'Something went wrong!';
            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            console.log('Toast message:', message);
            toast.error(message);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-[url('/assets/images/bg-image.jpg')] bg-cover bg-center h-screen flex items-center justify-start pl-[12%] px-4 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-50">
                <div className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg  lg:-translate-x-16">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                        <p className="text-gray-700 mb-6">Please sign in to your account</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="email"
                                    placeholder="Email Address" {...register("email", { required: "The email field is required", pattern: {
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
                                    id="password" type={passwordIconVisibility ? 'text': 'password'}
                                    placeholder="Password" {...register("password", { required: "The password field is required", })} />

                                {!passwordIconVisibility && <FontAwesomeIcon icon={faEyeSlash} className={'w-5 h-5 absolute right-3 top-11 text-gray-500 cursor-pointer'} onClick={() => setPasswordIconVisibility(!passwordIconVisibility)}/>}

                                {passwordIconVisibility && <FontAwesomeIcon icon={faEye} className={'w-5 h-5 absolute right-3 top-11 text-gray-500 cursor-pointer'} onClick={() => setPasswordIconVisibility(!passwordIconVisibility)}/>}

                                {errors.password && (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>)}
                            </div>
                            <div className="flex items-center justify-between">
                                <button disabled={isSubmitting}
                                        className={`${isSubmitting ? 'bg-blue-400':'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                        type="submit">
                                    {isSubmitting ? 'Sign Up ...':'Sign Up'}
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500 py-5">Don&#x27;t have an account yet?
                                <NavLink to={'/signup'}
                                   className="font-semibold text-blue-600 hover:underline focus:text-blue-800 focus:outline-none">Sign
                                    up
                                </NavLink>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
