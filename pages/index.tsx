import type { NextPage } from 'next';
import { useStoreon } from 'storeon/react';

import { Form } from 'components/form';
import { Table } from 'components/table';
import { Popup } from 'components/ui';
import { ITables } from 'store/tables';
import { IPopup } from 'store/popup';
import { randomIdGenerator } from 'utils';

import styles from './home.module.scss';

const Home: NextPage = () => {
  const { tables, popup } = useStoreon<{ tables: ITables, popup: IPopup }>('tables', 'popup');

  return (
    <div>
        <div className={styles.flexContainer}>
            <Form />
            <Form />
        </div>

        <div className={styles.container}>
            <Table data={tables.initialTable} />
        </div>

        {tables.list.map((table, index) => (
            <div
                style={{ margin: "20px" }}
                key={randomIdGenerator(5)}
            >
                <Table data={table} id={index} />
            </div>
        ))}

        {popup.isShow && popup.content && <Popup>{popup.content}</Popup>}
    </div>
  );
};

export default Home;
