import LoginContainer from '../../containers/Login';
import './LoginStyles.css';

import LogoImage from '../../assets/logo-gosaas.png';

const LoginPage = () => {
  return (
    <div className='root'>
      <div className='logo'>
        <img src={LogoImage} alt='Logo' className='react' />
      </div>
      <div className='card'>
        <LoginContainer />
      </div>
    </div>
  );
};

export default LoginPage;
