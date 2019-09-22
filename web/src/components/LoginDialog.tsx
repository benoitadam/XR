import React, {useState} from 'react';
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import api from '../services/api';

const useStyles = makeStyles(theme => ({
  dialog: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export function LoginForm() {
  const classes = useStyles();
  const {t} = useTranslation();
  const [username, setUsername] = useState('vegone');
  const [password, setPassword] = useState('_brhpbr1234');

  function handleClick() {
    api.logIn(username, password);
  }

  return (
    <form className={classes.form}>
      <TextField
        className={classes.input}
        label={t('Login_Username')}
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        className={classes.input}
        label={t('Login_Password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      {t('Login_RememberMe')}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {t('Login_Button')}
      </Button>
    </form>
  );
}

export default function LoginDialog() {
  const classes = useStyles();
  const {t} = useTranslation();
  const auth = api.useAuth();

  return (
    <Dialog className={classes.dialog} open={auth.isAuthenticated}>
      <DialogTitle>{t('Login_Title')}</DialogTitle>
      <LoginForm />
    </Dialog>
  );
}
