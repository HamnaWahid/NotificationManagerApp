import { useState } from 'react';
import NotificationEdit from '../src/pages/NotificationEdit'; // Import the NewFormComponent
// import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';
// import LoginPage from './pages/Login/Login';
// import Loading from './common/Loading';
// import AppEdit from './pages/AppEdit';
// import EventEdit from './pages/EventEdit';

function App() {
  const [showForm, setShowForm] = useState(false); // State to control when to show the form

  const handleFormSubmit = (formData: unknown) => {
    // No specific action added here, you can leave it empty or add actions later
    console.log('Form Data:', formData);
    setShowForm(false); // Hide the form after submission
  };

  const handleFormCancel = () => {
    // No specific action added here, you can leave it empty or add actions later
    setShowForm(false); // Hide the form on cancel
  };

  return (
    <div className='App'>
      {/* <LoginPage /> */}
      {/* <Dashboard /> */}
      {/* <Loading /> */}
      <NotificationEdit
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
      {/* <AppEdit /> */}
      {/* <EventEdit /> */}
    </div>
  );
}

export default App;
