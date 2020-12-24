import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useAuthContext, useVerifyContact } from 'amplify-auth-hooks';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import { RadioGroup, TextField } from 'formik-material-ui';

import { FormSection, SectionHeader, SectionBody, SectionFooter } from '../ui';
import { useNotificationContext } from '../notification';
import { ChangeAuthStateLink } from './change-auth-state-link';

const logger = new Logger('VerifyContact');

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

export const VerifyContact = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotificationContext();
  const { authData } = useAuthContext();
  const { verifyAttr, verify, submit } = useVerifyContact();

  const renderSkipLinkPanel = (): React.ReactElement => (
    <Grid container>
      <Grid item>
        <ChangeAuthStateLink
          label={formatMessage({
            id: 'verifyContact.links.skip',
            defaultMessage: 'Skip'
          })}
          newState="signedIn"
          authData={authData}
        />
      </Grid>
    </Grid>
  );

  const renderSectionHeader = () => (
    <SectionHeader>
      <FormattedMessage
        id="verifyContact.header"
        defaultMessage="Account recovery requires verified contact information"
      />
    </SectionHeader>
  );

  const verifyView = () => {
    const { unverified } = authData;
    if (!unverified) {
      logger.debug('no unverified on user');
      return null;
    }

    const { email, phone_number: phoneNumber } = unverified;

    return (
      <Formik
        initialValues={{
          contact: ''
        }}
        key="verify-contract-verify-form"
        onSubmit={async ({ contact }) => {
          try {
            await verify(contact);
          } catch (error) {
            const content = formatMessage({
              id: `verifyContact.errors.${error.code}`,
              defaultMessage: error.message
            });
            showNotification({ content, variant: 'error' });
          }
        }}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <FormSection>
            {renderSectionHeader()}
            <Form className={classes.form} onSubmit={handleSubmit}>
              <SectionBody>
                <Field
                  name="contact"
                  label="Radio Group"
                  component={RadioGroup}
                >
                  {email && (
                    <FormControlLabel
                      value="email"
                      control={<Radio disabled={isSubmitting} />}
                      label={formatMessage({
                        id: 'global.labels.email',
                        defaultMessage: 'Email'
                      })}
                      disabled={isSubmitting}
                    />
                  )}
                  {phoneNumber && (
                    <FormControlLabel
                      value="phoneNumber"
                      control={<Radio disabled={isSubmitting} />}
                      label={formatMessage({
                        id: 'global.labels.phoneNumber',
                        defaultMessage: 'Phone Number'
                      })}
                      disabled={isSubmitting}
                    />
                  )}
                </Field>
              </SectionBody>
              <SectionFooter>
                <Button
                  disabled={!isValid}
                  type="submit"
                  className={classes.submit}
                >
                  <FormattedMessage
                    id="verifyContact.buttons.verify"
                    defaultMessage="Verify"
                  />
                </Button>
                {renderSkipLinkPanel()}
              </SectionFooter>
            </Form>
          </FormSection>
        )}
      </Formik>
    );
  };

  const submitView = (): React.ReactElement => (
    <Formik
      initialValues={{
        code: ''
      }}
      key="verify-contract-submit-form"
      onSubmit={async ({ code }) => {
        try {
          await submit(code);
        } catch (error) {
          const content = formatMessage({
            id: `verifyContact.errors.${error.code}`,
            defaultMessage: error.message
          });
          showNotification({ content, variant: 'error' });
        }
      }}
    >
      {({ handleSubmit, isValid }) => (
        <FormSection>
          {renderSectionHeader()}
          <Form className={classes.form} onSubmit={handleSubmit}>
            <SectionBody>
              <Field
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="code"
                label={formatMessage({
                  id: 'global.labels.code',
                  defaultMessage: 'Code'
                })}
                name="code"
                autoComplete="code"
                autoFocus
                component={TextField}
              />
            </SectionBody>
            <SectionFooter>
              <Button
                disabled={!isValid}
                type="submit"
                className={classes.submit}
              >
                <FormattedMessage
                  id="verifyContact.buttons.submit"
                  defaultMessage="Submit"
                />
              </Button>
              {renderSkipLinkPanel()}
            </SectionFooter>
          </Form>
        </FormSection>
      )}
    </Formik>
  );

  return verifyAttr ? submitView() : verifyView();
};
