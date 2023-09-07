import AppNavbar from '../common/AppBar';

const Wrapper = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  );
};

export default Wrapper;
