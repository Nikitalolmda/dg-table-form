import React from "react";
import { useStoreon } from "storeon/react";

import { Button } from "components/ui/button";
import { actions as tablesActions, IRow } from "store/tables";

import styles from "./TableActions.module.scss";

interface ITableActions {
  table: IRow[];
  id?: number;
}

export const TableActions = ({ id, table }: ITableActions): React.ReactElement => {
  const { dispatch } = useStoreon();

  const copyTableHandler = (): void => {
    dispatch(tablesActions.copyTable, { table, id });
  };

  const removeTableHandler = (): void => {
    dispatch(tablesActions.removeTable, id);
  };

  const isRemovableTable = id !== undefined;

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button size="small" onClick={copyTableHandler}>
          Copy table
        </Button>
      </div>
      {isRemovableTable && (
        <button className={styles.removeButton} onClick={removeTableHandler} />
      )}
    </div>
  );
};
