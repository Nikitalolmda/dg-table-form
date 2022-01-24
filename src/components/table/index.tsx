import React from 'react';

import { TableRow } from 'components/tableRows';
import { TableActions } from 'components/tableActions';
import { IRow } from 'store/tables';
import { randomIdGenerator } from 'utils';

import styles from './table.module.scss';

const TableHeaderCell = ['Name', 'Surname', 'Age', 'City', ''];

interface ITable {
  data: IRow[];
  id?: number;
}

export const Table = ({ data, id }: ITable): React.ReactElement => (
  <div className={styles.container}>
    <TableActions table={data} id={id} />
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {TableHeaderCell.map((cell) => (
            <th className={styles.th} key={randomIdGenerator(4)}>
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowItem, index) => (
            <TableRow
              {...rowItem}
              rowId={index}
              tableId={id}
              isRemovable={data.length > 1}
              key={randomIdGenerator(5)}
            />
        ))}
      </tbody>
    </table>
  </div>
);
