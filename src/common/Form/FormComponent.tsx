import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';

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
  const [appName, setName] = useState(initialName || '');
  const [appDescription, setDescription] = useState(initialDescription || '');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName.trim().length < 3 || newName.trim().length > 50);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setDescriptionError(
      newDescription.trim().length < 3 || newDescription.trim().length > 50
    );
  };

  const handleSubmit = () => {
    if (appName.trim() === '' || appDescription.trim() === '') {
      // If either field is empty, set error states
      setNameError(appName.trim() === '');
      setDescriptionError(appDescription.trim() === '');
    } else {
      onSubmit({ appName, appDescription });
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
          required // Make the field required
          error={nameError}
          helperText={nameError ? 'Name is required' : ''}
        />
        <TextField
          label='Description'
          value={appDescription}
          onChange={handleDescriptionChange}
          fullWidth
          margin='normal'
          variant='outlined'
          multiline // Allow multiline input
          rows={4} // Set the number of rows for multiline
          required // Make the field required
          error={descriptionError}
          helperText={descriptionError ? 'Description is required' : ''}
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
