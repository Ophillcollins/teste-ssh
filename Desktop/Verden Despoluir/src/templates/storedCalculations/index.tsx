/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Center,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import { useEmissions } from '../../context/emissions';
import api from '../../service/api';

type Props = {
  calculatorLinkNavigate?: string;
  setStepTable?: any;
};

export default function StoredCalculationsTemplate({
  calculatorLinkNavigate,
  setStepTable,
}: Props) {
  const navigate = useNavigate();
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { setEmissions, storedCalculations, setStoredCalculations } =
    useEmissions();

  function handleCalcule(calculatorLinkNavigate: any) {
    setButtonIsLoading(true);
    api
      .post('/calculator-despoluir', JSON.stringify(storedCalculations), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(function (response) {
        navigate(calculatorLinkNavigate);
        setEmissions(response.data);
        setButtonIsLoading(false);
        toast({
          title: 'Pronto!',
          description: 'Cálculo realizado com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        setButtonIsLoading(false);
        toast({
          title: 'Ops!',
          description: 'Não foi possível realizar o cálculo.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
        console.log(error.response);
      });
  }

  function clearItemTable(item: any) {
    const newStoredCalculations = [...storedCalculations];
    newStoredCalculations.splice(item, 1);
    setStoredCalculations(newStoredCalculations);
  }

  return (
    <>
      <Center p={{ base: 2, sm: 6 }} bg={'#EDF2F7'}>
        <Stack direction="column" align="center" minW="full">
          <Box maxW="7xl" w={'full'} rounded={'md'} overflow={'hidden'}>
            <TableContainer bg="white" rounded={'md'}>
              <Text fontWeight="500" my={4} px={4}>
                Aqui você encontra o resumo das informações inseridas
              </Text>
              <Table variant="simple" size="sm" w={'full'}>
                <Thead>
                  <Tr>
                    <Th>Mês</Th>
                    <Th>Categoria</Th>
                    <Th>Motor</Th>
                    <Th>Ano</Th>
                    <Th>Quantidade de veículos</Th>
                    <Th>Km médio mensal</Th>
                    <Th>Km médio por Litro</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {storedCalculations.map((item: any, index: any) => (
                    <Tr key={index}>
                      <Td>{item.month}</Td>
                      <Td>{item.category.name}</Td>
                      <Td>{item.subcategory.name}</Td>
                      <Td>{item.year}</Td>
                      <Td>{item.vehicles}</Td>
                      <Td>
                        {item.distance.toLocaleString().replace('.', ',')} Km
                      </Td>
                      <Td>{item.liter.replace('.', ',')} Km/Litro</Td>
                      <Td>
                        <Button
                          size="md"
                          onClick={() => clearItemTable(index)}
                          leftIcon={<DeleteIcon />}
                        >
                          Remover
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Stack
              spacing={4}
              direction={{ base: 'column', md: 'row' }}
              justifyContent="end"
              align="center"
              bg="white"
              p={6}
            >
              <Button
                size="md"
                w={{ base: '100%', md: '200px' }}
                // onClick={() => navigate('/calculator')}
                onClick={setStepTable}
              >
                Inserir mais veículos
              </Button>
              <Button
                size="md"
                w={{ base: '100%', md: '200px' }}
                onClick={() => setStoredCalculations([])}
              >
                Limpar Tabela
              </Button>
              <Button
                disabled={storedCalculations.length == 0 ? true : false}
                w={{ base: '100%', md: '200px' }}
                bg={'#004AAD'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                size="md"
                onClick={() => onOpen()}
              >
                Calcular Emissões
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Para Conhecimento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Essa ferramenta do Despoluir calcula os gases de efeito estufa (GEE)
            que retêm o calor na atmosfera, como o dióxido de carbono (CO2),
            metano (CH4) e óxido nitroso (N2O), emitidos pela sua frota. Além
            disso, o Programa Despoluir realiza gratuitamente avaliações
            veiculares ambientais em veículos movidos a diesel para aferir a sua
            opacidade. Vale lembrar que a opacidade indica a fuligem ou fumaça
            preta expelida pelo escapamento do seu veículo. Saiba mais em:
            <Link color="teal.500" href="www.despoluir.org.br" target="_blank">
              {' '}
              www.despoluir.org.br.{' '}
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              isLoading={buttonIsLoading}
              loadingText="Realizando Cálculo"
              onClick={() => handleCalcule(calculatorLinkNavigate)}
            >
              Continuar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
