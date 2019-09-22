import React, {useRef, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#353535',
    textDecoration: 'none',
    '& .MuiListItem-gutters': {
      padding: '0 8px',
    },
  },
  activated: {
    '& .MuiListItemIcon-root': {
      color: theme.palette.secondary.main, //"#c42128" //"#ef9e23"
    },
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
  },
}));

export default function AppLink({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon?: JSX.Element;
}) {
  const classes = useStyles({});

  return (
    <NavLink
      className={classes.root}
      to={to}
      activeClassName={classes.activated}
    >
      <ListItem button>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItem>
    </NavLink>
  );
}
