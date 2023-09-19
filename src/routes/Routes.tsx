import { Routes, Route } from "react-router-dom";
import Wrapper from "../HOC/Wrapper";
import LoginPage from "../pages/Login/Login";
import AddApp from "../pages/AddApp";
import EventEdit from "../pages/EditEvent";
import AddEvent from "../pages/AddEvent";
import NotificationEdit from "../pages/EditNotification";
import AddNotification from "../pages/AddNotification";

import Index from "../pages/Dashboard";
import YourComponent from "../containers/tagFetchTest";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/tags" element={<YourComponent />} />

      <Route
        path="/Dashboard"
        element={
          <Wrapper>
            <Index />
          </Wrapper>
        }
      />
      <Route
        path="/AddApp"
        element={
          <Wrapper>
            <AddApp />
          </Wrapper>
        }
      />
      <Route
        path="/AddEvent"
        element={
          <Wrapper>
            <AddEvent />
          </Wrapper>
        }
      />

      <Route
        path="/EditEvent"
        element={
          <Wrapper>
            <EventEdit />
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
      <Route
        path="/add-notification/:eventId"
        element={
          <Wrapper>
            <AddNotification />
          </Wrapper>
        }
      />
    </Routes>
  );
}

export default App;
