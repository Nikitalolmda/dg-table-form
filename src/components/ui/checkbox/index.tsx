import React from "react";

interface ICheckbox {
  children: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  children,
  name,
  onChange,
}: ICheckbox): React.ReactElement => (
  <div>
    <input type="checkbox" onChange={onChange} name={name} id={name} />
    <label htmlFor={name}>{children}</label>
  </div>
);
