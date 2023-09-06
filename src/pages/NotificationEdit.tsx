import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormContainer } from '../common/Form/FormStyles';

interface NewFormComponentProps {
  onCancel: () => void;
  onSubmit: (formData: { name: string; body: string; subject: string }) => void;
}

const NotificationEdit = ({ onCancel, onSubmit }: NewFormComponentProps) => {
  const [formData, setFormData] = useState({
    name: '',
    body: '',
    subject: '',
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <FormContainer>
      <TextField
        label='Name'
        value={formData.name}
        onChange={(e) => handleFieldChange('name', e.target.value)}
        fullWidth
        margin='normal'
        variant='outlined'
      />
      <TextField
        label='Body'
        value={formData.body}
        onChange={(e) => handleFieldChange('body', e.target.value)}
        fullWidth
        margin='normal'
        variant='outlined'
        multiline
        rows={6}
      />
      <TextField
        label='Subject'
        value={formData.subject}
        onChange={(e) => handleFieldChange('subject', e.target.value)}
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
      {/* Live Preview */}
      <div className='live-preview'>
        <p>Preview:</p>
        <pre>{formData.body}</pre>
      </div>
    </FormContainer>
  );
};

export default NotificationEdit;
