import React from 'react';

function createNamedContext(name, defaultValue) {
  const context = React.createContext(defaultValue);
  context.displayName = name;

  return context;
}

export const NotificationContext = createNamedContext('Notification', null);

export const useNotificationContext = () =>
  React.useContext(NotificationContext);
