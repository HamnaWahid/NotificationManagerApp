import FormComponent from '../common/Form/FormComponent'; // Import the FormComponent
import Paper from '@mui/material/Paper'; // Import Paper component
import Typography from '@mui/material/Typography'; // Import Typography component

const EventEdit = () => {
  const handleFormSubmit = (formData: unknown) => {
    console.log('Page 1 - Form Data:', formData);
  };

  const handleFormCancel = () => {
    console.log('Page 1 - Form Cancelled');
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
          Add/Edit Event
        </Typography>
        <FormComponent
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Paper>
    </div>
  );
};

export default EventEdit;
