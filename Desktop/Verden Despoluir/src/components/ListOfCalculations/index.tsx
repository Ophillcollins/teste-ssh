import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../../service/api';

export default function ListCalculations() {
  const [listCalculations, setListCalculations] = useState([] as any);

  useEffect(() => {
    api
      .get(`users/store/despoluir/1`)
      .then((response: any) => {
        setListCalculations(response.data.vehicles);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  return (
    <TableContainer bg="white" rounded={'md'} boxShadow={'2xl'}>
      <Table variant="simple" size="md" p={4} w={'full'}>
        <TableCaption>Cálculos cadastrados</TableCaption>
        <Thead>
          <Tr>
            <Th>Mês</Th>
            <Th>Veículo</Th>
            <Th>Motor</Th>
            <Th>Ano</Th>
            <Th>Combustível</Th>
            <Th>tCh4</Th>
            <Th>tN2O</Th>
            <Th>tCO2</Th>
            <Th>Data do Cálculo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listCalculations.map((item: any, index: any) => (
            <Tr key={index}>
              <Td>{item.month}</Td>
              <Td>{item.category}</Td>
              <Td>{item.subcategory}</Td>
              <Td>{item.year}</Td>
              <Td>{item.fuel}</Td>
              <Td>{item.ch4}</Td>
              <Td>{item.n2o}</Td>
              <Td>{item.co2}</Td>
              <Td>
                {item.created_at
                  .substr(0, 10)
                  .replace('-', '/')
                  .replace('-', '/')}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
