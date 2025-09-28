import React, { useContext } from 'react';
import Header from '../Sidebar/Header';
import Sidebar from '../Sidebar';
import { MyContext } from '../../context/MyContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isSidebarOpen } = useContext(MyContext);

  return (
    <section className='main relative'>
      <Header />
      <div className="contentMain flex">
        <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all fixed top-0 left-0 h-full`}>
          <Sidebar />
        </div>
        <div className={`contentRight py-4 px-5 ${isSidebarOpen ? 'w-[82%] ml-[18%]' : 'w-full'}`}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Layout;