import { useNavigate } from 'react-router-dom';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../context/authContext';
import SidebarWithHeader from '../components/SidebarWithHeader';
import api from '../service/api';
import { useState } from 'react';

export default function DashboardCompensations() {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    compensation_id: '',
    name: '',
    email: '',
    token: '',
    date: '',
  });
  const [sendLoading, setSendLoading] = useState(false);
  const { setAuthenticated } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: listCompensations } = useFetch<any[]>('/compensations');

  function openModal(item: any) {
    setUser({
      compensation_id: item.id,
      name: item.user_name,
      email: item.user_email,
      token: item.tco2e_tokens,
      date: item.compensation_date,
    });
    onOpen();
  }

  function SendCertificate() {
    setSendLoading(true);
    api
      .post(
        '/send-certificate',
        JSON.stringify({
          compensation_id: user.compensation_id,
          name: user.name,
          email: user.email,
          token: user.token,
          date: user.date,
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response: any) {
        setSendLoading(false);
        setAuthenticated(true);
        toast({
          title: 'Pronto!',
          description: 'Certificado enviado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        onClose();
      })
      .catch(function (error: any) {
        console.log(error);
        console.log(error.response);
        setSendLoading(false);
        toast({
          title: 'Ops!',
          description: 'Não foi possível enviar o certificado.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        onClose();
      });
  }

  return (
    <>
      <SidebarWithHeader>
        <TableContainer bg="white" p={6}>
          <Table variant="simple">
            <TableCaption>Sua lista de compensações realizadas</TableCaption>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Cpf/Cnpj</Th>
                <Th>Código de transação</Th>
                <Th>Quantidade de tokens</Th>
                <Th>Valor</Th>
                <Th>Data do pagamento</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listCompensations.map((item: any, index: any) => {
                return (
                  <Tr key={index}>
                    <Td>{item.user_name}</Td>
                    <Td>{item.user_email}</Td>
                    <Td>{item.user_cpf}</Td>
                    <Td>{item.trans_code}</Td>
                    <Td>{item.tco2e_tokens}</Td>
                    <Td>R$ {item.item_price}</Td>
                    <Td>{item.compensation_date}</Td>
                    <Td>{item.status}</Td>
                    <Td>
                      <Button
                        // disabled={item.status == 'Compensado' ? true : false}
                        colorScheme="teal"
                        variant="solid"
                        size="md"
                        onClick={() => openModal(item)}
                      >
                        Emitir Certificado
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enviar Certificado</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Você tem certeza que deseja enviar o certificado de compensação
                para seu e-mail?
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Não
              </Button>
              <Button
                colorScheme="teal"
                variant="solid"
                isLoading={sendLoading}
                loadingText="Enviando"
                onClick={SendCertificate}
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    </>
  );
}
