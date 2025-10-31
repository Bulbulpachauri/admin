import './App.css';
import React from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Sidebar/Header';
import Sidebar from './Components/Sidebar';
import { useState, useEffect } from 'react';
import Login from './Pages/Dashboard/Login';
import SignUp from './Pages/SignUp';
import { MyContext } from './context/MyContext';
import Products from './Pages/Products';
import AddProduct from './Pages/Products/addProduct';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from 'react-icons/io';
import Slide from '@mui/material/Slide';
import HomeSliderBanners from './Pages/HomeSliderBanners';
import AddHomeSlider from './Pages/HomeSliderBanners/addHomeSlider';
import CategoryList from './Pages/Categegory';
import AddCategory from './Pages/Categegory/addCategory';
import SubCategory from './Pages/Categegory/subCategory';
import AddSubCategory from './Pages/Categegory/addSubCategory.jsx';
import Users from './Pages/Users';
import Order from './Pages/Orders';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyAccount from './Pages/VerifyAccount/index.jsx';
import ChangePassword from './Pages/ChangePassword';
import ResetPassword from './Pages/ResetPassword';
import Profile from './Pages/Profile';
import AddAddress from './Pages/Address/addAddress.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isSidebarOpen,setSidebarOpen] = useState(true);
  const [isLogin,setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    return token ? children : <Navigate to="/login" replace />;
  };

  const [isOpenFullScreenPanel,setIsOpenFullScreenPanel] = useState({
    open:false,
    model:'',
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <Dashboard />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/sign-in',
      element: <Login />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    {
      path: '/products',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <Products />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/homeSlider/list',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
     {
      path: '/category/list',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <CategoryList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/product/upload',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <AddProduct />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/home-slider',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <CategoryList />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/product/:id/edit',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <AddProduct />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/home-slider/add',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <AddHomeSlider />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories/add',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <AddCategory />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/verify-account',
      element: <VerifyAccount />
    },
    {
      path: '/change-password',
      element: <ChangePassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/categories/subCat',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <SubCategory />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories/subCat/add',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <AddSubCategory />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/users',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <Users />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
    {
      path: '/orders',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <Order />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
     {
      path: '/profile',
      element:(
        <ProtectedRoute>
          <section className='main'>
            <Header/>
            <div className="contentMain flex">
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
                <Sidebar/>
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[80%]' : 'w-[82%]'}`}>
                <Profile />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      ),
    },
  ]);

  const alertBox = (type, msg) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLogin(false);
    alertBox('success', 'Logged out successfully');
  };

  const values = {
    isSidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,
    logout,
  }

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

       <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={()=>setIsOpenFullScreenPanel({
          open:false,
          model:'',
        })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setIsOpenFullScreenPanel({
                open:false,
              })}
              aria-label="close"
            >
              <IoMdClose className='text-gray-800' />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className='text-gray-800'>{isOpenFullScreenPanel?.model}</span>
            </Typography>
            
          </Toolbar>
        </AppBar>

        {
          isOpenFullScreenPanel?.model==='Add Product' && 
            <AddProduct />     
            }

            {
              isOpenFullScreenPanel?.model==='Add Home Slide' && 
              <AddHomeSlider />     
            }

            {
              isOpenFullScreenPanel?.model==='Add New Category' && 
              <AddCategory />     
            }

            {
              isOpenFullScreenPanel?.model==='Add New Sub Category' && 
              <AddSubCategory />     
            }

             {
              isOpenFullScreenPanel?.model==='Add New Address' && 
              <AddAddress />     
            }
            
      </Dialog>

      <Toaster />
    </MyContext.Provider>
  );
};

export default App;
export {MyContext};