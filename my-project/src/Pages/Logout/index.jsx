import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { fatchDataFromApi } from '../../utils/api';

const Logout = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fatchDataFromApi("/api/user/logout");
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        context.setIsLogin(false);
        context.openAlertBox("success", "Logged out successfully");
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        context.setIsLogin(false);
        navigate('/');
      }
    };

    handleLogout();
  }, [context, navigate]);

  return null;
};

export default Logout;