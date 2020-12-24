import React from 'react';

import { NotificationContext } from './use-notification-context';

export const NotificationProvider = ({ children, onShowNotification }) => {
  const [notification, setNotification] = React.useState(null);

  const showNotification = (message) => {
    const msg = onShowNotification ? onShowNotification(message) : message;
    setNotification(msg);
  };

  const clearNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider
      value={{ showNotification, clearNotification, notification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
