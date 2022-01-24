import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';

import { Input, Button, Checkbox } from 'components/ui';
import { actions as popupActions } from 'store/popup';
import { actions as tablesActions } from 'store/tables';

import { IRow } from 'store/tables';

import styles from './editRowPopup.module.scss';

interface IEditRowPopup {
    tableId: number | undefined;
    rowId: number;
    row: IRow;
}

export const EditRowPopup = ({ tableId, row, rowId }: IEditRowPopup): React.ReactElement => {
    const { dispatch } = useStoreon();
    const [form, setForm] = useState(row);
    const [confirm, setConfirm] = useState(false);

    const isButtonDisabled = (): boolean => {
        const { age, name, surname, city } = form;

        return !(age && name && surname && city && confirm);
    };

    const fieldHandler = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const checkboxHandler = (): void => {
        setConfirm(value => !value)
    }

    const onSubmitForm = (): void => {
        dispatch(tablesActions.editRow, {
            tableId, rowId, row: form,
        })
        dispatch(popupActions.closePopup);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <Input value={form.name} name="name" placeholder="Name" onChange={fieldHandler} />
                </div>

                <div className={styles.input}>
                    <Input value={form.surname} name="surname" placeholder="Surname" onChange={fieldHandler} />
                </div>

                <div className={styles.input}>
                    <Input value={form.age} name="age" placeholder="Age" onChange={fieldHandler} />
                </div>

                <div className={styles.input}>
                    <Input value={form.city} name="city" placeholder="City" onChange={fieldHandler} />
                </div>

                <div className={styles.checkbox}>
                    <Checkbox name="confirmation" onChange={checkboxHandler}>
                        Agree
                    </Checkbox>
                </div>

                <div>
                    <Button isDisabled={isButtonDisabled()} size="large" onClick={onSubmitForm}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}
