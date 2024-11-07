import React from 'react';
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider from './redux';

const DashboardLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div className='flex in-h-screen w-full bg-gray-50 text-gray-900'>
        {/* Sidebar */}
        <Sidebar />
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64`}>
        {/* Navbar*/ }
        <Navbar />
        {children}
        </main>
    </div>
  );
};

const DashboardWrapper = ({ children }:{children:React.ReactNode}) => {
  return (
    <StoreProvider>
    <DashboardLayout>
      {children}
    </DashboardLayout>
    </StoreProvider>  
  );
};

export default DashboardWrapper