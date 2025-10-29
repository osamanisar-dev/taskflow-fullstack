// @ts-ignore
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { useForm } from 'react-hook-form';
import axiosClient from '../api/axiosClient.js';
import { toast } from 'react-toastify';

const TodoList = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            // vedu@mailinator.com
            const response = await axiosClient.post('/create-todo',data)
            data = response.data
            console.log(data.data.token);
            // @ts-ignore
            localStorage.setItem('token', data.data.token)
            localStorage.setItem('user', JSON.stringify(data.data.user))
            setTimeout(()=>navigate('/'),1500)

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
            <Navbar />
            <div className="bg-purple-100 flex items-center justify-center min-h-screen">
                <div
                    className="bg-white/50 backdrop-blur-md shadow-md border border-purple-200 rounded-2xl w-full max-w-md p-8">
                    <h1 className="text-2xl font-semibold text-center text-purple-800 mb-6">
                        Manage your todos at one place
                    </h1>

                    <div className="mb-6 relative">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="todo" className="block text-gray-700 font-medium mb-2">Add a Todo</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                id="todo"
                                placeholder="Enter your todo..."
                                className="flex-1 border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                {...register('todo',{required:'The todo desc field is required'})}
                            />
                            <button type={'submit'}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                                Save
                            </button>
                        </div>
                            {errors.todo && (<span className="text-sm text-red-500">{errors.todo.message}</span>)}
                        </form>
                    </div>

                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="showFinished" className="mr-2 accent-purple-600" />
                        <label htmlFor="showFinished" className="text-gray-700">Show Finished</label>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Todos</h2>

                        <div className="space-y-3">


                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-purple-600" />
                                    <span className="text-gray-600">My new item</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="text-purple-600 hover:text-purple-800">
                                        <svg className="w-6 h-6" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                            />
                                            <path
                                                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                            />
                                        </svg>

                                    </button>
                                    <button className="text-purple-600 hover:text-purple-800">
                                        <svg className="w-6 h-6" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             fill="currentColor"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                            />
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TodoList;
