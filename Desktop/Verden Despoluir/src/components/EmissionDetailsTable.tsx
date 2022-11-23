import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from '@chakra-ui/react';
import { useEmissions } from '../context/emissions';

export default function EmissionDetailsTable() {
  const { emissions } = useEmissions();

  return (
    <>
      {emissions.emissions_details.map((detail: any, index: string) => (
        <Box
          maxW="4xl"
          w={'full'}
          rounded={'md'}
          overflow={'hidden'}
          mx={'auto'}
          key={index}
        >
          <TableContainer bg="white" rounded={'md'} mt={10}>
            <Text fontWeight="500" mb={2}>
              Detalhes do cálculo número {index + 1}: {detail.category} -{' '}
              {detail.subcategory.name}
            </Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>Campo</Th>
                  <Th>Valor</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Mês</Td>
                  <Td>{detail.month}</Td>
                </Tr>
                <Tr>
                  <Td>Categoria</Td>
                  <Td>{detail.category}</Td>
                </Tr>
                <Tr>
                  <Td>Subcategoria</Td>
                  <Td>{detail.subcategory.name}</Td>
                </Tr>
                <Tr>
                  <Td>Número de veículos</Td>
                  <Td>{detail.vehicles}</Td>
                </Tr>
                <Tr>
                  <Td>Combustível consumido</Td>
                  <Td>{detail.fuel}</Td>
                </Tr>
                <Tr>
                  <Td>Quilometragem por litro</Td>
                  <Td>{detail.liter.replace('.', ',')} Km/litro</Td>
                </Tr>
                <Tr>
                  <Td>Quilometragem média mensal</Td>
                  <Td>{detail.distance} Km/Médio mensal</Td>
                </Tr>
                <Tr>
                  <Td>Ano</Td>
                  <Td>{detail.year}</Td>
                </Tr>
                <Tr>
                  <Td>tCO₂ (Dióxido de Carbono) Mensal</Td>
                  <Td>{detail.subcategory.factors.co2_monthly + ' tCO₂'}</Td>
                </Tr>
                <Tr>
                  <Td>tCH₄ (Metano) Mensal</Td>
                  <Td>{detail.subcategory.factors.ch4_monthly + ' tCH₄'}</Td>
                </Tr>
                <Tr>
                  <Td>tN₂O (Óxido Nitroso) Mensal</Td>
                  <Td>{detail.subcategory.factors.n2o_monthly + ' tN₂O'}</Td>
                </Tr>
                <Tr>
                  <Td>tCO₂e médio mensal por veículo</Td>
                  <Td>
                    {detail.subcategory.factors.co2e_total_monthly_by_vehicle +
                      ' tCO₂e'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>tCO₂e mensal total</Td>
                  <Td>
                    {detail.subcategory.factors.co2e_monthly_total + ' tCO₂e'}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </>
  );
}
