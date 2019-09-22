import {BehaviorSubject} from 'rxjs';
import Parse from 'parse';
import {useState, useEffect} from 'react';

export interface Auth {
  isAuthenticated: boolean;
  user?: Parse.User;
}
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

type ParseObject<T> = T & Parse.Object;

const auth$ = new BehaviorSubject<Auth>({isAuthenticated: false});

class Repository<T extends {id: string}> {
  _Object: any;

  constructor(public name: string) {
    this._Object = Parse.Object.extend(this.name);
  }

  equal(a: T, b: T) {
    return a === b || a.id === b.id;
  }

  create(item?: T): ParseObject<T> {
    return new this._Object(item);
  }

  query() {
    return new Parse.Query<ParseObject<T>>(this._Object);
  }

  aggregate(
    pipeline: Parse.Query.AggregationOptions | Parse.Query.AggregationOptions[]
  ) {
    return this.query().aggregate(pipeline);
  }

  find(match: {[key: string]: any}) {
    return this.aggregate({match}) as Promise<ParseObject<T>>;
  }

  get(id: string) {
    return this.query().get(id);
  }

  use(
    queryConfig?: (
      query: Parse.Query<ParseObject<T>>
    ) => Parse.Query<ParseObject<T>>
  ) {
    const [items, setItems] = useState([] as ParseObject<T>[]);

    useEffect(() => {
      const itemById = {} as {[id: string]: ParseObject<T>};
      const query = queryConfig ? queryConfig(this.query()) : this.query();
      const sub = query.subscribe();
      const enter = (o: ParseObject<T>) => {
        itemById[o.id] = o;
        setItems(Object.values(itemById));
      };
      const leave = (o: ParseObject<T>) => {
        delete itemById[o.id];
        setItems(Object.values(itemById));
      };
      sub.on('create', enter);
      sub.on('update', enter);
      sub.on('enter', enter);
      sub.on('leave', leave);
      sub.on('delete', leave);
      query.find().then(objects => {
        for (const o of objects) {
          itemById[o.id] = o as ParseObject<T>;
        }
      });
      return () => sub.unsubscribe();
    });

    return items;
  }

  add(item: T) {
    return this.create(item).save();
  }

  // save(item: T) {
  //   return item.save();
  // }

  remove(item: T) {
    return this.query()
      .get(item.id)
      .then(o => o.destroy());
  }
}

class EventRepository extends Repository<CalendarEvent> {
  constructor() {
    super('Event');
  }
}

class ApiService {
  Event = new EventRepository();

  constructor() {
    const appId = 'xbpfPv71yCjwnb94AZklOksqVOw1r93ycoYsHyQo';
    const jsKey = 'QoImzmI2ZvuVXMWwG3h5M5oqzVNSc5CWNwrzfSyi';
    Parse.initialize(appId, jsKey);
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  async logIn(username: string, password: string) {
    const user = await Parse.User.logIn(username, password);
    console.log('user', user);
    auth$.next({
      isAuthenticated: true,
      user,
    });
  }

  useAuth() {
    const [auth, setAuth] = useState(auth$.value);

    useEffect(() => {
      const sub = auth$.subscribe(next => setAuth(next));
      return () => sub.unsubscribe();
    });

    return auth;
  }

  // addEvent(event: EventModel) {
  //   let events = events$.value;
  //   events = [...events, event];
  //   events$.next(events);
  // }

  // updateEvent(event: EventModel) {
  //   let events = events$.value;
  //   const index = events.findIndex(p => this.equal(p, event));
  //   events = [...events];
  //   events[index] = event;
  //   events$.next(events);
  // }

  // removeEvent(event: EventModel) {
  //   let events = events$.value;
  //   events = events.filter(p => !this.equal(p, event));
  //   events$.next(events);
  // }
}
const api = new ApiService();

export default api;
