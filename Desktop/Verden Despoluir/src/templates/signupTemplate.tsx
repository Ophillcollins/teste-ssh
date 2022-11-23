import { useState } from 'react';
import {
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
import { FcGoogle } from 'react-icons/fc';
import api from '../service/api';

type Props = {
  onClickRegister?: any;
};

export default function SignupTemplate(props: Props) {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const headers = { 'Content-Type': 'application/json' };
  const [buttonIsLoading, setButtonsLoading] = useState(false);

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
          description:
            'Você realizou o cadastro na plataforma verden, Agora, para você poder acessar a plataforma, acesse seu e-mail cadastrado e finalize o processo de verificação da conta',
          status: 'success',
          duration: 20000,
          isClosable: true,
        });
        setButtonsLoading(false);
      })
      .catch(function (error: any) {
        setButtonsLoading(false);
        console.log(error);
        if (error.response.data.isDuplicated == true) {
          toast({
            title: 'Ops!',
            description: error.response.data.message,
            status: 'info',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Ops!',
            description:
              'Não foi possível realizar o cadastro. Por favor, tente novamente',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box w="full">
                <Heading fontSize={'2xl'} textAlign={'left'} mb={4}>
                  Cadastre-se para finalizar o seu pedido de compensação
                </Heading>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nome Completo</FormLabel>
                  <Input
                    type="text"
                    value={userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserName(e.target.value)
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserEmail(e.target.value)
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserPassword(e.target.value)
                  }
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
                <Link color={'blue.400'} onClick={props.onClickRegister}>
                  Acesse sua conta
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
