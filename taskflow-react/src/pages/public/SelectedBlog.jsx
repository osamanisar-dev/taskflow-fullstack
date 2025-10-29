import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MessageCircle, Send } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

export default function BlogPostPage() {
    const location = useLocation();
    const blog = location.state?.blog;
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'Sarah Johnson',
            avatar: 'SJ',
            date: '2 days ago',
            text: 'This is an excellent post! The insights you\'ve shared are really valuable. I particularly enjoyed the section about modern web design principles.'
        },
        {
            id: 2,
            author: 'Mike Chen',
            avatar: 'MC',
            date: '3 days ago',
            text: 'Great breakdown of the topic. Would love to see more content like this in the future.'
        },
        {
            id: 3,
            author: 'Emma Wilson',
            avatar: 'EW',
            date: '4 days ago',
            text: 'The photography in this article is stunning! Really adds to the overall experience.'
        }
    ]);

    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = () => {
        if (newComment.name && newComment.message) {
            setComments([...comments, {
                id: comments.length + 1,
                author: newComment.name,
                avatar: newComment.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                date: 'Just now',
                text: newComment.message
            }]);
            setNewComment({ name: '', email: '', message: '' });
        }
    };

    useEffect(() => {
        console.log(blog);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">Cakrio.</div>
                    <nav className="hidden md:flex space-x-8 text-sm">
                        <a href="#" className="hover:text-gray-600">Home</a>
                        <a href="#" className="hover:text-gray-600">Categories</a>
                        <a href="#" className="hover:text-gray-600">Buy</a>
                        <a href="#" className="hover:text-gray-600">Write</a>
                        <a href="#" className="hover:text-gray-600">About</a>
                        <a href="#" className="hover:text-gray-600">Contact</a>
                    </nav>
                    <button className="text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Hero Image */}
            <div className="max-w-4xl mx-auto px-4 mt-8">
                <div
                    className="w-full h-full md:h-130 bg-gradient-to-br from-green-900 to-green-700 rounded-lg overflow-hidden">
                    <img
                        src={blog.image_path}
                        alt="Nature"
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Article Content */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8">
                            {blog.title}
                        </h1>

                        {/* Author Info */}
                        <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
                            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                                    alt="Author"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-semibold">Rosalina William</div>
                                <div className="text-sm text-gray-600">UI/UX Designer and Developer</div>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    April 7, 2022
                  </span>
                                    <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    2 min read
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Article Text */}
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.description }}>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold mb-8">{comments.length} Comments</h3>

                            <div className="space-y-6 mb-12">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex space-x-4 pb-6 border-b border-gray-200">
                                        <div
                                            className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700">
                                            {comment.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold">{comment.author}</span>
                                                <span className="text-xs text-gray-500">
                          <button className="text-gray-400 hover:text-gray-600">Reply</button>
                        </span>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                                            <span
                                                className="text-xs text-gray-500 mt-2 inline-block">{comment.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Comment Form */}
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h4 className="text-xl font-bold mb-6">Add Comment</h4>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            type="text"
                                            placeholder="Name *"
                                            value={newComment.name}
                                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email *"
                                            value={newComment.email}
                                            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Message *"
                                        value={newComment.message}
                                        onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-900 mb-4"
                                    ></textarea>
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800 transition flex items-center space-x-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>Post Comment</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-8">
                            {/* About Me */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="font-bold mb-4">About Me</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Hi there! I'm a passionate writer and designer sharing insights about web
                                    development and creative design.
                                </p>
                            </div>

                            {/* Popular Posts */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="font-bold mb-4">Popular Posts</h4>
                                <div className="space-y-4">
                                    <a href="#" className="block text-sm hover:text-gray-600">
                                        A Practical Guide to Modern Web Design
                                    </a>
                                    <a href="#" className="block text-sm hover:text-gray-600">
                                        Understanding CSS Grid Layout
                                    </a>
                                    <a href="#" className="block text-sm hover:text-gray-600">
                                        The Future of JavaScript Frameworks
                                    </a>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gray-900 text-white p-6 rounded-lg">
                                <h4 className="font-bold mb-3">Stay Up To Date</h4>
                                <p className="text-sm text-gray-300 mb-4">
                                    Subscribe to get updates on new content.
                                </p>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 rounded mb-3 text-gray-900"
                                />
                                <button
                                    className="w-full bg-white text-gray-900 py-2 rounded font-semibold hover:bg-gray-100 transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-20">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h5 className="font-bold mb-4">About Cakrio</h5>
                            <p className="text-sm text-gray-400">
                                A modern blog platform for sharing ideas and stories.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Home</a></li>
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Categories</h5>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Design</a></li>
                                <li><a href="#" className="hover:text-white">Development</a></li>
                                <li><a href="#" className="hover:text-white">Photography</a></li>
                                <li><a href="#" className="hover:text-white">Lifestyle</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Stay Up To Date</h5>
                            <p className="text-sm text-gray-400 mb-4">
                                Subscribe to our newsletter for updates.
                            </p>
                            <button
                                className="w-full bg-white text-gray-900 py-2 rounded font-semibold hover:bg-gray-100 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        © 2025 Cakrio. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
