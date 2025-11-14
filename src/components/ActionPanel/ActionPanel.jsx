import React, { useState } from 'react';
import { Currency } from '../../types';
import { CURRENCIES, CURRENCY_DATA, RATES_AGAINST_USD } from '../../constants';
import Card from '../Card/Card';
import styles from './ActionPanel.module.css';

const DepositForm = ({ onDeposit }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState(Currency.USD);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }
        setError('');
        onDeposit(numAmount, currency);
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="deposit-amount" className={styles.label}>Amount</label>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputIcon}>
                        <span>{CURRENCY_DATA[currency].symbol}</span>
                    </div>
                    <input
                        type="number"
                        id="deposit-amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`${styles.input} ${styles.inputWithIcon}`}
                        placeholder="0.00"
                        step="0.01"
                    />
                    <div className={styles.selectWrapper}>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className={styles.select}
                        >
                            {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>
                Deposit Funds
            </button>
        </form>
    );
};

const ExchangeForm = ({ balances, onExchange }) => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState(Currency.USD);
    const [toCurrency, setToCurrency] = useState(Currency.EUR);
    const [error, setError] = useState('');

    const calculatedAmount = (() => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0 || fromCurrency === toCurrency) return 0;
        const amountInUsd = numAmount / RATES_AGAINST_USD[fromCurrency];
        return amountInUsd * RATES_AGAINST_USD[toCurrency];
    })();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const numAmount = parseFloat(amount);

        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }
        if (fromCurrency === toCurrency) {
            setError('Cannot exchange to the same currency.');
            return;
        }
        if (balances[fromCurrency] < numAmount) {
            setError('Insufficient funds for this exchange.');
            return;
        }

        onExchange(numAmount, fromCurrency, toCurrency);
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.exchangeLayout}>
                <div className={styles.flexGrow}>
                    <label className={styles.label}>From</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={styles.input}
                            placeholder="0.00"
                        />
                         <div className={styles.selectWrapper}>
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className={styles.select}
                            >
                                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                     <p className={styles.balanceHint}>
                        Balance: {balances[fromCurrency].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {fromCurrency}
                     </p>
                </div>
                 <div className={styles.flexGrow}>
                    <label className={styles.label}>To</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            value={calculatedAmount > 0 ? `≈ ${calculatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}` : '0.00'}
                            disabled
                            className={`${styles.input} ${styles.inputDisabled}`}
                        />
                         <div className={styles.selectWrapper}>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className={styles.select}
                            >
                                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
             <button type="submit" className={styles.submitButton}>
                Exchange
            </button>
        </form>
    );
};

const ActionPanel = ({ balances, onDeposit, onExchange }) => {
    const [activeTab, setActiveTab] = useState('exchange');

    const getTabClassName = (tabName) => {
        return `${styles.tabButton} ${activeTab === tabName ? styles.active : ''}`;
    };

    return (
        <Card className={styles.panel}>
            <div className={styles.tabs}>
                <nav className={styles.tabNav} aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('exchange')}
                        className={getTabClassName('exchange')}
                    >
                        Exchange
                    </button>
                     <button
                        onClick={() => setActiveTab('deposit')}
                        className={getTabClassName('deposit')}
                    >
                        Deposit
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === 'exchange' && <ExchangeForm balances={balances} onExchange={onExchange} />}
                {activeTab === 'deposit' && <DepositForm onDeposit={onDeposit} />}
            </div>
        </Card>
    );
};

export default ActionPanel;
