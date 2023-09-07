import FormComponent from '../common/Form/FormComponent'; // Import the FormComponent
import Paper from '@mui/material/Paper'; // Import Paper component
import Typography from '@mui/material/Typography'; // Import Typography component

const AppEdit = () => {
  const handleFormSubmit = (formData: unknown) => {
    console.log('AppEdit/Add - Form Data:', formData);
  };

  const handleFormCancel = () => {
    console.log('AppEdit/Add - Form Cancelled');
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: '10px',
          backgroundColor: 'rgba(245, 235, 214, 0.8)', // Increase opacity by reducing the alpha value
          borderRadius: '15px', // Add rounded edges
        }}
      >
        <Typography
          variant='h4'
          style={{
            backgroundColor: 'rgba(245, 235, 214, 0.8)', // Increase opacity by reducing the alpha value
            color: '#cf482b',
            padding: '10px',
            borderRadius: '15px',
          }}
        >
          Add/Edit Application
        </Typography>
        <FormComponent
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Paper>
    </div>
  );
};

export default AppEdit;
