// FormStyles.ts

import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: #f5ebd6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border-radius: 20px;
  padding: 20px;
  width: 550px;
  box-shadow: 0px 0px 10px rgba(184, 34, 2, 0.7);

  /* Add more styles to the container as needed */

  /* Text field styles */
  .MuiOutlinedInput-root {
    border-radius: 20px;
  }

  /* Button styles */
  .submit-button {
    background-color: #cf482b;
    border-radius: 20px;
    color: white;
    margin-right: 100px;
  }

  .cancel-button {
    background-color: #585150;
    border-radius: 20px;
    color: white;
  }
  /* Add gap between buttons */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px; /* Add margin to create space between buttons */
  }
`;
