/* eslint-disable react/no-children-prop */
import SidebarWithHeader from '../components/SidebarWithHeader';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Stack,
} from '@chakra-ui/react';
import UserCompaniesTable from '../components/UserCompaniesTable';
import CreateCompanyForm from '../components/Forms/CreateCompanyForm';

export default function DashboardManageCompanies() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="2xl">Gerenciar Empresas</Text>

        <UserCompaniesTable />

        <Stack
          spacing={4}
          direction={{ base: 'column', md: 'row' }}
          justifyContent="end"
          align="center"
          my={4}
        >
          <Button colorScheme="blue" onClick={onOpen}>
            Cadastrar nova empresa
          </Button>
        </Stack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <CreateCompanyForm />
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    </>
  );
}
