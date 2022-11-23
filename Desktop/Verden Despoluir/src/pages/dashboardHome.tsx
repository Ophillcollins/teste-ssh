import SidebarWithHeader from '../components/SidebarWithHeader';
import Tco2eMedia from '../components/Tco2eMedia';
import ChartMonthlyEvolutionTco2e from '../components/ChartMonthlyEvolutionTco2e';
import ListCalculations from '../components/ListOfCalculations';
import ChartCompensations from '../components/ChartCompensations';
import Tips from '../components/Tips';
import ChartPercentMonthlyEvolutionTco2e from '../components/ChartPercentMonthlyEvolutionTco2e';

export default function DashboardHome() {
  return (
    <>
      <SidebarWithHeader>
        <Tco2eMedia />

        <ChartMonthlyEvolutionTco2e />

        <ChartPercentMonthlyEvolutionTco2e />

        <ListCalculations />

        <ChartCompensations />

        <Tips />
      </SidebarWithHeader>
    </>
  );
}
