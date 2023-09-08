import { ReactNode } from 'react';
import AppNavbar from '../common/AppBar';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  );
};

export default Wrapper;
