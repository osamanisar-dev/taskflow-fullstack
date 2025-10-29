// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTimes,
    faTrashAlt,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';
import { Controller, useForm } from 'react-hook-form';
import axiosClient from '../api/axiosClient.js';
import { toast } from 'react-toastify';

const Home = () => {
    const [expandedBlogs, setExpandedBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [blogs, setBlogs] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [newBlog, setNewBlog] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState('');

    // React Hook Form
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm();

    const getBlogs = async () => {
        const response = await axiosClient.get('/blogs');
        setBlogs(response.data);
    };

    useEffect(() => {
        getBlogs();
    }, []);

    // ======= MODAL HANDLERS =======
    const openAddModal = () => {
        setOpenModal(true);
        reset({
            title: '',
            description: ''
        });
        setNewBlog(true);
        setTimeout(() => setAnimateModal(true), 20);
    };

    const openUpdateModal = (blog) => {
        setOpenModal(true);

        reset({
            title: blog.title,
            description: blog.description
        });
        setSelectedBlogId(blog.id);
        setTimeout(() => setAnimateModal(true), 20);
    };

    const openDeleteModal = (blog) => {
        setSelectedBlog(blog);
        setIsDeleteModalOpen(true);
        reset({
            title: blog.title
        });
        setTimeout(() => setAnimateModal(true), 20);
    };

    const closeModals = () => {
        reset();
        setOpenModal(false);
        setNewBlog(false);
        setIsDeleteModalOpen(false);
        setAnimateModal(false);
    };

    // ======= FORM HANDLERS =======
    const handleAddBlog = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        try {
            await axiosClient.post('/blogs', formData);
            await getBlogs();
            toast.success('Blog created successfully!');
        } catch (error) {
            let message = 'Something went wrong!';
            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            toast.error(message);
        }

        closeModals();
    };

    const handleUpdateBlog = async (blog) => {
        try {
            const formData = new FormData();
            formData.append('title', blog.title);
            formData.append('description', blog.description);
            formData.append('_method', 'PUT');
            const response = await axiosClient.post(`/blogs/${selectedBlogId}`, formData);
            closeModals();
            toast.success('Blog Updated Successfully!');
            getBlogs();
        } catch (error) {
            let message = 'Something went wrong!';
            if (error.response?.data?.message) {
                message = error.response.data.message;
            }

            toast.error(message);
        }
    };

    const deleteBlog = async (blogId) => {
        try {
            const response = await axiosClient.delete(`/blogs/${blogId}`);
            closeModals();
            toast.success(response.data.message);
            getBlogs();
        } catch (error) {
            let message = 'Something went wrong!';
            if (error.response?.data?.message) {
                message = error.response.data.message;
            }
            toast.error(message);
        }
    };

    const toggleExpand = (id) => {
        setExpandedBlogs((prev) =>
            prev.includes(id)
                ? prev.filter((blogId) => blogId !== id)
                : [...prev, id]
        );
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-br bg-blue-100 min-h-screen py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* ======= HEADER ======= */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
                            📚 Latest Blogs
                        </h1>
                        <button
                            onClick={openAddModal}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Add New Blog
                        </button>
                    </div>

                    {/* ======= BLOG LIST ======= */}
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border border-gray-100"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>

                                    <div className="relative">
                                        <div
                                            className={`text-gray-600 text-sm mb-4 transition-all duration-300 overflow-hidden ${
                                                expandedBlogs.includes(blog.id) ? 'max-h-full' : 'max-h-24'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: blog.description }}
                                        ></div>

                                        {!expandedBlogs.includes(blog.id) && blog.description.length > 150 && (
                                            <div
                                                className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent flex items-center justify-center pointer-events-none">
                                                <button
                                                    onClick={() => toggleExpand(blog.id)}
                                                    className="text-blue-600 text-sm hover:underline bg-white px-2 pointer-events-auto"
                                                >
                                                    Read More
                                                </button>
                                            </div>
                                        )}

                                        {expandedBlogs.includes(blog.id) && (
                                            <button
                                                onClick={() => toggleExpand(blog.id)}
                                                className="text-blue-600 text-sm hover:underline mt-2"
                                            >
                                                Read Less
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                                    <p className="text-gray-400 text-sm">Added on: {blog.created_ago}</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openUpdateModal(blog)}
                                            className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                                            title="Edit Blog"
                                        >
                                            <FontAwesomeIcon icon={faEdit} size="lg" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(blog)}
                                            className="text-red-500 hover:text-red-700 transition cursor-pointer"
                                            title="Delete Blog"
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>

            {/* ======= ADD BLOG MODAL ======= */}
            {
                openModal && (
                    <div
                        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
                            animateModal
                                ? 'bg-black/40 backdrop-blur-sm'
                                : 'bg-transparent'
                        }`}
                    >
                        <div
                            className={`bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative transform transition-all duration-300 ${
                                animateModal
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 -translate-y-10 scale-95'
                            }`}
                        >
                            <button
                                onClick={closeModals}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>

                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                {newBlog ? 'Add New Blog' : 'Update Blog'}
                            </h2>

                            <form onSubmit={handleSubmit(newBlog ? handleAddBlog : handleUpdateBlog)}>
                                {/* Title Field */}
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    {...register('title', { required: true })}
                                    className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mb-2">Title is required.</p>
                                )}

                                {/* Image Upload Field */}
                                {newBlog &&
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Upload Featured Image
                                        </label>
                                        <input
                                            type="file"
                                            {...register('image', { required: true })}
                                            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        {errors.image && (
                                            <p className="text-red-500 text-sm mt-2">Image is required.</p>
                                        )}
                                    </div>
                                }
                                {/* TinyMCE with React Hook Form Controller */}
                                <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                                    <Controller
                                        name="description"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Description is required.' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Editor
                                                apiKey="iexj481dio2u17wu2dv18g61ws0tldcxewaglu4gp4eeqkwc"
                                                value={value || ''}
                                                onEditorChange={onChange}
                                                init={{
                                                    height: 300,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist',
                                                        'autolink',
                                                        'lists',
                                                        'link',
                                                        'charmap',
                                                        'preview',
                                                        'anchor',
                                                        'searchreplace',
                                                        'visualblocks',
                                                        'code',
                                                        'fullscreen',
                                                        'insertdatetime',
                                                        'media',
                                                        'table',
                                                        'help',
                                                        'wordcount'
                                                    ],
                                                    toolbar:
                                                        'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link | removeformat',
                                                    content_style:
                                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding:10px; }'
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full cursor-pointer"
                                >
                                    {newBlog ? 'Add Blog' : 'Save Changes'}
                                </button>
                            </form>

                        </div>
                    </div>
                )}

            {/* ======= DELETE MODAL ======= */}
            {isDeleteModalOpen && (
                <div
                    className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
                        animateModal
                            ? 'bg-black/40 backdrop-blur-sm'
                            : 'bg-transparent'
                    }`}
                >
                    <div
                        className={`bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center relative transform transition-all duration-300 ${
                            animateModal
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-10 scale-95'
                        }`}
                    >
                        <button
                            onClick={closeModals}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>

                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            Delete Blog
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold">
                                {selectedBlog.title}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={closeModals}
                                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteBlog(selectedBlog.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
