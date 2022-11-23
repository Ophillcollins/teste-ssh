import React, { ReactNode, useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Img,
  withDefaultSize,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiList,
  FiDivide,
  FiDollarSign,
  FiUsers,
  FiTruck,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import api from '../../service/api';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Painel', icon: FiHome, url: '#/dashboard-home' },
  { name: 'Calcular emissões GEE', icon: FiDivide, url: '#/dashboard-calculator' },
  {
    name: 'Compensações',
    icon: FiDollarSign,
    url: '#/dashboard-compensations',
  },
  { name: 'Cálculos', icon: FiList, url: '#/dashboard-calculations' },
  {
    name: 'Gerenciar usuários',
    icon: FiUsers,
    url: '#/manage/users',
  },
  {
    name: 'Gerenciar empresas',
    icon: FiTruck,
    url: '#/manage/companies',
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="10" justifyContent="space-between" >
        <Img w='200px' margin='auto 'src="./Logo-Verden-Depoluir-2022-azul-transparente.cb9665040228ff01bcca.png"></Img>
        <CloseButton display={{ base: 'flex', md: 'flex' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} link={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link?: any;
  children: ReactText;
}
const NavItem = ({ link, icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#004AAD',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface Props {
  logout?: any;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const { setAuthenticated } = useAuthContext();

  function signout() {
    api
      .post('/logout')
      .then(function (response: any) {
        console.log(response);
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        // api.defaults.headers.common['Authorization'] = undefined;
        api.defaults.headers.common['Authorization'] = '';
        navigate('/signin');
      })
      .catch(function (error: any) {
        console.log(error);
        console.log(error.response);
      });
  }

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

  return (
    <Flex
      Img h={150}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Img w='200px' margin='auto' display={{ base: 'flex', md: 'none' }} 
      src="./Logo-Verden-Depoluir-2022-azul-transparente.cb9665040228ff01bcca.png"></Img>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userName}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => navigate('/user/profile')}>
                Perfil
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={signout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
