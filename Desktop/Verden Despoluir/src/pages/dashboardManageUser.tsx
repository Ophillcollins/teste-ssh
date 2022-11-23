/* eslint-disable react/no-children-prop */
import SidebarWithHeader from '../components/SidebarWithHeader';
import { Text } from '@chakra-ui/react';

import CreateUserForm from '../components/Forms/CreateUserForm';

export default function DashboardManageUser() {
  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="2xl">Gerenciar usuários</Text>

        <CreateUserForm />
      </SidebarWithHeader>
    </>
  );
}
