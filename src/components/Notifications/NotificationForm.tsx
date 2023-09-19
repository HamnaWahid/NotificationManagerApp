import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Styles, LeftBox, RightBox } from "./Styles";
import sanitizeHtml from "sanitize-html"; // Import sanitize-html
import { MentionsInput, Mention } from "react-mentions";
import "./style.css";
import { useTags } from "../../containers/Tag"; // Assuming useTags is in the Tag file
import { useNotificationById } from "../../containers/NotificationGrid"; // Import the useNotificationById hook

// import { TagSharp } from '@mui/icons-material';

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

  if (tagData && tagData.tags) {
    transformedTags = transformTags(tagData.tags);
    console.log(transformedTags);
  }

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState("");

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

    const previewText = `<strong>${sanitizedSubject}</strong>\n\n${body}`;
    setPreview(previewText);
  }, [name, subject, description, body]);

  useEffect(() => {
    if (data) {
      // If data is provided, populate the form fields
      setName(data.notificationName);
      setSubject(data.templateSubject);
      setDescription(data.notificationDescription);
      setBody(data.templateBody);
    } else if (!notificationLoading && notificationData) {
      // If notification data is loaded, populate the form fields
      setName(notificationData.name);
      setSubject(notificationData.subject);
      setDescription(notificationData.description);
      setBody(notificationData.body);
    }
  }, [data, notificationLoading, notificationData]);

  const handleSubmit = () => {
    onSubmit({
      notificationName: name,
      templateSubject: subject,
      notificationDescription: description,
      templateBody: body,
    });
  };

  const handleCancel = () => {
    onCancel();
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !tagData) {
    return <div>Error fetching tags</div>;
  }
  return (
    <Grid container justifyContent="center" alignItems="center" height="93vh">
      <Styles>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <LeftBox>
              {message && (
                <div className="message">
                  <p
                    style={{
                      fontSize: "35px",
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {message}
                  </p>
                </div>
              )}
              <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Subject"
                value={subject}
                onChange={handleSubjectChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <MentionsInput
                className="custom-mentions-input"
                value={body}
                onChange={(e) => handleBodyChange(e)}
                placeholder="Body"
              >
                <Mention
                  trigger="{"
                  data={transformedTags}
                  renderSuggestion={(
                    suggestion,
                    search,
                    highlightedDisplay
                  ) => (
                    <div className="custom-mention ">{highlightedDisplay}</div>
                  )}
                  displayTransform={(id, display) => `{${display}}`}
                  markup="{__display__}"
                />
              </MentionsInput>
              <div className="button-container">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  className="submit-button"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCancel}
                  className="cancel-button"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    marginTop: "10px",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </LeftBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <RightBox>
              <div className="preview-label-container">
                <div className="preview-label">PREVIEW</div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: preview }}
                style={{
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
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
