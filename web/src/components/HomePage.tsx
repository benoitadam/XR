import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const {t} = useTranslation();

  return <div className={classes.root}>{t('HomePage')}</div>;
}
