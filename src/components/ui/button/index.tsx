import React from "react";
import classNames from "classnames";

import styles from "./button.module.scss";

interface IButton {
  type?: "button" | "submit" | "reset";
  size?: "large" | "small";
  onClick?: () => void;
  children: string | React.ReactElement;
  isDisabled?: boolean;
}

export const Button = ({
  type,
  size = "large",
  onClick,
  children,
  isDisabled,
}: IButton): React.ReactElement => (
  <button
    className={classNames(styles.button, styles[size])}
    type={type}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </button>
);
