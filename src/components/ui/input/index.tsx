import React from 'react';

import styles from './input.module.scss';

interface IInput {
  value: string | number;
  type?: string;
  name: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value,
  type = "text",
  name,
  placeholder,
  onChange,
}: IInput): React.ReactElement => (
  <input
    className={styles.input}
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);
