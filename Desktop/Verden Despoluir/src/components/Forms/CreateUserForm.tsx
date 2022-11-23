import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  HStack,
  Stack,
  useToast,
  InputLeftElement,
  InputGroup,
  Checkbox,
} from '@chakra-ui/react';
import api from '../../service/api';
import { PhoneIcon } from '@chakra-ui/icons';

export default function CreateUserForm() {
  const toast = useToast();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRoleCompany, setUserRoleCompany] = useState('');
  const [userBusinessPhone, setUserBusinessPhone] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const createUserUrl = 'admin/register/user';
  const createUserAdminUrl = 'superadmin/register/user';

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setButtonLoading(true);
    api
      .post(
        isAdmin ? createUserAdminUrl : createUserUrl,
        JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
          role_company: userRoleCompany,
          business_phone: userBusinessPhone,
          phone_number: userPhoneNumber,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then(function (response) {
        setButtonLoading(false);
        toast({
          position: 'top-right',
          title: 'Pronto!',
          description: response.data.data.status,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        setButtonLoading(false);
        console.log(error);
        console.log(error.response);
        toast({
          position: 'top-right',
          title: 'Ops!',
          description: error.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <Box maxW="full" bg="white" rounded={'md'} my={6} p={4}>
        <form onSubmit={handleRegister}>
          <FormControl mb={4} isRequired>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>E-mail corporativo</FormLabel>
            <Input
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserEmail(e.target.value)
              }
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPassword(e.target.value)
              }
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Cargo</FormLabel>
            <Input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserRoleCompany(e.target.value)
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Nível de permissão</FormLabel>
            <Checkbox
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIsAdmin(e.target.checked)
              }
            >
              Administrador
            </Checkbox>
          </FormControl>

          <HStack mb={4}>
            <FormControl isRequired>
              <FormLabel>Telefone Comercial</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="Telefone comercial"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserBusinessPhone(e.target.value)
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Telefone celular</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input
                  type="tel"
                  max="11"
                  placeholder="Telefone celular"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserPhoneNumber(e.target.value)
                  }
                />
              </InputGroup>
            </FormControl>
          </HStack>

          <Stack
            spacing={4}
            my={4}
            direction={{ base: 'column', md: 'row' }}
            justifyContent="right"
            align="center"
          >
            <Button
              w={{ base: 'full', md: '175px' }}
              type="submit"
              bg={'#004AAD'}
              color={'white'}
              _hover={{
                bg: 'blue.600',
              }}
              size="md"
              isLoading={buttonLoading}
              loadingText="Criando usuário"
            >
              Criar novo usuário
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
