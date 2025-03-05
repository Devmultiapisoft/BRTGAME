import FinancialMetrics from "./FinancialMetrics";


const MyTeam = () => (
    <FinancialMetrics
      apiKey="myteam"
      title="My Team"
      columns={[
        { key: 'month', label: 'Month' },
        { key: 'members', label: 'Team Members' },
        { key: 'bonus', label: 'Bonus Amount', format: (value) => `$${value}` },
        { key: 'status', label: 'Payment Status' }
      ]}
    />
  );
  
export default MyTeam;