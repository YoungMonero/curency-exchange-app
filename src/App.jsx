import React, { useState, useMemo, useCallback } from 'react';
import { Currency } from '../types';
import { RATES_AGAINst_USD } from '../constants';
import WalletSummary from '../components/WalletSummary/WalletSummary';
import BalanceList from '../components/BalanceList/BalanceList';
import ActionPanel from '../components/ActionPanel/ActionPanel';
import SettingsModal from '../components/SettingsModal/SettingsModal';

const WalletIcon = () => (
    <div className="walletIcon">
        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{color: '#3b82f6'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
    </div>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{color: '#9ca3af'}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ExchangeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const App = () => {
    const [balances, setBalances] = useState({
        [Currency.USD]: 100,
        [Currency.EUR]: 500,
        [Currency.XAF]: 10000,
    });

    const [defaultCurrency, setDefaultCurrency] = useState(Currency.USD);
    const [showExchange, setShowExchange] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const totalBalanceInDefaultCurrency = useMemo(() => {
        return Object.keys(balances).reduce((total, currency) => {
            const amount = balances[currency];
            const amountInUsd = amount / RATES_AGAINst_USD[currency];
            const amountInDefaultCurrency = amountInUsd * RATES_AGAINst_USD[defaultCurrency];
            return total + amountInDefaultCurrency;
        }, 0);
    }, [balances, defaultCurrency]);

    const handleDeposit = useCallback((amount, currency) => {
        setBalances(prevBalances => ({
            ...prevBalances,
            [currency]: prevBalances[currency] + amount,
        }));
    }, []);

    const handleExchange = useCallback((amount, from, to) => {
        setBalances(prevBalances => {
            if (prevBalances[from] < amount) {
                alert("Insufficient funds");
                return prevBalances;
            }
            const amountInUsd = amount / RATES_AGAINst_USD[from];
            const convertedAmount = amountInUsd * RATES_AGAINst_USD[to];

            return {
                ...prevBalances,
                [from]: prevBalances[from] - amount,
                [to]: prevBalances[to] + convertedAmount,
            };
        });
    }, []);

    return (
        <div className="container">
            <div className="content">
                <header className="header">
                    <div className="headerTitle">
                        <WalletIcon />
                        <div>
                            <h1 className="title">Multi-Currency Wallet</h1>
                            <p className="subtitle">Manage your finances seamlessly</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsSettingsOpen(true)} 
                        className="settingsButton"
                    >
                        <SettingsIcon />
                    </button>
                </header>

                <main className="main">
                    <WalletSummary 
                        totalBalance={totalBalanceInDefaultCurrency}
                        defaultCurrency={defaultCurrency}
                    />

                    <button
                        onClick={() => setShowExchange(prev => !prev)}
                        className="exchangeButton"
                    >
                        <ExchangeIcon />
                        Exchange Currency
                    </button>

                    {showExchange && (
                        <ActionPanel 
                            balances={balances}
                            onDeposit={handleDeposit}
                            onExchange={handleExchange}
                        />
                    )}

                    <BalanceList balances={balances} />
                </main>

                <footer className="footer">
                    <p>Built with React. Exchange rates are for demonstration purposes only.</p>
                </footer>
            </div>

            <SettingsModal 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                defaultCurrency={defaultCurrency}
                onSetDefaultCurrency={setDefaultCurrency}
            />
        </div>
    );
};

export default App;
