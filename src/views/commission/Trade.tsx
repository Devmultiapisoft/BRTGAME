import FinancialMetrics from "./FinancialMetrics";

const Trade = () => (
    <FinancialMetrics
      apiKey="trade"
      title="Trade"
      columns={[
        { key: 'month', label: 'Month' },
        { key: 'members', label: 'Team Members' },
        { key: 'bonus', label: 'Bonus Amount', format: (value) => `$${value}` },
        { key: 'status', label: 'Payment Status' }
      ]}
    />
  );
  
export default Trade;