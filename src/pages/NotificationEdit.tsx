import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';

const NotificationEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    body: '',
    subject: '',
  });

  const [previewText, setPreviewText] = useState('');

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
    if (fieldName === 'body') {
      setPreviewText(value);
    }
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Box>
        <TextField
          label='Name'
          value={formData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          fullWidth
          variant='outlined'
          margin='normal'
        />
        <TextField
          label='Subject'
          value={formData.subject}
          onChange={(e) => handleFieldChange('subject', e.target.value)}
          fullWidth
          variant='outlined'
          margin='normal'
        />
        <TextField
          label='Body'
          value={formData.body}
          onChange={(e) => handleFieldChange('body', e.target.value)}
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          margin='normal'
        />
      </Box>
      <Box>
        <TextField
          label='Preview'
          value={previewText}
          fullWidth
          margin='normal'
          variant='outlined'
          multiline
          rows={6}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <div className='button-container'>
        <Button variant='contained' fullWidth className='submit-button'>
          Submit
        </Button>
        <Button variant='contained' fullWidth className='cancel-button'>
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default NotificationEdit;
