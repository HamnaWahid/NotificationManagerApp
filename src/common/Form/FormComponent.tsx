import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';

interface FormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: { name: string; description: string }) => void;
  message?: string;
  title?: string;
  initialName?: string;
  initialDescription?: string;
}

const FormComponent = ({
  onCancel,
  onSubmit,
  title,
  initialName,
  initialDescription,
}: FormComponentProps) => {
  const [name, setName] = useState(initialName || '');
  const [description, setDescription] = useState(initialDescription || '');

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
    <Grid container justifyContent='center' alignItems='center'>
      <FormContainer>
        {title && (
          <div className='message'>
            <p
              style={{
                fontSize: '35px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
              }}
            >
              {title}
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
