import { ReactNode } from 'react';
import AppNavbar from '../common/AppBar';
import Footer from '../common/Footer';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AppNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default Wrapper;
