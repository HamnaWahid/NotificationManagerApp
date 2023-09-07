import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <CircularProgress style={{ animation: 'rotation 2s infinite linear' }} />
      <style>
        {`
          @keyframes rotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
