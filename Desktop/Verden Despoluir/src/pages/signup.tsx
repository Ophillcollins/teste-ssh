import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  useToast,
} from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Header from '../components/Header';
import { FcGoogle } from 'react-icons/fc';
import api from '../service/api';

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');
  const headers = { 'Content-Type': 'application/json' };
  const [buttonIsLoading, setButtonsLoading] = useState(false);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  const handleSubmit = () => {
    setButtonsLoading(true);
    api
      .post(
        '/users',
        JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
        { headers: headers },
      )
      .then(function (response: any) {
        toast({
          title: 'Pronto!',
          description: 'Cadastro realizado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setButtonsLoading(false);
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      })
      .catch(function (error: any) {
        toast({
          title: 'Ops!',
          description: 'Não foi possível realizar o cadastro.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setButtonsLoading(false);
        console.log(error);
        console.log(error.response);
      });
  };

  function handleRegisterGoogle(response: any) {
    const {
      profileObj: { name, email },
    } = response;
    setUserName(name);
    setUserEmail(email);

    toast({
      title: 'Pronto!',
      description:
        'Você recebeu as informações de sua conta google, agora só falta inserir uma senha para finalizar o cadastro.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  function handleFailureGoogle() {
    toast({
      title: 'Ops!',
      description: 'Não foi possível realizar o cadastro com google.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }

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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Cadastre-se
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Fazendo o cadastro na plataforma Verden, você pode gerenciar e
              compensar suas emissões. O gerenciamento garante: Gestão completa
              das suas emissões, gestão das compensações que foram geradas,
              detalhamento de gás de efeito estufa emitidos e compensados e
              emissão de certificado de compensação de emissões. ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box w="full">
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nome Completo</FormLabel>
                    <Input
                      type="text"
                      value={userName}
                      onChange={(e: any) => setUserName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e: any) => setUserEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e: any) => setUserPassword(e.target.value)}
                  />
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
              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={buttonIsLoading}
                  loadingText="realizando cadastro"
                  onClick={handleSubmit}
                >
                  Cadastre-se
                </Button>
              </Stack>

              <GoogleLogin
                clientId="150291283379-jnhauidm3hgl2kvj4calc1jf7gv5adlq.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    w={'full'}
                    maxW={'md'}
                    variant={'outline'}
                    leftIcon={<FcGoogle />}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <Center>
                      <Text>Cadastre-se com Google</Text>
                    </Center>
                  </Button>
                )}
                buttonText="Cadastre-se com Google"
                onSuccess={handleRegisterGoogle}
                onFailure={handleFailureGoogle}
                cookiePolicy={'single_host_origin'}
              />

              <Stack pt={6}>
                <Text align={'center'}>
                  Já tem cadastro?{' '}
                  <Link color={'blue.400'} onClick={() => navigate('/signin')}>
                    Entre
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
