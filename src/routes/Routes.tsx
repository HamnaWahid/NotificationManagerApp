import { Routes, Route } from 'react-router-dom';
import Wrapper from '../HOC/Wrapper';
import LoginPage from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AppEdit from '../pages/EditApp';
import AddApp from '../pages/AddApp';
import EventEdit from '../pages/EditEvent';
import AddEvent from '../pages/AddEvent';
import NotificationEdit from '../pages/NotificationEdit';
import Loading from '../common/Loading';

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
        path='/AddApp'
        element={
          <Wrapper>
            <AddApp />
          </Wrapper>
        }
      />
      <Route
        path='/AddEvent'
        element={
          <Wrapper>
            <AddEvent />
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
      />{' '}
      <Route
        path='/Loading'
        element={
          <Wrapper>
            <Loading />
          </Wrapper>
        }
      />
    </Routes>
  );
}

export default App;
