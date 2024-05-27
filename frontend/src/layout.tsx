import { Outlet } from 'react-router-dom';
import Navbar from './components/nav-bar/nav-bar';

const Layout = () => {
  return (
    <div className='min-w-[22rem]'>
      <Navbar />
      <main className='flex flex-col items-center'>
        <div className='w-full max-w-5xl p-4'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
