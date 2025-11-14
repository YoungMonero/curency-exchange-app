
# Multi-Currency Wallet

This is a responsive and interactive multi-currency wallet application built with React and styled with Tailwind CSS. It allows users to manage balances in three different currencies (USD, EUR, XAF), perform exchanges between them, and deposit funds. The application features a sleek, modern dark theme and a user-friendly interface.

## Features

- **Multi-Currency Balances**: View individual balances for US Dollars (USD), Euros (EUR), and Central African CFA Francs (XAF).
- **Total Balance Overview**: A prominent display shows the total value of all assets, converted to a user-selectable default currency.
- **Currency Exchange**: Seamlessly exchange funds from one currency to another. The app provides a real-time conversion preview based on pre-defined exchange rates.
- **Deposit Funds**: Easily add funds to any currency account through a simple deposit form.
- **Customizable Default Currency**: Through a settings modal, users can change their default currency (USD, EUR, or XAF), and the total balance display updates instantly.
- **Interactive UI**: A clean, component-based interface with smooth transitions and clear user feedback.
- **Responsive Design**: The layout adapts gracefully to different screen sizes, from mobile devices to desktops.

## Tech Stack

- **Frontend Library**: [React.js](https://reactjs.org/) (v19)
- **Programming Language**: JavaScript (ES6+)

This project is set up to run directly in the browser without any build step, making it lightweight and easy to explore.

## Project Structure

The project is organized into a modular structure to promote code reusability and maintainability.

```
/
├── components/
│   ├── ActionPanel.jsx       # Component with tabs for Deposit and Exchange forms.
│   ├── BalanceList.jsx       # Displays the grid of currency balance cards.
│   ├── Card.jsx              # Reusable card component for consistent styling.
│   ├── SettingsModal.jsx     # Modal for changing the default currency.
│   └── WalletSummary.jsx     # Displays the total balance card.
│
├── App.jsx                   # Main application component, manages state and logic.
├── constants.js              # Contains static data (currency details, exchange rates).
├── index.html                # The entry point of the application.
├── index.jsx                 # Mounts the React application to the DOM.
└── types.js                  # Defines the Currency object.
```

## How It Works

### State Management
The core application state, including `balances`, `defaultCurrency`, and modal visibility, is managed within the `App.jsx` component using React hooks (`useState`, `useMemo`, `useCallback`). This centralized state is passed down to child components via props.

### Currency Conversion
Currency conversions are handled using a base rate against the US Dollar. The `RATES_AGAINST_USD` object in `constants.js` provides the conversion factors. When an exchange is performed, the source amount is first converted to USD and then from USD to the target currency, ensuring a consistent conversion path.

```javascript
// Example logic in App.jsx
const amountInUsd = amount / RATES_AGAINST_USD[from];
const convertedAmount = amountInUsd * RATES_AGAINST_USD[to];
```

### Component Architecture
- **`App.jsx`**: The orchestrator. It fetches constants, manages all application state, and renders the primary layout and components.
- **`WalletSummary.jsx`**: A presentational component that receives the total balance and default currency to display them.
- **`BalanceList.jsx`**: Maps over the available currencies and displays each one in a styled `Card.jsx`.
- **`ActionPanel.jsx`**: A stateful component that manages its own internal state (like the active tab and form inputs) and calls handler functions passed down from `App.jsx` to update the global state.
- **`SettingsModal.jsx`**: Is displayed conditionally based on state in `App.jsx`. It modifies the `defaultCurrency` state via a callback function.

