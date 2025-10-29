import { Navigate } from 'react-router-dom';


export default function PublicRoute({children}){
    const isAuthenticated = !!localStorage.getItem('token')
    return isAuthenticated ? <Navigate to="/blogs" /> : children ;
}
