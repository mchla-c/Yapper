import React from 'react';
import { Button } from '@mui/material';

export const containerStyle = {
    width: 'calc(100% - 60px)',
    maxWidth: '1410px',
    padding: '0 20px',
    margin: '20px auto',
    borderRadius: '16px',
    marginTop: 5
  };

export const cardStyle = { 
  borderRadius: '17px', 
  border: '1px solid #79747E',  
  boxShadow: 3,
}

export const CustomButton = ({ children, variant = 'contained', ...props }) => {
  return (
    <Button
      variant={variant}
      color="primary"
      sx={{
        width: '160px', 
        color: 'white', 
        borderRadius: '17px', 
        boxShadow: 2,
        padding: 1.2,
        // border: '1px solid #1E1E1E',
        textTransform: 'none', // Prevent uppercase transformation
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
