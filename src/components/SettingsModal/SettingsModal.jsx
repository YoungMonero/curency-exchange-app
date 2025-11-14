import React from 'react';
import { CURRENCIES, CURRENCY_DATA } from '../../constants';
import styles from './SettingsModal.module.css';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SettingsModal = ({ isOpen, onClose, defaultCurrency, onSetDefaultCurrency }) => {
    if (!isOpen) {
        return null;
    }

    const handleCurrencyChange = (e) => {
        onSetDefaultCurrency(e.target.value);
    };

    return (
        <div 
            className={styles.overlay}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>Wallet Settings</h2>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close settings">
                        <CloseIcon />
                    </button>
                </div>
                <p className={styles.subtitle}>Configure your wallet preferences</p>
                
                <div className={styles.formGroup}>
                    <label htmlFor="default-currency" className={styles.label}>
                        Default Currency
                    </label>
                    <select
                        id="default-currency"
                        value={defaultCurrency}
                        onChange={handleCurrencyChange}
                        className={styles.select}
                    >
                        {CURRENCIES.map(c => (
                            <option key={c} value={c}>
                                {c} - {CURRENCY_DATA[c].name}
                            </option>
                        ))}
                    </select>
                    <p className={styles.hint}>
                        Your total balance will be displayed in this currency.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
