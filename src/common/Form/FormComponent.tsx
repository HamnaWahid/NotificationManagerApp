import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from './FormStyles';

interface FormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: { name: string; description: string }) => void;
}

const FormComponent = ({ onCancel, onSubmit }: FormComponentProps) => {
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
    <FormContainer>
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
        >
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
};

export default FormComponent;
