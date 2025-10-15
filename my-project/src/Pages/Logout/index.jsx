import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const Logout = () => {
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await postData("/api/user/logout", {});
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        context.setIsLogin(false);
        context.alertBox("success", "Logout successful");
        setTimeout(() => {
          history("/login");
        }, 1500);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        context.setIsLogin(false);
        context.alertBox("error", "Logout failed, but you've been signed out");
        setTimeout(() => {
          history("/login");
        }, 1500);
      }
    };

    handleLogout();
  }, [context, history]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl">Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;