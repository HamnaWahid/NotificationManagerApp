import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  text-align: center;
  color: red;
  margin: auto;
  padding: 20px;
`;

const ErrorPage: React.FC = () => {
  return (
    <ErrorContainer>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </ErrorContainer>
  );
};

export default ErrorPage;
