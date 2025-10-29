// @ts-ignore
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login.jsx';
import Signup from '../pages/signup.jsx';
import Home from '../pages/Home.jsx';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute.jsx';
import Blogs from '../pages/public/Blogs.jsx';
import SelectedBlog from '../pages/public/SelectedBlog.jsx';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/login'} element={<PublicRoute><Login /></PublicRoute>} />
            <Route path={'/signup'} element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path={'/'} element={<Blogs />} />
            <Route path={'/blogs'} element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path={'/:slug'} element={<SelectedBlog />} />
        </Routes>
    );
};
export default AppRoutes;
