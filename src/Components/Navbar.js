import React from 'react';
import 'D:/React/schedule-app/src/App.css';

function Navbar() {
  return (
    <nav className='w-full h-12 bg-blue-gray-800 flex justify-between items-center px-6'>
      <div className='flex items-center '>
        <img className='h-10 w-10' src='logo.png' alt='To Do App Logo' />
        <div className='flex float-end '>
        <h2 className='ml-3 text-2xl text-white'>To Do App</h2>
        </div>
      </div>
    </nav>   
  );
}
export default Navbar;
