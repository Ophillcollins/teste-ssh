import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  useToast,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import api from '../service/api';
import Header from '../components/Header';

export default function ResetPassword() {
  const toast = useToast();
  const headers = { 'Content-Type': 'application/json' };
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNwePassword] = useState('');
  const [buttonResetIsLoading, setResetButtonsLoading] = useState(false);
  const [passwordResetCode, setPasswordResetCode] = useState(false);

  function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setResetButtonsLoading(true);
    api
      .post(
        '/password/reset',
        JSON.stringify({
          email: email,
          password: newPassword,
          token: passwordResetCode,
        }),
        { headers: headers },
      )
      .then(function (response: any) {
        setResetButtonsLoading(false);
        toast({
          title: 'Pronto!',
          description: 'Sua senha foi alterada com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(function (error: any) {
        console.log(error);
        console.log(error.response);
        setResetButtonsLoading(false);
        toast({
          title: 'Ops!',
          description: 'Não foi possível realizar a alteração da senha.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <Header />

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} p={8}>
          <Stack spacing={4}>
            <Heading fontSize={'2xl'} textAlign={'left'} mb={4}>
              Preencha as informações para realizar a alteração de sua senha de
              usuário
            </Heading>
            <form onSubmit={handleResetPassword}>
              <FormControl id="email">
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="password" isRequired mt={2}>
                <FormLabel>Nova senha</FormLabel>
                <InputGroup
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNwePassword(e.target.value)
                  }
                >
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="reset_code" mt={2}>
                <FormLabel>Código de redefinição de senha</FormLabel>
                <Input
                  type="text"
                  onChange={(e: any) => setPasswordResetCode(e.target.value)}
                />
              </FormControl>

              <Stack spacing={10}>
                <Button
                  mt={8}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  isLoading={buttonResetIsLoading}
                  loadingText="Alterando senha"
                >
                  Alterar senha
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
