import React, { useState, useEffect } from 'react';
import {
    Search,
    Menu,
    X,
    Facebook,
    Twitter,
    Instagram,
    Dribbble,
    ChevronUp
} from 'lucide-react';
import axiosClient from '../../api/axiosClient.js';
import { useNavigate } from 'react-router-dom';

export default function Blogs() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getBlogs = async () => {
        const response = await axiosClient.get('/public/blogs');
        setBlogs(response.data);
    };

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        getBlogs();
    }, []);

    const getFilterBlogs = () => {
        setTimeout(async () => {
            try {
                const response = await axiosClient.get(`/public/blogs?filter=${searchTerm}`);
                setBlogs(response.data);
            } catch (error) {
                console.error(error);
            }
        }, 1000);
    };

    useEffect(() => {
        if (!searchTerm.trim()) return;
        getFilterBlogs();
    }, [searchTerm]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Subscribed with: ' + email);
        setEmail('');
    };

    const selectBlog = async (article) => {
        try {
            const response = await axiosClient.get(`/public/blogs/${article.id}`);
            const blog = response.data;
            const slug = blog.title.toLowerCase().replace(/\s+/g, '-');
            navigate(`/${slug}`, { state: { blog } });
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins">
            {/* Google Font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 font-medium">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <a href="#" className="text-2xl font-bold text-blue-700">
                            Calvin
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {['Home', 'Categories', 'Blog', 'Styles', 'About', 'Contact'].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                )
                            )}
                        </nav>

                        {/* Search & Menu */}
                        <div className="flex items-center space-x-4 relative" style={{ left: '126px' }}>
                            {/* Search field (absolute, won’t shift layout) */}
                            {isSearchOpen && (
                                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                                    <div
                                        className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm px-3 py-1.5 transition-all duration-300">
                                        <input
                                            type="text"
                                            placeholder="Search blogs..."
                                            className="w-56 text-sm text-gray-700 outline-none bg-transparent"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                setSearchTerm('');
                                            }}
                                            className="text-gray-500 hover:text-red-500 ml-2 cursor-pointer"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Search Icon */}
                            {!isSearchOpen && (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    <Search size={20} />
                                </button>
                            )}

                            {/* Mobile Menu */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="md:hidden text-gray-700 hover:text-blue-600"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="relative h-[80vh] mt-20 bg-[url('/assets/images/bg-image.jpg')] bg-cover bg-center flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:bg-black/60"
            >
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight">
                        From Code to Creativity
                    </h1>
                    <p className="text-gray-200 mt-4 text-lg max-w-2xl">
                        Discover stories, insights, and journeys that inspire innovation and imagination.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
                        Latest Articles
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {
                            blogs.map((article) => (
                                <article
                                    onClick={() => selectBlog(article)}
                                    key={article.id}
                                    className="rounded-2xl hover:shadow-xl cursor-pointer"
                                >
                                    <div className="relative h-64 overflow-hidden rounded-xl">
                                        <img
                                            src={article.image_path}
                                            alt={article.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <b className="text-sm">Business, Technology</b>{' '}
                                        <span className="text-sm text-gray-500">
                                            —{' '}
                                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>

                                        <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                            {article.title}
                                        </h3>

                                        <p
                                            className="text-gray-600 text-xs leading-relaxed mb-5 line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: article.description
                                            }}
                                        ></p>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">
                                                By <strong>{article.author}</strong>
                                            </span>
                                            <button
                                                onClick={() => selectBlog(article)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                                            >
                                                Read More →
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h5 className="text-white font-bold mb-4">About Our Site</h5>
                        <p className="text-sm leading-relaxed">
                            Explore creative insights and stories shaping modern development,
                            design, and innovation.
                        </p>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-sm">
                            {['About Us', 'Blog', 'FAQ', 'Terms', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4">Follow Us</h5>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Dribbble].map((Icon, idx) => (
                                <a key={idx} href="#" className="hover:text-blue-400">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-4">Newsletter</h5>
                        <p className="text-sm mb-4">
                            Get updates on new posts, interviews, and insights.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                className="px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-blue-600"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} TASKFLOW by{' '}
                    <a href="https://github.com/osamanisar-dev" target={'_blank'} className="text-blue-500 hover:text-blue-400">
                        Osama Nisar
                    </a>
                    .
                    <button
                        onClick={scrollToTop}
                        className="ml-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <ChevronUp size={18} />
                    </button>
                </div>
            </footer>
        </div>
    );
}
