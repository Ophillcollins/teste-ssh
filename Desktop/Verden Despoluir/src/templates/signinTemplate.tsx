import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useAuthContext } from '../context/authContext';
import api from '../service/api';

type Props = {
  onClickRegister?: any;
};

export default function SigninTemplate(props: Props) {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthContext();
  const toast = useToast();
  const headers = { 'Content-Type': 'application/json' };
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonIsLoading, setButtonsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonsLoading(true);
    api
      .post(
        '/login',
        JSON.stringify({
          email: email,
          password: password,
        }),
        { headers: headers },
      )
      .then(function (response: any) {
        const { Token, email } = response.data;
        localStorage.setItem('token', JSON.stringify(Token));
        localStorage.setItem('email', JSON.stringify(email));
        api.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
        setAuthenticated(true);
        setButtonsLoading(false);
        toast({
          title: 'Pronto!',
          description: 'Login realizado com sucesso.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate('/checkout');
        }, 1000);
      })
      .catch(function (error: any) {
        setButtonsLoading(false);
        console.log(error);
        console.log(error.response);
        if (error.response.data.is_verified == false) {
          toast({
            title: 'Ops!',
            description:
              'Você precisa verificar seu e-mail antes de acessar a plataforma verden',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Ops!',
            description: 'Não foi possível realizar o login.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  function sendPasswordReset() {
    if (email == '') {
      toast({
        title: 'E-mail não informado!',
        description:
          'Por favor, insira um e-mail válido para poder receber o código de alteração de senha.',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
    } else {
      api
        .post(
          '/send/password/reset/link',
          JSON.stringify({
            email: email,
          }),
          { headers: headers },
        )
        .then(function (response: any) {
          toast({
            title: 'Código de alteração enviado!',
            description:
              'Enviamos para seu e-mail um código para alteração de senha.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        })
        .catch(function (error: any) {
          console.log(error);
          console.log(error.response);
          toast({
            title: 'Ops!',
            description: 'Não foi possível enviar o código ~para seu e-mail.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        });
    }
  }

  return (
    <>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} p={8}>
          <Stack spacing={4}>
            <Heading fontSize={'2xl'} textAlign={'left'} mb={4}>
              Acesse sua conta para finalizar o seu pedido de compensação
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <InputGroup onChange={(e: any) => setPassword(e.target.value)}>
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Link color={'blue.400'} onClick={sendPasswordReset}>
                    Esqueceu sua senha?
                  </Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  isLoading={buttonIsLoading}
                  loadingText="realizando login"
                >
                  Entrar
                </Button>
              </Stack>
            </form>

            <Stack>
              <Text align={'center'}>
                Não tem cadastro?{' '}
                <Link color={'blue.400'} onClick={props.onClickRegister}>
                  cadastre-se
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
