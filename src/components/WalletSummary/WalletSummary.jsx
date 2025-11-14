import React from 'react';
import { CURRENCY_DATA } from '../../constants';
import styles from './WalletSummary.module.css';

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const WalletSummary = ({ totalBalance, defaultCurrency }) => {
    return (
        <div className={styles.summaryCard}>
            <div className={styles.titleContainer}>
                <TrendingUpIcon />
                <h2 className={styles.title}>Total Balance</h2>
            </div>
            <p className={styles.balance}>
                {CURRENCY_DATA[defaultCurrency].symbol}
                {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={styles.currencyInfo}>In {defaultCurrency}</p>
        </div>
    );
};

export default WalletSummary;
