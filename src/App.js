import React, { useState } from 'react';
import './App.css';
import './index.css';
import Navbar from './Navbar';

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [term, setTerm] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [emi, setEmi] = useState(0);
  const [currency, setCurrency] = useState('USD');

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(interest) / 100;
    const months = parseInt(term) * 12;
    const monthlyRate = annualRate / 12;

    const emiCalc = principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(emiCalc.toFixed(2));

    let balance = principal;
    const scheduleData = [];

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiCalc - interestPayment;
      balance -= principalPayment;

      scheduleData.push({
        month: i,
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }

    setSchedule(scheduleData);
  };

  const resetTable = () => {
    setAmount('');
    setInterest('');
    setTerm('');
    setEmi(0);
    setSchedule([]);
    setCurrency('USD');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <header className="header">
          <h1>Loan Calculator Dashboard</h1>
        </header>

        <div className="inputs">
          <input type="number" placeholder="Loan Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input type="number" placeholder="Interest Rate (%)" value={interest} onChange={(e) => setInterest(e.target.value)} />
          <input type="number" placeholder="Term (Years)" value={term} onChange={(e) => setTerm(e.target.value)} />
          <button onClick={calculateEMI}>Calculate</button>
        </div>

        {emi > 0 && (
          <>
            <div className="result-row">
              <div className="left-section">
                <p className="emi">Monthly EMI: {currencySymbol(currency)}{emi}</p>
                <div className="currency-dropdown">
                  <label>Currency</label>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>
              </div>
              <button className="reset-btn" onClick={resetTable}>RESET TABLE</button>
            </div>

            <h2 className="table-heading">Amortization Schedule ({currency})</h2>

            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{currencySymbol(currency)}{row.principal}</td>
                    <td>{currencySymbol(currency)}{row.interest}</td>
                    <td>{currencySymbol(currency)}{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

// Helper function to return symbol from currency code
const currencySymbol = (code) => {
  switch (code) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'INR': return '₹';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    default: return '$';
  }
};

export default LoanCalculator;
