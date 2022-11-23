import { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import bgHome from '../assets/bg-home.png';

import Header from '../components/Header';

export default function Home2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading == true ? (
        <Stack
          direction="row"
          minH={'100vh'}
          minW={'100wh'}
          justifyContent="center"
          align="center"
          spacing={4}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      ) : (
        <>
          <Container maxW={'7xl'}>
            <Stack
              align={'center'}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 20 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
                >
                  <Text
                    as={'span'}
                    position={'relative'}
                    _after={{
                      content: "''",
                      width: 'full',
                      height: '30%',
                      position: 'absolute',
                      bottom: 1,
                      left: 0,
                      bg: 'red.400',
                      zIndex: -1,
                    }}
                  >
                    Sua calculadora de
                  </Text>
                  <br />
                  <Text as={'span'} color={'#004AAD'}>
                    Pegada de carbono
                  </Text>
                </Heading>
                <Text color={'gray.500'}>
                  Emissões diretas de Gases de Efeito Estufa (GEE) são as
                  provenientes de fontes móveis que pertencem ou são controladas
                  pela organização, como, por exemplo, as emissões de veículos
                  de transporte de cargas ou passageiros da empresa.
                  <Link
                    color="teal.500"
                    href="https://s3-sa-east-1.amazonaws.com/arquivos.gvces.com.br/arquivos_ghg/152/especificacoes_pb_ghgprotocol.pdf"
                    target="_blank"
                  >
                    {' '}
                    Saiba mais. <br />
                  </Link>
                  O VERDEN é a ferramenta de apoio ideal para cálculo do Escopo
                  1 das emissões por combustão móvel da frota de veículos da sua
                  empresa ou de uso pessoal. Clique em “Calcular Pegada de
                  Carbono”, descubra e compense suas emissões!
                </Text>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={{ base: 'column', sm: 'row' }}
                >
                  <Button
                    bg={'#004AAD'}
                    size="lg"
                    onClick={() => navigate('/calculator')}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    _focus={{
                      bg: 'blue.600',
                    }}
                  >
                    Calcular pegada de carbono
                  </Button>
                </Stack>
              </Stack>
              <Flex
                flex={1}
                justify={'center'}
                align={'center'}
                position={'relative'}
                w={'full'}
              >
                {/* <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('red.50', 'red.400')}
            /> */}
                <Box
                  position={'relative'}
                  height={'300px'}
                  rounded={'2xl'}
                  boxShadow={'2xl'}
                  width={'full'}
                  overflow={'hidden'}
                >
                  <Image
                    alt={'Hero Image'}
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={'100%'}
                    objectPosition="95% 50%"
                    src={bgHome}
                  />
                  {/* <Image
                alt={'Login Image'}
                objectFit={'cover'}
                objectPosition="95% 50%"
                src={bgHome}
                // src={
                //   'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
                // }
              /> */}
                </Box>
                
              </Flex>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}
