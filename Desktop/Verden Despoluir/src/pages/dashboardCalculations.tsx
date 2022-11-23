import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
} from '@chakra-ui/react';
import SidebarWithHeader from '../components/SidebarWithHeader';
import { DeleteIcon } from '@chakra-ui/icons';
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask';

import api from '../service/api';

export default function DashboardCalculator() {
  const toast = useToast();
  const [compensationValue, setCompensationValue] = useState('');
  const [checkoutValue, setCheckoutValue] = useState({
    monthly: '',
    annual: '',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [listCalculations, setListCalculations] = useState([] as any);
  const [compensateButtonIsLoading, setCompensateButtonIsLoading] =
    useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const urlRedirect =
  //   'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=';
  const urlRedirect =
    'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=';

  useEffect(() => {
    api
      .get(`users/store/despoluir/1`)
      .then((response: any) => {
        setListCalculations(response.data.total);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  function removeOrder(id: string) {
    api
      .delete(`users/store/despoluir/${id}`)
      .then((response: any) => {
        console.log(response.data);
        toast({
          title: 'Pronto!',
          description: 'Cálculo removido com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
        toast({
          title: 'Ops!',
          description: 'Não foi possível remover o cálculo.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function handleCheckout(total_compensate: any, total_compensate_annual: any) {
    setCheckoutValue({
      monthly: total_compensate,
      annual: total_compensate_annual,
    });
    onOpen();
  }

  function handleCompensate(event: { preventDefault: () => void }) {
    event.preventDefault();
    setCompensateButtonIsLoading(true);
    api
      .post(
        '/checkout',
        JSON.stringify({
          itemId: '1',
          item_description:
            'Créditos de Carbono para Compensação de Emissões Veiculares (tCO₂e)',
          item_amount: '1',
          item_price: compensationValue,
          // item_price: compensationValue.replace('.', '').replace(',', '.'),
          user_name: name,
          user_email: email,
          user_cpf: documentNumber
            .replace('.', '')
            .replace('.', '')
            .replace('-', '')
            .replace('/', '')
            .replace('-', ''),
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        setCompensateButtonIsLoading(false);
        toast({
          title: 'Pronto!',
          description: 'Pedido realizado com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        window.open(`${urlRedirect}${response.data}`);
        window.open('https://despoluir.celo4.earth/#/checkout-info');
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setCompensateButtonIsLoading(false);
        toast({
          title: 'Ops!',
          description: 'Não foi possível realizar o Pedido.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <SidebarWithHeader>
        <TableContainer bg="white" rounded={'md'} boxShadow={'2xl'}>
          <Table variant="simple" size="md" p={4} w={'full'}>
            <TableCaption>
              Valores dos cálculos cadastrados para compensar
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Mês</Th>
                <Th>tCO2e (mensal)</Th>
                <Th>tCO2e (anual)</Th>
                <Th>Valor para Compensação (mensal)</Th>
                <Th>Valor para Compensação (anual)</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listCalculations.map((item: any, index: any) => (
                <Tr key={index}>
                  <Td>{item.month}</Td>
                  <Td>{item.tco2e}</Td>
                  <Td>{item.tco2e_annual}</Td>
                  <Td>R$ {item.total_compensate}</Td>
                  <Td>R$ {item.total_compensate_annual}</Td>
                  <Td>
                    <Button
                      size="md"
                      leftIcon={<DeleteIcon />}
                      onClick={() => removeOrder(item.id)}
                    >
                      Remover
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size="md"
                      bg={'#004AAD'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}
                      onClick={() =>
                        handleCheckout(
                          item.total_compensate,
                          item.total_compensate_annual,
                        )
                      }
                    >
                      Compensar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Checkout (Criando Pedido)</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Preencha as informações para concluir o pedido
            </ModalBody>

            <form onSubmit={handleCompensate}>
              <Box p={8}>
                <FormControl id="doc" w="full">
                  <FormLabel>
                    Deseja Compensar emissões mensais ou anuais?
                  </FormLabel>
                  <Select
                    onChange={(e: any) => setCompensationValue(e.target.value)}
                  >
                    <option value="" key={0}></option>

                    <option value={checkoutValue.monthly} key={1}>
                      Mensal R$ {checkoutValue.monthly}
                    </option>

                    <option value={checkoutValue.annual} key={2}>
                      Anual R$ {checkoutValue.annual}
                    </option>
                  </Select>
                </FormControl>

                <FormControl id="doc" w="full">
                  <FormLabel>Cpf ou Cnpj</FormLabel>
                  <CpfCnpj
                    required
                    value={documentNumber}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >,
                    ) => setDocumentNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      outline: 'blue',
                      border: '1px solid #EDF2F7',
                      borderRadius: '0.5rem',
                    }}
                  />
                </FormControl>

                <FormControl id="name">
                  <FormLabel>Nome Completo</FormLabel>
                  <Input
                    type="text"
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    type="email"
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Box>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Fechar
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  loadingText="Concluindo"
                  isLoading={compensateButtonIsLoading}
                >
                  Concluir
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    </>
  );
}
