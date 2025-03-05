import FinancialMetrics from "./FinancialMetrics";


const WeeklyBonus = () => (
    <FinancialMetrics
      apiKey="teambonus"
      title="Team Bonus"
      columns={[
        { key: 'month', label: 'Month' },
        { key: 'members', label: 'Team Members' },
        { key: 'bonus', label: 'Bonus Amount', format: (value) => `$${value}` },
        { key: 'status', label: 'Payment Status' }
      ]}
    />
  );
  
export default WeeklyBonus;