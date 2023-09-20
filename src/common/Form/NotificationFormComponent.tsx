import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';
import { z } from 'zod';

const notificationNameSchema = z.string().min(4).max(50);
const notificationDescriptionSchema = z.string().min(4).max(50);

interface NotificationFormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: {
    notificationName: string;
    notificationDescription: string;
  }) => void;
  message?: string;
  title?: string;
  initialName?: string;
  initialDescription?: string;
}

const NotificationFormComponent = ({
  onCancel,
  onSubmit,
  title,
  initialName,
  initialDescription,
}: NotificationFormComponentProps) => {
  const [notificationName, setNotificationName] = useState(initialName || '');
  const [notificationDescription, setNotificationDescription] = useState(
    initialDescription || ''
  );
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNotificationName(newName);
    try {
      notificationNameSchema.parse(newName); // Validate using Zod schema
      setNameError(false);
    } catch (error) {
      setNameError(true);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setNotificationDescription(newDescription);
    try {
      notificationDescriptionSchema.parse(newDescription); // Validate using Zod schema
      setDescriptionError(false);
    } catch (error) {
      setDescriptionError(true);
    }
  };

  const handleSubmit = () => {
    try {
      notificationNameSchema.parse(notificationName);
      notificationDescriptionSchema.parse(notificationDescription);
      // Additionally, you can validate templateSubject and templateBody here if needed
      onSubmit({ notificationName, notificationDescription });
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
          label='Notification Name'
          value={notificationName}
          onChange={handleNameChange}
          fullWidth
          margin='normal'
          variant='outlined'
          required
          error={nameError}
          helperText={
            nameError
              ? 'Notification Name should be between 4 and 50 characters'
              : ''
          }
          inputProps={{
            maxLength: 100,
          }}
        />
        <TextField
          label='Notification Description'
          value={notificationDescription}
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
              ? 'Notification Description should be between 4 and 50 characters'
              : ''
          }
          inputProps={{
            maxLength: 200,
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

export default NotificationFormComponent;
