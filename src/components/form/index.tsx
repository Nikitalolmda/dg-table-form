import React, { useCallback } from "react";
import { useStoreon } from "storeon/react";

import { Input, Button } from "components/ui";
import { actions as formActions } from "store/form";
import { actions as tablesActions } from "store/tables";
import { randomIdGenerator } from "utils";

import styles from "./form.module.scss";

export const Form = (): React.ReactElement => {
  const { dispatch, form } = useStoreon("form");

  const handleField = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(formActions.set, { value, name });
  };

  const onSubmitForm = (): void => {
    dispatch(tablesActions.addRow, { ...form, id: randomIdGenerator(5) });
    dispatch(formActions.reset);
  };

  const isButtonDisabled = useCallback((): boolean => {
    const { age, name, surname, city } = form;

    if (age && name && surname && city) return false;

    return true;
  }, [form]);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Input
          value={form.name}
          placeholder="Name"
          name="name"
          onChange={handleField}
        />
      </div>

      <div className={styles.input}>
        <Input
          value={form.surname}
          placeholder="Surname"
          name="surname"
          onChange={handleField}
        />
      </div>

      <div className={styles.input}>
        <Input
          value={form.age}
          name="age"
          placeholder="Age"
          type="number"
          onChange={handleField}
        />
      </div>

      <div className={styles.input}>
        <Input
          value={form.city}
          name="city"
          placeholder="City"
          onChange={handleField}
        />
      </div>

      <div className={styles.button}>
        <Button isDisabled={isButtonDisabled()} onClick={onSubmitForm}>
          ADD
        </Button>
      </div>
    </div>
  );
};
