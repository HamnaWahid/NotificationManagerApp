import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';

const EventFormComponent = ({
  onCancel,
  onSubmit,
  title,
  initialName,
  initialDescription,
}: EventFormComponentProps) => {
  const [eventName, setEventName] = useState(initialName || '');
  const [eventDescription, setEventDescription] = useState(
    initialDescription || ''
  );
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [nameRequiredError, setNameRequiredError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEventName(newName);
    validateName(newName);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setEventDescription(newDescription);
    validateDescription(newDescription);
  };

  const validateName = (name: string) => {
    setNameError(name.length < 3 || name.length > 50);
    setNameRequiredError(name.length === 0);
  };

  const validateDescription = (description: string) => {
    setDescriptionError(description.length < 3 || description.length > 50);
  };

  const handleSubmit = () => {
    // Validate before submitting
    validateName(eventName);
    validateDescription(eventDescription);

    if (!nameError && !descriptionError && !nameRequiredError) {
      onSubmit({ eventName, eventDescription });
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
          label='Event Name'
          value={eventName}
          onChange={handleNameChange}
          fullWidth
          margin='normal'
          variant='outlined'
          required
          error={nameError || nameRequiredError}
          helperText={
            nameRequiredError
              ? 'Event Name is required'
              : nameError
              ? 'Event Name should be between 3 and 50 characters'
              : ''
          }
          inputProps={{
            maxLength: 50,
          }}
        />
        <TextField
          label='Event Description'
          value={eventDescription}
          onChange={handleDescriptionChange}
          fullWidth
          margin='normal'
          multiline
          rows={4}
          variant='outlined'
          required
          error={descriptionError}
          helperText={
            descriptionError
              ? 'Event Description should be between 3 and 50 characters'
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

export default EventFormComponent;
