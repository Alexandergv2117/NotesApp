import { Outlet } from 'react-router-dom';
import Navbar from './components/nav-bar/nav-bar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;