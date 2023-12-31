import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Styles, LeftBox, RightBox } from './Styles';
import sanitizeHtml from 'sanitize-html'; // Import sanitize-html

interface Props {
  onCancel: () => void;
  onSubmit: (formData: {
    name: string;
    subject: string;
    description: string;
    body: string;
  }) => void;
  message?: string;
}

const NotificationForm = ({ onCancel, onSubmit, message }: Props) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    // Update the preview text with sanitized HTML
    const sanitizedSubject = sanitizeHtml(subject, {
      allowedTags: [], // Allow no HTML tags
      allowedAttributes: {}, // Allow no HTML attributes
    });

    const previewText = ` <strong>${sanitizedSubject}</strong>\n\n${body}`;
    setPreview(previewText);
  }, [name, subject, description, body]);

  const handleSubmit = () => {
    onSubmit({ name, subject, description, body });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Grid container justifyContent='center' alignItems='center' height='93vh'>
      <Styles>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={12} md={6}>
            <LeftBox>
              {message && (
                <div className='message'>
                  <p
                    style={{
                      fontSize: '35px',
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: 'bold',
                    }}
                  >
                    {message}
                  </p>
                </div>
              )}
              <TextField
                label='Name'
                value={name}
                onChange={handleNameChange}
                fullWidth
                margin='normal'
                variant='outlined'
              />
              <TextField
                label='Subject'
                value={subject}
                onChange={handleSubjectChange}
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
              <TextField
                label='Body'
                value={body}
                onChange={handleBodyChange}
                fullWidth
                multiline
                rows={4}
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
                  style={{ marginLeft: '10px', backgroundColor: 'red' }}
                >
                  Cancel
                </Button>
              </div>
            </LeftBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <RightBox>
              <div className='preview-label-container'>
                <div className='preview-label'>PREVIEW</div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: preview }}
                style={{
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                }}
              ></div>
            </RightBox>
          </Grid>
        </Grid>
      </Styles>
    </Grid>
  );
};

export default NotificationForm;
