import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Avatar,
  HStack,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Image,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { useAuthContext } from '../context/authContext';
import { ReactNode, useEffect, useState } from 'react';

import logoVerden from '../assets/Logo-Verden-Depoluir-2022-azul-transparente.png';
import logoDespoluir from '../assets/despoluir-logo-verde.png';

export default function CheckoutNavigation() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const { setAuthenticated } = useAuthContext();

  useEffect(() => {
    api
      .get(`/users/1`)
      .then((response: any) => {
        setUserName(response.data.data.name);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  function signout() {
    api
      .post('/logout')
      .then(function (response: any) {
        console.log(response);
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        api.defaults.headers.common['Authorization'] = '';
        navigate('/calculator');
      })
      .catch(function (error: any) {
        console.log(error);
        console.log(error.response);
      });
  }

  const Links = ['Acessar Painel'];

  const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Link>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="white"
        px={4}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              alt={'Logo verden Image'}
              src={logoVerden}
              h="auto"
              w="225px"
              display={{ base: 'none', md: 'flex' }}
            />
            <Image
              alt={'Logo despoluir Image'}
              src={logoDespoluir}
              h="auto"
              w="100px"
              display={{ base: 'none', md: 'flex' }}
            />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link
                fontSize={'sm'}
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                }}
                onClick={signout}
              >
                Início
              </Link>
              {/* <Link
                href={'#/dashboard-home'}
                fontSize={'sm'}
                fontWeight={500}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Acessar Painel
              </Link> */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                mr="2"
              >
                <Text fontSize="sm">{userName}</Text>
              </VStack>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1663597936946-94147639a6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                  }
                />
              </MenuButton>

              <MenuList>
                <MenuDivider />
                <MenuItem onClick={signout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            {/* <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack> */}
            <Link
              fontSize={'sm'}
              fontWeight={500}
              _hover={{
                textDecoration: 'none',
              }}
              onClick={signout}
            >
              Início
            </Link>
            {/* <Link
              href={'#/dashboard-home'}
              fontSize={'sm'}
              fontWeight={500}
              _hover={{
                textDecoration: 'none',
              }}
            >
              Acessar Painel
            </Link> */}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
