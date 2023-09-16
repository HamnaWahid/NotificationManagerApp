import styled from 'styled-components';

export const Styles = styled.div`
  display: flex; /* Use flex to arrange the boxes side by side */
  justify-content: space-between; /* Add space between the boxes */
  gap: 20px; /* Add some gap between the boxes */
  padding: 20px; /* Move padding to the container */
`;

/* Style for the existing box (left box) */
export const LeftBox = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  width: 400px; /* You can adjust the width as needed */
`;

/* Style for the new box (right box) */
export const RightBox = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 400px;
  height: 547px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;

  .preview-label-container {
    display: flex;
    justify-content: center;
  }

  .preview-label {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

