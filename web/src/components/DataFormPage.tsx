import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import React, {useState, createElement} from 'react';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import {Rnd} from 'react-rnd';
import {isArray} from 'core-js/library/fn/array';
import uuid from 'uuid';

interface FieldModel {
  type?: string;
  props?: {
    key: string;
    [prop: string]: any;
  };
  children?: FieldModel[];
}
interface FormModel {
  items: FieldModel[];
}

const useStyles = makeStyles(theme => ({
  field: {},
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #ddd',
    background: '#f0f0f0',
  },
}));

function Container({children}: any) {
  const classes = useStyles();
  return (
    <Rnd
      bounds="parent"
      resizeGrid={[10, 10]}
      dragGrid={[10, 10]}
      className={classes.container}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
    >
      {children}
    </Rnd>
  );
}

const formData: FormModel = {
  items: [
    {},
    {},
    {},
    {},
    {
      children: [
        {},
        {},
        {},
        {},
        {
          children: [{}, {}, {}, {}],
        },
      ],
    },
  ],
};

const components: {[name: string]: any} = {
  Container,
};

function Field({type, props, children}: FieldModel): JSX.Element {
  if (typeof props !== 'object') {
    props = {key: uuid()};
  } else {
    if (!props.key) props.key = uuid();
  }
  return createElement(
    (type && components[type]) || Container,
    props,
    isArray(children) ? children.map(Field) : []
  );
}

export default function DataFormPage() {
  const classes = useStyles();

  // const {t} = useTranslation();
  // const [size, setSize] = useState({width: 100, height: 100});
  // const [position, setPosition] = useState({x: 50, y: 50});

  return <div className={classes.root}>{formData.items.map(Field)}</div>;
}
