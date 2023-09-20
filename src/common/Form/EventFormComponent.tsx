import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';
import Grid from '@mui/material/Grid';
import { z } from 'zod';

const eventNameSchema = z.string().min(4).max(50);
const eventDescriptionSchema = z.string().min(4).max(50);

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEventName(newName);
    try {
      eventNameSchema.parse(newName); // Validate using Zod schema
      setNameError(false);
    } catch (error) {
      setNameError(true);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setEventDescription(newDescription);
    try {
      eventDescriptionSchema.parse(newDescription); // Validate using Zod schema
      setDescriptionError(false);
    } catch (error) {
      setDescriptionError(true);
    }
  };

  const handleSubmit = () => {
    try {
      eventNameSchema.parse(eventName);
      eventDescriptionSchema.parse(eventDescription);
      onSubmit({ eventName, eventDescription });
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
          label='Event Name'
          value={eventName}
          onChange={handleNameChange}
          fullWidth
          margin='normal'
          variant='outlined'
          required
          error={nameError}
          helperText={
            nameError ? 'Event Name should be between 3 and 50 characters' : ''
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
