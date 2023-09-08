import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';

interface FormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: { name: string; description: string }) => void;
  message?: string; // New prop for displaying a message
}

const FormComponent = ({ onCancel, onSubmit, message }: FormComponentProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ name, description });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Grid container justifyContent='center' alignItems='center' height='93vh'>
      <FormContainer>
        {message && (
          <div className='message'>
            <p
              style={{
                fontSize: '35px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
              }}
            >
              {message}
            </p>
          </div>
        )}
        <TextField
          label='Name'
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin='normal'
          variant='outlined'
        />
        <TextField
          label='Description'
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          margin='normal'
          variant='outlined'
        />
        <div className='button-container'>
          <Button
            variant='contained'
            onClick={handleSubmit}
            className='submit-button'
          >
            Submit
          </Button>
          <Button
            variant='contained'
            onClick={handleCancel}
            className='cancel-button'
            style={{ marginLeft: '10px', backgroundColor: 'red' }}
          >
            Cancel
          </Button>
        </div>
      </FormContainer>
    </Grid>
  );
};

export default FormComponent;
