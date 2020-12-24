import React from 'react';

import { Toast } from '../ui';
import { useNotificationContext } from './use-notification-context';

export const Notification = ({ autoHideDuration, className }) => {
  const { notification, clearNotification } = useNotificationContext();

  const handleClose = (_event?, reason?): void => {
    if (reason === 'clickaway') {
      return;
    }
    clearNotification();
  };

  return (
    <Toast
      autoHideDuration={autoHideDuration}
      className={className}
      {...notification}
      open={!!notification}
      onClose={handleClose}
    />
  );
};
