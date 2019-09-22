import React from 'react';
import LoginDialog from './components/LoginDialog';
import CalendarPage from './components/CalendarPage';
import {makeStyles} from '@material-ui/styles';
import HomePage from './components/HomePage';
import DataFormPage from './components/DataFormPage';
import {Route, Switch, withRouter} from 'react-router-dom';
import AppTopBar from './components/AppTopBar';
import FiendsPage from './components/FiendsPage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    flexGrow: 1,
  },
}));

export default withRouter(function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppTopBar />
      <main className={classes.content}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/calendar" exact component={CalendarPage} />
          <Route path="/form" exact component={DataFormPage} />
          <Route path="/fiends" exact component={FiendsPage} />
          {/* <Route
            path="/calendar/:groupe/:date"
            render={props => <UnitPage id={props.match.params.id} />}
          /> */}
        </Switch>
      </main>
      <LoginDialog />
    </div>
  );
});
