import React from 'react';
import { CURRENCY_DATA, CURRENCIES } from '../../constants';
import Card from '../Card/Card';
import styles from './BalanceList.module.css';

const ArrowUpRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);


const BalanceList = ({ balances }) => {
    return (
        <div className={styles.grid}>
            {CURRENCIES.map((currency) => {
                 const formattedBalance = currency === 'XAF' 
                    ? `${balances[currency].toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})} ${CURRENCY_DATA[currency].symbol}`
                    : `${CURRENCY_DATA[currency].symbol}${balances[currency].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

                return (
                    <Card key={currency} className={styles.cardContent}>
                        <div className={`${styles.decoratorBar} ${
                            currency === 'EUR' ? styles.decoratorGreen : styles.decoratorBlue
                        }`}></div>
                        <div className={styles.content}>
                            <div>
                                <p className={styles.currencyName}>{currency}</p>
                                <p className={styles.balance}>
                                    {formattedBalance}
                                </p>
                            </div>
                            <button className={styles.actionButton} aria-label={`Actions for ${currency}`}>
                                <ArrowUpRightIcon />
                            </button>
                        </div>
                    </Card>
                )
            })}
        </div>
    );
};

export default BalanceList;
