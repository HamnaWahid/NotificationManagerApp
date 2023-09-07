import { Routes, Route } from 'react-router-dom';
import Wrapper from '../HOC/Wrapper';
import LoginPage from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AppEdit from '../pages/AppEdit';
import EventEdit from '../pages/EventEdit';
import NotificationEdit from '../pages/NotificationEdit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route
        path='/Dashboard'
        element={
          <Wrapper>
            <Dashboard />
          </Wrapper>
        }
      />
      <Route
        path='/EditApp'
        element={
          <Wrapper>
            <AppEdit />
          </Wrapper>
        }
      />
      <Route
        path='/EditEvent'
        element={
          <Wrapper>
            <EventEdit />
          </Wrapper>
        }
      />
      <Route
        path='/EditNotification'
        element={
          <Wrapper>
            <NotificationEdit />
          </Wrapper>
        }
      />
    </Routes>
  );
}

export default App;
