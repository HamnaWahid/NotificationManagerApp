import FormComponent from '../common/Form/FormComponent';
import Paper from '@mui/material/Paper';

const AppEdit = () => {
  const handleFormSubmit = (formData: unknown) => {
    console.log('AppEdit/Add - Form Data:', formData);
  };

  const handleFormCancel = () => {
    console.log('AppEdit/Add - Form Cancelled');
  };

  return (
    <div>
      <Paper elevation={3}>
        <FormComponent
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          message='Add Event' // Pass the message prop
        />
      </Paper>
    </div>
  );
};

export default AppEdit;
