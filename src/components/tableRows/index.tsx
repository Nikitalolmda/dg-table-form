import React from "react";
import { useStoreon } from 'storeon/react';

import { actions as tableActions } from 'store/tables';
import { popup as popupActions } from 'store/popup';
import { EditRowPopup } from 'components/editRowPopup';
import { IRow } from 'store/tables';

import styles from "./tableRow.module.scss";

interface ITableRow extends IRow {
  rowId: number;
  tableId: number | undefined;
  isRemovable: boolean;
}

export const TableRow = ({
  name,
  surname,
  city,
  age,
  rowId,
  tableId,
  isRemovable,
}: ITableRow): React.ReactElement => {
    const { dispatch } = useStoreon();

    const onRemoveHandler = (): void => {
        dispatch(tableActions.removeRow, {tableId, rowId})
    }

    const onEditHandler = (): void => {
        const row = { name, surname, city, age };

        dispatch(popupActions.showPopup, {
            content: <EditRowPopup tableId={tableId} rowId={rowId} row={row} />
        })
    }

    return (
        <tr>
            <td className={styles.cell}>{name}</td>
            <td className={styles.cell}>{surname}</td>
            <td className={styles.cell}>{city}</td>
            <td className={styles.cell}>{age}</td>
            <td className={styles.buttonsCell}>
                <a className={styles.editButton} onClick={onEditHandler}>Edit</a>
                {isRemovable && <a className={styles.removeButton} onClick={onRemoveHandler}>Delete</a>}
            </td>
        </tr>
    );
};
