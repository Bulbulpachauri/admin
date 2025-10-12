import './App.css';
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Sidebar/Header';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';
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



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const [isSidebarOpen,setSidebarOpen] = useState(true);
  const [isLogin,setIsLogin] = useState(false);

  const [isOpenFullScreenPanel,setIsOpenFullScreenPanel] = useState({
    open:false,
    model:'',
  });

  const handleClose = () => {
    setIsOpenFullScreenPanel({
      open:false,
      model:'',
    });
  };

  const router = createBrowserRouter([
    {
      path: '/',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/Login',
      exact:true,
      element:(
        <>
        <Login />
        </>
      ),
    },
    {
      path: '/sign-in',
      exact:true,
      element:(
        <>
        <Login />
        </>
      ),
    },
    {
      path: '/sign-up',
      exact:true,
      element:(
        <>
        <SignUp />
        </>
      ),
    },
    {
      path: '/products',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/homeSlider/list',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
     {
      path: '/category/list',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/product/upload',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/home-slider',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/categories',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/product/:id/edit',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/home-slider/add',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/categories/add',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/categories/add',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/forgot-password',
      exact:true,
      element:(
        <>
        <ForgotPassword />
        </>
      ),
    },
    {
      path: '/verify-account',
      exact:true,
      element:(
        <>
        <VerifyAccount />
        </>
      ),
    },
    {
      path: '/change-password',
      exact:true,
      element:(
        <>
        <ChangePassword />
        </>
      ),
    },
    {
      path: '/categories/subCat',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/categories/subCat/add',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/users',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
    {
      path: '/orders',
      exact:true,
      element:(
        <>
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
        </>
      ),
    },
  ]);

  const values = {
    isSidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
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
            
      </Dialog>

    </MyContext.Provider>
  );
};

export default App;
export {MyContext};