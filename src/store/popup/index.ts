import React from 'react';
import { StoreonModule, StoreonEvents } from 'storeon';

export interface IPopup {
  isShow: boolean;
  content: React.ReactElement | null;
}

export interface IPopupStore {
  popup: IPopup;
}

export interface IPopupEvents extends StoreonEvents<IPopupStore> {
  "popup/showPopup": { content: React.ReactElement };
  "popup/closePopup": undefined;
}

interface IActions {
  showPopup: 'popup/showPopup';
  closePopup: 'popup/closePopup';
}

export const actions: IActions = {
  showPopup: 'popup/showPopup',
  closePopup: 'popup/closePopup',
};

const store: StoreonModule<IPopupStore, IPopupEvents> = (store) => {
  store.on('@init', () => ({
    popup: {
      isShow: false,
      content: null,
    },
  }));
  store.on(actions.showPopup, (_, { content }) => ({
    popup: {
      isShow: true,
      content,
    },
  }));
  store.on(actions.closePopup, () => ({
    popup: {
      isShow: false,
      content: null,
    },
  }));
};

export const popup = {
  ...actions,
  store,
};
