import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Styles, LeftBox, RightBox } from './Styles';
import sanitizeHtml from 'sanitize-html'; // Import sanitize-html
import { MentionsInput, Mention } from 'react-mentions';
import './style.css';
import { useTags } from '../../containers/Tag'; // Assuming useTags is in the Tag file
import { useNotificationById } from '../../containers/NotificationGrid'; // Import the useNotificationById hook
import Loading from '../../common/Loading';

interface Tag {
  id: number;
  display: string;
}

const transformTags = (tags: string[]): Tag[] => {
  return tags.map((tag, index) => ({
    id: index + 1, // Assuming you want 1-based indexing for ids
    display: tag,
  }));
};

export interface PropsData {
  notificationName: string;
  templateSubject: string;
  notificationDescription: string;
  templateBody: string;
}

interface Props {
  data: PropsData | null;
  onCancel: () => void;
  onSubmit: (formData: PropsData) => void;
  message?: string;
  notificationId: string | number; // Add notificationId prop
  eventId?: string | number; // Add eventId prop
}

const NotificationForm = ({
  data,
  onCancel,
  onSubmit,
  message,
  notificationId,
  eventId,
}: Props) => {
  const { data: tagData, isLoading, isError } = useTags();
  const { data: notificationData, isLoading: notificationLoading } =
    useNotificationById(eventId, notificationId);

  let transformedTags: Tag[] = [];

  console.log('check undef', notificationData);

  if (tagData && tagData.tags) {
    transformedTags = transformTags(tagData.tags);
  }

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState('');
  const [nameError, setNameError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(validateLength(e.target.value, 3, 100));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setSubjectError(validateLength(e.target.value, 5, 100));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setDescriptionError(validateLength(e.target.value, 3, 200));
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const validateLength = (
    value: string,
    minLength: number,
    maxLength: number
  ) => {
    if (value.trim() === '') {
      return 'This field is required.';
    } else if (value.length < minLength || value.length > maxLength) {
      return `Length should be between ${minLength} and ${maxLength} characters.`;
    }
    return '';
  };

  useEffect(() => {
    // Update the preview text with sanitized HTML
    const sanitizedSubject = sanitizeHtml(subject, {
      allowedTags: [], // Allow no HTML tags
      allowedAttributes: {}, // Allow no HTML attributes
    });

    if (body || sanitizedSubject) {
      let b = body;

      if (!b) b = '';

      const previewText = `<strong>${sanitizedSubject}</strong>\n\n${b}`;
      setPreview(previewText);
    } else {
      setPreview('');
    }
  }, [name, subject, description, body]);

  useEffect(() => {
    if (data) {
      // If data is provided, populate the form fields
      setName(data.notificationName);
      setSubject(data.templateSubject);
      setDescription(data.notificationDescription);
      setBody(data.templateBody);
    } else if (!notificationLoading) {
      // If notification data is loaded and valid, populate the form fields
      if (notificationData) {
        setName(notificationData.name);
        setSubject(notificationData.subject);
        setDescription(notificationData.description);
        setBody(notificationData.body);
      } else {
        // If notificationData is undefined, set form fields to empty
        setName('');
        setSubject('');
        setDescription('');
        setBody('');
        setPreview('');
      }
    }
  }, [data, notificationLoading, notificationData]);

  const handleSubmit = () => {
    const nameError = validateLength(name, 3, 100);
    const subjectError = validateLength(subject, 5, 100);
    const descriptionError = validateLength(description, 3, 200);

    setNameError(nameError);
    setSubjectError(subjectError);
    setDescriptionError(descriptionError);

    if (!nameError && !subjectError && !descriptionError) {
      onSubmit({
        notificationName: name,
        templateSubject: subject,
        notificationDescription: description,
        templateBody: body,
      });
    }
  };

  const handleCancel = () => {
    onCancel();
  };
  if (isLoading) {
    return <Loading />;
  }

  if (isError || !tagData) {
    return <div>Error fetching tags</div>;
  }

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
                required
                error={!!nameError}
                helperText={nameError}
                inputProps={{
                  minLength: 3,
                  maxLength: 100,
                }}
              />
              <TextField
                label='Subject'
                value={subject}
                onChange={handleSubjectChange}
                fullWidth
                margin='normal'
                variant='outlined'
                required
                error={!!subjectError}
                helperText={subjectError}
                inputProps={{
                  minLength: 5,
                  maxLength: 100,
                }}
              />
              <TextField
                label='Description'
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                margin='normal'
                variant='outlined'
                required
                error={!!descriptionError}
                helperText={descriptionError}
                inputProps={{
                  minLength: 3,
                  maxLength: 200,
                }}
              />
              <MentionsInput
                customSuggestionsContainer={(highlightedDisplay) => (
                  <div
                    style={{
                      overflow: 'auto',
                      maxHeight: 200,
                      position: 'absolute',
                      zIndex: 1,
                    }}
                  >
                    {highlightedDisplay}
                  </div>
                )}
                className='custom-mentions-input'
                value={body}
                onChange={(e) => handleBodyChange(e)}
                placeholder='Body *'
              >
                <Mention
                  trigger='{'
                  data={transformedTags}
                  renderSuggestion={(
                    suggestion,
                    search,
                    highlightedDisplay
                  ) => (
                    <div className='custom-mention'>{highlightedDisplay}</div>
                  )}
                  displayTransform={(id, display) => `{${display}}`}
                  markup='{__display__}'
                />
              </MentionsInput>

              <div className='button-container'>
                <Button
                  variant='contained'
                  onClick={handleSubmit}
                  className='submit-button'
                  style={{
                    marginTop: '10px',
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant='contained'
                  onClick={handleCancel}
                  className='cancel-button'
                  style={{
                    marginLeft: '10px',
                    backgroundColor: 'red',
                    marginTop: '10px',
                  }}
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
              {preview !== '' && (
                <div
                  dangerouslySetInnerHTML={{ __html: preview }}
                  style={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                  }}
                ></div>
              )}
            </RightBox>
          </Grid>
        </Grid>
      </Styles>
    </Grid>
  );
};

export default NotificationForm;
