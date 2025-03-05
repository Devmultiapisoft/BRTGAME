import React from 'react';
import FinancialMetrics from "./FinancialMetrics";

const DailyCommission = () => (
  <FinancialMetrics
    apiKey="daily"
    title="Daily Commission"
    columns={[
      { 
        key: 'date', 
        label: 'Date',
        format: (value: string) => new Date(value).toLocaleDateString() 
      },
      { 
        key: 'amount', 
        label: 'Amount',
        format: (value: number) => `₹${value.toFixed(2)}` 
      },
      { 
        key: 'status', 
        label: 'Status'
      }
    ]}
  />
);

export default DailyCommission;
