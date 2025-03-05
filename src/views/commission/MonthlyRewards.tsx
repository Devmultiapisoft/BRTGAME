import FinancialMetrics from "./FinancialMetrics";

const MonthlyRewards = () => (
    <FinancialMetrics
      apiKey="monthlyrewards"
      title="Monthly Rewards"
      columns={[
        { key: 'month', label: 'Month' },
        { key: 'members', label: 'Team Members' },
        { key: 'bonus', label: 'Bonus Amount', format: (value) => `$${value}` },
        { key: 'status', label: 'Payment Status' }
      ]}
    />
  );
  
export default MonthlyRewards;