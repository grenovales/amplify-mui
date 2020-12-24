import React from 'react';
import Container from '@material-ui/core/Container';

export const FormContainer = ({ children }) => {
  return <Container maxWidth="xs">{children}</Container>;
};
