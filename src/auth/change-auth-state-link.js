import React from 'react';
import Link from '@material-ui/core/Link';
import { useAuthContext } from 'amplify-auth-hooks';

export const ChangeAuthStateLink = (props) => {
  const { label, newState, authData, ...rest } = props;

  const { handleStateChange } = useAuthContext();

  return (
    <Link
      href="#"
      onClick={(): void => handleStateChange(newState, authData)}
      variant="body2"
      {...rest}
    >
      {label}
    </Link>
  );
};
