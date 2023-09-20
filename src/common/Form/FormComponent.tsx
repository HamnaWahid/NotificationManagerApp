import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';
import { z } from 'zod';

const appNameSchema = z.string().min(4).max(50);
const appDescriptionSchema = z.string().min(4).max(50);

interface FormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: { appName: string; appDescription: string }) => void;
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
  const [appName, setAppName] = useState(initialName || '');
  const [appDescription, setAppDescription] = useState(
    initialDescription || ''
  );
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setAppName(newName);
    try {
      appNameSchema.parse(newName); // Validate using Zod schema
      setNameError(false);
    } catch (error) {
      setNameError(true);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setAppDescription(newDescription);
    try {
      appDescriptionSchema.parse(newDescription); // Validate using Zod schema
      setDescriptionError(false);
    } catch (error) {
      setDescriptionError(true);
    }
  };

  const handleSubmit = () => {
    try {
      appNameSchema.parse(appName);
      appDescriptionSchema.parse(appDescription);
      onSubmit({ appName, appDescription });
    } catch (error) {
      // Handle validation errors
      console.error('Validation error:', error.errors);
    }
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
          value={appName}
          onChange={handleNameChange}
          fullWidth
          margin='normal'
          variant='outlined'
          required
          error={nameError}
          helperText={
            nameError ? 'Name should be between 4 and 50 characters' : ''
          }
          inputProps={{
            maxLength: 50,
          }}
        />
        <TextField
          label='Description'
          value={appDescription}
          onChange={handleDescriptionChange}
          fullWidth
          margin='normal'
          variant='outlined'
          multiline
          rows={4}
          required
          error={descriptionError}
          helperText={
            descriptionError
              ? 'Description should be between 4 and 50 characters'
              : ''
          }
          inputProps={{
            maxLength: 50,
          }}
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
