import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { tables, ITablesStore, ITablesEvents } from 'store/tables';
import { popup, IPopupEvents, IPopupStore } from 'store/popup';
import { form, IFormEvents, IFormStore } from 'store/form';

type State = ITablesStore & IPopupStore & IFormStore;

type Events = ITablesEvents & IPopupEvents & IFormEvents;

export const store = createStoreon<State, Events>([
  tables.store,
  popup.store,
  form.store,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
