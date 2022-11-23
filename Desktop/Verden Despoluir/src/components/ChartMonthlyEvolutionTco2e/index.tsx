import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import api from '../../service/api';

export default function ChartMonthlyEvolutionTco2e() {
  const [totalByMonth, setTotalByMonth] = useState([] as any);

  useEffect(() => {
    api
      .get(`/users/store/total/despoluir/1`)
      .then((response: any) => {
        console.log(response.data);
        setTotalByMonth(response.data.totalByMonth);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  const data = {
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: totalByMonth.map((item: any, index: any) => item.month),
      },
    },
    series: [
      {
        name: 'tco2e',
        data: totalByMonth.map((item: any, index: any) =>
          item.tco2e.toFixed(7),
        ),
      },
    ],
  };

  return (
    <Box maxW="full" bg="white" rounded={'md'} boxShadow={'2xl'} mb={6} p={4}>
      <Text fontSize={'1x2'} fontWeight={600} align="center">
        Evolução mensal de tco2 equivalente (tCO2e)
      </Text>
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        width="100%"
        height={225}
      />
    </Box>
  );
}
