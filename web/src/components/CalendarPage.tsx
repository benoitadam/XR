import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import React, {SyntheticEvent, useState} from 'react';
import api, {CalendarEvent} from '../services/api';
import {
  Calendar,
  momentLocalizer,
  View,
  NavigateAction,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';

type stringOrDate = string | Date;
type SelectSlotInfo = {
  start: stringOrDate;
  end: stringOrDate;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
};
type EventDropArgs = {
  event: CalendarEvent;
  start: stringOrDate;
  end: stringOrDate;
  allDay: boolean;
};
type EventResizeArgs = {
  event: CalendarEvent;
  start: stringOrDate;
  end: stringOrDate;
  allDay: boolean;
};
type DragStartArgs = {
  event: CalendarEvent;
  action: 'resize' | 'move';
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
};
type DropFromOutsideArgs = {
  start: stringOrDate;
  end: stringOrDate;
  allDay: boolean;
};
type SelectingRange = {start: stringOrDate; end: stringOrDate};
type RangeChangeRange = Date[] | {start: stringOrDate; end: stringOrDate};

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export default function CalendarPage() {
  const classes = useStyles();
  const {t} = useTranslation();
  const events = api.Event.use();

  const onSelectSlot = (slotInfo: SelectSlotInfo) => {
    console.log('onSelectSlot', slotInfo);
  };

  return (
    <div className={classes.container}>
      <DragAndDropCalendar
        selectable
        resizable
        localizer={localizer}
        events={events}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDropFromOutside={onDropFromOutside}
        dragFromOutsideItem={dragFromOutsideItem}
        onNavigate={onNavigate}
        onView={onView}
        onDrillDown={onDrillDown}
        onSelectSlot={onSelectSlot}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onSelecting={onSelecting}
        onRangeChange={onRangeChange}
        onShowMore={onShowMore}
      />
    </div>
  );
}

const onEventDrop = (args: EventDropArgs) => {
  console.log('onEventDrop', args);
};
const onEventResize = (args: EventResizeArgs) => {
  console.log('onEventResize', args);
};
const onDragStart = (args: DragStartArgs) => {
  console.log('onDragStart', args);
};
const onDragOver = (event: React.DragEvent) => {
  console.log('onDragOver', event);
};
const onDropFromOutside = (args: DropFromOutsideArgs) => {
  console.log('onDropFromOutside', args);
};
const dragFromOutsideItem = () => {
  console.log('dragFromOutsideItem');
  return (event: CalendarEvent) => {
    return new Date();
  };
};
const onNavigate = (newDate: Date, view: View, action: NavigateAction) => {
  console.log('onNavigate', newDate, view, action);
};
const onView = (view: View) => {
  console.log('onView', view);
};
const onDrillDown = (date: Date, view: View) => {
  console.log('onDrillDown', date, view);
};
const onDoubleClickEvent = (
  event: CalendarEvent,
  e: SyntheticEvent<HTMLElement>
) => {
  console.log('onDoubleClickEvent', event);
};
const onSelectEvent = (
  event: CalendarEvent,
  e: SyntheticEvent<HTMLElement>
) => {
  console.log('onSelectEvent', event);
};
const onSelecting = (range: SelectingRange) => {
  console.log('onSelecting', range);
  return true as (boolean | undefined | null);
};
const onRangeChange = (range: RangeChangeRange) => {
  console.log('onRangeChange', range);
};
const onShowMore = (events: CalendarEvent[], date: Date) => {
  console.log('onShowMore', events, date);
};
