import { useEffect, useState } from 'react';
import { Box, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import api from '../../service/api';

export default function Tco2eMedia() {
  const [media, setMedia] = useState({
    month: '',
    annual: '',
  });

  useEffect(() => {
    api
      .get(`users/store/month/despoluir/41`)
      .then((response: any) => {
        setMedia({
          month: response.data.total.value,
          annual: response.data.total.annualValue,
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  return (
    <Box maxW="full" bg="white" rounded={'md'} boxShadow={'2xl'} mb={6} p={4}>
      <StatGroup>
        <Stat>
          <StatLabel>Emissão de tCO2e Média Mensal</StatLabel>
          <StatNumber>{media.month} tco2e</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Emissão de tCO2e Média Anual</StatLabel>
          <StatNumber>{media.annual} tco2e</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
}
