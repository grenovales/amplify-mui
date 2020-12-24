import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    box: {}
  })
);

export const SectionBody = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.box}>{children}</Box>;
};
