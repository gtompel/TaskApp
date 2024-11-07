'use client';
import React,{ useState } from 'react';
import Image from 'next/image';
import { LockIcon } from 'lucide-react';


const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white w-64`

  return (
    <div className={sidebarClassNames}>
        <div className='flex h-10[100%] w-full flex-col justify-start'>
            {/* TOP LOGO  */}
            <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
                <div className='text-xl font-vold text-gray-800 dark:text-white'>
                    LIST MANAGER
                </div>
            </div>
            {/* TEAM */ }
            <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                <Image src="/logo.png" alt="logo" width={40} height={40} priority/>
            <div>
                <h3 className='text-md font-bold tracking-widest dark:text-gray-200'>KOMP TEAM</h3>
                <div className='mt-1 flex items-center gap-2' >
                    <LockIcon className='mt-[01.rem] h-3 w-3 text-gray-500 dark:text-gray-400' />
                    <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>Private</p>
                </div>
            </div>
            </div>
            {/* NAVBAR LINKS */}
            <div className='flex flex-col gap-4 px-8 py-4'>
                </div>
        </div>
    </div>
  )
}

export default Sidebar