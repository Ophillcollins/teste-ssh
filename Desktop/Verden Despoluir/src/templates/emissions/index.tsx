import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useEmissions } from '../../context/emissions';
import MemoryCalc from '../../components/MemoryCalc';
import SigninTemplate from '../signinTemplate';
import SignupTemplate from '../signupTemplate';
import EmissionDetailsTable from '../../components/EmissionDetailsTable';

export default function EmimssionsTemplate() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { emissions, setEmissions, setStoredCalculations } = useEmissions();
  const toast = useToast();

  useEffect(() => {
    if (emissions.length === 0) {
      toast({
        title: 'Ops!',
        description:
          'Ocorreu um erro ao atualizar a página de emissões. Por favor, cadastre o cálculo novamente.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      navigate('/calculator');
    }
  }, []);

  function handleCalculateAgain() {
    setEmissions([]);
    setStoredCalculations([]);
    navigate('/calculator');
  }

  return (
    <>
      <Center bg={'#EDF2F7'} py={8}>
        <Box maxW="1100px" w="full" p={3} bg={'#EDF2F7'}>
          <Stack maxW={'full'} textAlign={'left'} bg={'#EDF2F7'} mb={4}>
            <Heading fontSize={'3xl'}>Resultado do cálculo</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              Aqui estão os resultados das emissões da sua frota. Você pode
              compensar as emissões do mês selecionado ou as emissões anuais
              estimadas.
            </Text>
          </Stack>

          <Box maxW="7x1" bg="white" rounded={'md'} p={{ base: 2, sm: 6 }}>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Emissões tCO₂e (Toneladas)</Th>
                    <Th>Valor para compensação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mensal</Td>
                    <Td>{`${emissions.total_CO2e_monthly} tCO₂e`}</Td>
                    <Td>{`R$ ${emissions.total_compensation_monthly}`}</Td>
                  </Tr>
                  <Tr>
                    <Td>Anual</Td>
                    <Td>{`${emissions.total_CO2e_annual} tCO₂e`}</Td>
                    <Td>{`R$ ${emissions.total_compensation_annual}`}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Stack
              spacing={4}
              direction={{ base: 'column', md: 'row' }}
              justifyContent="end"
              align="center"
              bg="white"
              mt={8}
            >
              <Button
                size="md"
                w={{ base: '100%', md: '200px' }}
                onClick={handleCalculateAgain}
              >
                Calcular novamente
              </Button>

              <Button
                size="md"
                w={{ base: '100%', md: '200px' }}
                onClick={() => setIsDetailOpen(true)}
              >
                Detalhes das emissões
              </Button>
              <Button
                size="md"
                w={{ base: '100%', md: '200px' }}
                onClick={() => setIsMemoryOpen(true)}
              >
                Memória de cálculo
              </Button>

              <Button
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
                Compensar emissões
              </Button>
            </Stack>
          </Box>
        </Box>
      </Center>

      {emissions.length !== 0 ? (
        <Modal
          isOpen={isDetailOpen}
          size="4xl"
          onClose={() => setIsDetailOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Detalhes das emissões para cada veículo cadastrado
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EmissionDetailsTable />
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : null}

      <Modal
        isOpen={isMemoryOpen}
        size="5xl"
        onClose={() => setIsMemoryOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Memória de cálculo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MemoryCalc />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          {showSignup ? (
            <SignupTemplate onClickRegister={() => setShowSignup(false)} />
          ) : (
            <SigninTemplate onClickRegister={() => setShowSignup(true)} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
