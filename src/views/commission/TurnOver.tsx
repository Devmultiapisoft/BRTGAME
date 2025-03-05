import FinancialMetrics from "./FinancialMetrics";


const TurnOver = () => (
    <FinancialMetrics
      apiKey="turnover"
      title="Turn Over"
      columns={[
        { key: 'month', label: 'Month' },
        { key: 'members', label: 'Team Members' },
        { key: 'bonus', label: 'Bonus Amount', format: (value) => `$${value}` },
        { key: 'status', label: 'Payment Status' }
      ]}
    />
  );
  
export default TurnOver;