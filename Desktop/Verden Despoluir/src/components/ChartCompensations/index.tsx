import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, Text } from '@chakra-ui/react';
import api from '../../service/api';

export default function ChartCompensations() {
  const [total, setTotal] = useState([] as any);

  useEffect(() => {
    api
      .get(`/users/store/total/despoluir/1`)
      .then((response: any) => {
        console.log(response.data);
        setTotal(response.data.total);
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
        categories: total.map((item: any, index: any) => item.month),
      },
    },
    series: [
      {
        name: 'Valor da compensação',
        data: total.map((item: any, index: any) => item.total_compensate),
      },
      {
        name: 'tCO2e',
        data: total.map((item: any, index: any) => item.tco2e),
      },
    ],
  };

  return (
    <Box maxW="full" bg="white" rounded={'md'} boxShadow={'2xl'} my={6} p={4}>
      <Text fontSize={'1x2'} fontWeight={600} align="center">
        Valor da compensação e do tCO2e de todos os cálculos armazenados
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
