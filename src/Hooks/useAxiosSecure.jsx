import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth'

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { handleSignOut } = useAuth();
        axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(response => response, async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('access-token');
            await handleSignOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;