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
  const [notificationName, setName] = useState(initialName || '');
  const [notificationDescription, setDescription] = useState(
    initialDescription || ''
  );
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName.trim() === ''); // Check if name is empty
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setDescriptionError(newDescription.trim() === ''); // Check if description is empty
  };

  const handleSubmit = () => {
    if (
      notificationName.trim() === '' ||
      notificationDescription.trim() === ''
    ) {
      // If either field is empty, set error states
      setNameError(notificationName.trim() === '');
      setDescriptionError(notificationDescription.trim() === '');
    } else {
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
          required // Make the field required
          error={nameError}
          helperText={nameError ? 'Name is required' : ''}
        />
        <TextField
          label='Notification Description'
          value={notificationDescription}
          onChange={handleDescriptionChange}
          fullWidth
          margin='normal'
          variant='outlined'
          multiline // Allow multiline input
          rows={4}
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

export default NotificationFormComponent;
