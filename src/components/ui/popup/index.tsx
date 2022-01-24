import React from 'react';
import { useStoreon } from 'storeon/react';

import { actions as popupActions } from 'store/popup'

import styles from './popup.module.scss';

interface IPopup {
    children: React.ReactElement;
}

export const Popup = ({ children }: IPopup): React.ReactElement => {
    const { dispatch } = useStoreon();

    const closePopup = (): void => {
        dispatch(popupActions.closePopup)
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <button onClick={closePopup} className={styles.closeButton} />
                </div>
                {children}
            </div>
        </div>
    )
}
