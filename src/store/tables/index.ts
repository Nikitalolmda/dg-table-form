import { StoreonModule, StoreonEvents } from "storeon";

export interface IRow {
  name: string;
  surname: string;
  age: number | string;
  city: string;
}

export interface ITables {
  initialTable: IRow[];
  list: IRow[][];
}

export interface ITablesStore {
  tables: ITables;
}

export interface ITablesEvents extends StoreonEvents<ITablesStore> {
  "table/addRow": IRow;
  "table/editRow": { tableId: number; rowId: number; row: IRow };
  "table/removeRow": { tableId: number; rowId: number };
  "table/copyTable": { table: IRow[]; id: number };
  "table/removeTable": number;
}

interface IActions {
  addRow: "table/addRow";
  editRow: "table/editRow";
  removeRow: "table/removeRow";
  copyTable: "table/copyTable";
  removeTable: "table/removeTable";
}

export const actions: IActions = {
  addRow: "table/addRow",
  editRow: "table/editRow",
  removeRow: "table/removeRow",
  copyTable: "table/copyTable",
  removeTable: "table/removeTable",
};

const store: StoreonModule<ITablesStore, ITablesEvents> = (store) => {
  store.on("@init", () => ({
    tables: {
      initialTable: [
        {
          name: "name",
          surname: "surname",
          age: 28,
          city: "city",
          id: null,
        },
      ],
      list: [],
    },
  }));

  store.on(actions.addRow, ({ tables }, row) => ({
    tables: {
      ...tables,
      initialTable: [...tables.initialTable, row],
    },
  }));

  store.on(actions.editRow, ({ tables }, { tableId, rowId, row }) => {
    const isDefault = typeof tableId === 'undefined';
    const cloneArr = isDefault ? [tables.initialTable] : tables.list;
    const index = isDefault ? 0 : tableId;
    const foundTable = [...cloneArr[index]];

    foundTable[rowId] = row;
    cloneArr[index] = foundTable;

    const data = isDefault ? { initialTable: cloneArr[0] } : { list: cloneArr };

    return {
      tables: {
        ...tables,
        ...data,
      },
    };
  });

  store.on(actions.removeRow, ({ tables }, { tableId, rowId }) => {
    const isDefault = typeof tableId === "undefined";
    const cloneTable = isDefault ? [tables.initialTable] : tables.list;

    const index = isDefault ? 0 : tableId;
    const filteredTable = [...cloneTable[index]].filter(
      (_, index) => index !== rowId
    );

    cloneTable[index] = filteredTable;

    const data = isDefault
      ? { initialTable: cloneTable[0] }
      : { list: cloneTable };

    return {
      tables: {
        ...tables,
        ...data,
      },
    };
  });

  store.on(actions.removeTable, ({ tables }, tableId) => {
    const filteredList = tables.list.filter((_, index) => index !== tableId);

    return {
      tables: {
        ...tables,
        list: filteredList,
      },
    };
  });

  store.on(actions.copyTable, ({ tables }, { table, id }) => {
    let newList;

    if (typeof id !== 'undefined') {
      const startList = tables.list.slice(0, id);
      const endList = tables.list.slice(id);

      newList = [...startList, table, ...endList];
    } else {
      newList = [table, ...tables.list];
    }

    return {
      tables: {
        ...tables,
        list: newList,
      },
    };
  });
};

export const tables = {
  ...actions,
  store,
};
