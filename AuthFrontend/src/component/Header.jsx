import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout =() => {
        axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true })
            .then((res) => {
                toast("Logout Successful");
                console.log("User data logout success", res);
            })
            .catch((err) => {
                console.log("Error while logout", err);
            })
        navigate('/login');
    }
    return (
        <div className='border border-b border-gray-400 h-12 flex items-center space-x-5'>
            <Link to= '/'>Home</Link>
            <Link to= '/login'>Login</Link>
            <Link to= '/profile'>Profile</Link>
            <Link to= '/register'>Register</Link>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Header;