import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Sidebar/Header';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';
import Login from './Pages/Dashboard/Login';
import SignUp from './Pages/SignUp';
import { MyContext } from './context/MyContext';

function App() {
  const [isSidebarOpen,setSidebarOpen] = useState(true);
  const [isLogin,setIsLogin] = useState(false);

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
      path: '/signup',
      exact:true,
      element:(
        <>
        <SignUp />
        </>
      ),
    }
  ]);

  const values = {
    isSidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin
  }

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  )
}

export default App;