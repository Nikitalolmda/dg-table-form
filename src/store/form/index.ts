import { StoreonModule, StoreonEvents } from "storeon";

import { IRow } from 'store/tables';

export interface IFormStore {
  form: IRow;
}

export interface IFormEvents extends StoreonEvents<IFormStore> {
  "form/set": {[key: string]: string | number};
  "form/reset": IRow;
}

interface IActions {
  set: 'form/set';
  reset: 'form/reset';
}

export const actions: IActions = {
  set: 'form/set',
  reset: 'form/reset',
};

const initialValues = {
  name: "",
  surname: "",
  age: '',
  city: "",
  id: undefined,
};

const store: StoreonModule<IFormStore, IFormEvents> = (store) => {
  store.on('@init', () => ({
    form: { ...initialValues },
  }));
  store.on(actions.set, ({ form }, data) => ({
    form: {
      ...form,
      [data.name]: data.value,
    },
  }));
  store.on(actions.reset, () => ({
    form: { ...initialValues },
  }));
};

export const form = {
  ...actions,
  store,
};
