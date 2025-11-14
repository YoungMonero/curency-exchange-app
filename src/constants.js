import { Currency } from './types';

export const CURRENCIES = [Currency.USD, Currency.EUR, Currency.XAF];

export const CURRENCY_DATA = {
    [Currency.USD]: { name: 'US Dollar', symbol: '$' },
    [Currency.EUR]: { name: 'Euro', symbol: '€' },
    [Currency.XAF]: { name: 'CFA Franc', symbol: 'FCFA' },
};

// Exchange rates relative to 1 USD. Used as a stable base for conversions.
// For example, 1 USD = 0.93 EUR
export const RATES_AGAINST_USD = {
    [Currency.USD]: 1,
    [Currency.EUR]: 0.93,
    [Currency.XAF]: 610.50,
};