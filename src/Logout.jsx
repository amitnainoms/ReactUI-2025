import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('loggedInUser');
        navigate('/', { state: { loggedOut: true } });
    }, [navigate]);

    return null;
}