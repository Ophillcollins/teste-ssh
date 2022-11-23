import { useState } from 'react';
import SidebarWithHeader from '../components/SidebarWithHeader';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';
import api from '../service/api';

export default function DashboardUserProfile() {
  const [userName, setUserName] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const toast = useToast();

  function handleSubmit() {
    setButtonLoading(true);
    api
      .post(
        '/users/profile',
        JSON.stringify({
          name: userName,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(function (response) {
        setButtonLoading(false);
        console.log(response);
        toast({
          title: 'Pronto!',
          description: 'Dados do perfil atualizados com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          document.location.reload();
        }, 4000);
      })
      .catch(function (error) {
        setButtonLoading(false);
        toast({
          title: 'Ops!',
          description: 'Não foi possível atualizar os dados do perfil.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
        console.log(error.response);
      });
  }

  return (
    <>
      <SidebarWithHeader>
        <Text fontSize="2xl">Perfil</Text>
        <Text fontSize="sm">Atualizar dados do perfil</Text>

        <Box maxW="full" bg="white" rounded={'md'} my={6} p={4}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                required
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.target.value)
                }
              />
            </FormControl>

            <Stack
              spacing={4}
              my={4}
              direction={{ base: 'column', md: 'row' }}
              justifyContent="right"
              align="center"
            >
              <Button
                type="submit"
                bg={'#004AAD'}
                color={'white'}
                _hover={{
                  bg: 'blue.600',
                }}
                size="md"
                isLoading={buttonLoading}
                loadingText="Atualizando"
              >
                Atualizar
              </Button>
            </Stack>
          </form>
        </Box>
      </SidebarWithHeader>
    </>
  );
}
