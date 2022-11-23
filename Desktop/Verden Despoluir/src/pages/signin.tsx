import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  Center,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useAuthContext } from '../context/authContext';
import Header from '../components/Header';
import api from '../service/api';

export default function SignIn() {
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
        console.log(response);
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
          navigate('/dashboard-home');
        }, 1000);
      })
      .catch(function (error: any) {
        setButtonsLoading(false);
        toast({
          title: 'Ops!',
          description: 'Não foi possível realizar o login.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
        console.log(error.response);
      });
  };

  return (
    <>
      <Header />

      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Entrar em sua conta</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
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
                  <InputGroup
                    onChange={(e: any) => setPassword(e.target.value)}
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
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Link color={'blue.400'}>Esqueceu sua senha?</Link>
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
              {/* <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Entrar com Google</Text>
                </Center>
              </Button> */}
              <Stack>
                <Text align={'center'}>
                  Não tem cadastro?{' '}
                  <Link color={'blue.400'} onClick={() => navigate('/signup')}>
                    Increva-se
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
