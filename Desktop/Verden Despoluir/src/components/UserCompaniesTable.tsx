import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import { useFetch } from '../hooks/useFetch';

export default function UserCompaniesTable() {
  const { data: userCompanies } =
    useFetch<[number | string]>('/user/companies');

  return (
    <>
      <TableContainer bg="white" rounded={'md'} my={4} p={4}>
        <Text fontWeight="500" mb={4} px={4}>
          Empresas cadastradas
        </Text>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>cnpj</Th>
              <Th>email</Th>
              <Th>Razão social</Th>
              <Th>Endereço</Th>
              <Th>Número</Th>
              <Th>CEP</Th>
              <Th>Cidade</Th>
              <Th>Estado</Th>
              <Th>País</Th>
              <Th>Telefone Comercial</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userCompanies.map((item: any, index: any) => (
              <Tr key={index}>
                <Td>{item.cnpj}</Td>
                <Td>{item.email}</Td>
                <Td>{item.corporate_name}</Td>
                <Td>{item.address}</Td>
                <Td>{item.number}</Td>
                <Td>{item.postal_code}</Td>
                <Td>{item.city}</Td>
                <Td>{item.state}</Td>
                <Td>{item.country}</Td>
                <Td>{item.commercial_phone}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
