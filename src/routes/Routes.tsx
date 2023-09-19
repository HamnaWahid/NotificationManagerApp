import { Routes, Route } from "react-router-dom";
import Wrapper from "../HOC/Wrapper";
import LoginPage from "../pages/Login/Login";
import NotificationEdit from "../pages/EditNotification";
import AddNotification from "../pages/AddNotification";
import Index from "../pages/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/Dashboard"
        element={
          <Wrapper>
            <Index />
          </Wrapper>
        }
      />

      <Route
        path="/add-notification/:eventId"
        element={
          <Wrapper>
            <AddNotification />
          </Wrapper>
        }
      />
      <Route
        path="/edit-notification/:eventId/:notifId"
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
