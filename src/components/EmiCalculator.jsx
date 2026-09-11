import React, { useState } from 'react';
import { Calculator, IndianRupee, Percent, Calendar } from 'lucide-react';

export default function EmiCalculator({ defaultAmount = 10000000 }) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [interestRate, setInterestRate] = useState(8.5); // % p.a.
  const [tenureYears, setTenureYears] = useState(20);

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  const emi = loanAmount && monthlyRate ? Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  ) : 0;

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1.25rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#0f172a' }}>
        <Calculator size={20} color="#d97706" />
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Home Loan EMI Calculator</h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '1.25rem' }}>
        {/* Loan Amount */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            step="500000"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.92rem',
              fontWeight: 600
            }}
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step="0.1"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.92rem',
              fontWeight: 600
            }}
          />
        </div>

        {/* Tenure */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
            Tenure ({tenureYears} Years)
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#d97706' }}
          />
        </div>
      </div>

      {/* Results Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '12px 16px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Monthly EMI</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24' }}>{formatCurrency(emi)}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Principal Amount</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{formatCurrency(loanAmount)}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total Interest</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#059669' }}>{formatCurrency(totalInterest)}</div>
        </div>
      </div>
    </div>
  );
}
