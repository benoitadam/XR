import React, {useState, createElement} from 'react';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import {Rnd} from 'react-rnd';
import {isArray} from 'core-js/library/fn/array';
import uuid from 'uuid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export default function FiendsPage() {
  const classes = useStyles();

  // const {t} = useTranslation();
  // const [size, setSize] = useState({width: 100, height: 100});
  // const [position, setPosition] = useState({x: 50, y: 50});

  return <div className={classes.root}>Recherche :</div>;
}
