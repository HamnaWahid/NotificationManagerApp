import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';

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
    validateName(newName);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setNotificationDescription(newDescription);
    validateDescription(newDescription);
  };

  const validateName = (name: string) => {
    setNameError(name.trim() === '' || name.length < 3 || name.length > 50);
  };

  const validateDescription = (description: string) => {
    setDescriptionError(
      description.trim() === '' ||
        description.length < 3 ||
        description.length > 50
    );
  };

  const handleSubmit = () => {
    // Validate before submitting
    validateName(notificationName);
    validateDescription(notificationDescription);

    if (!nameError && !descriptionError) {
      onSubmit({ notificationName, notificationDescription });
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
              ? notificationName.trim() === ''
                ? 'Notification Name is required'
                : 'Notification Name should be between 3 and 50 characters'
              : ''
          }
          inputProps={{
            maxLength: 50,
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
              ? notificationDescription.trim() === ''
                ? 'Notification Description is required'
                : 'Notification Description should be between 3 and 50 characters'
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
