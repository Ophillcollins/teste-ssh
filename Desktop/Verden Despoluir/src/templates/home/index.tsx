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
  Spinner,
  Link,
  VStack,
  Divider,
  chakra,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import bgHome from '../../assets/bg-home.png';
import LargeWithAppLinksAndSocial from '../../components/Footer';

export default function HomeTemplate() {
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
              py={{ base: 4, md: 20 }}
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
                <Box
                  position={'relative'}
                  height={'300px'}
                  rounded={'2xl'}
                  boxShadow={'2xl'}
                  width={'full'}
                  overflow={'hidden'}
                  shadow="md"
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
                </Box>
              </Flex>
            </Stack>

            {/* <Flex
              direction={{
                base: 'column',
                md: 'row',
              }}
              _light={{
                bg: 'brand.500',
              }}
              py={24}
              mx="auto"
            >
              <Box
                w={{
                  base: 'full',
                  md: 11 / 12,
                  xl: 9 / 12,
                }}
                mx="auto"
                pr={{
                  md: 20,
                }}
              >
                <Text color={'#004AAD'} fontSize="3xl">
                  Cadastre-se na plataforma Verden
                </Text>
                <Text color={'gray.500'} my={6}>
                  Fazendo o cadastro na plataforma Verden, você pode gerenciar e
                  compensar suas emissões. O gerenciamento garante: Gestão
                  completa das suas emissões, gestão das compensações que foram
                  geradas, detalhamento de gás de efeito estufa emitidos e
                  compensados e emissão de certificado de compensação de
                  emissões.
                </Text>
                <Stack
                  direction={{
                    base: 'column',
                    sm: 'row',
                  }}
                  mb={{
                    base: 4,
                    md: 8,
                  }}
                  spacing={2}
                >
                  <Box display="inline-flex" rounded="md" shadow="md">
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
                      Cadastre-se
                    </Button>
                  </Box>
                </Stack>
              </Box>
              <Box
                w={{
                  base: 'full',
                  md: 10 / 12,
                }}
                mx="auto"
                textAlign="center"
              >
                <Image
                  w="full"
                  rounded={'2xl'}
                  shadow="md"
                  src="https://kutty.netlify.app/hero.jpg"
                  alt="Hellonext feedback boards software screenshot"
                />
              </Box>
            </Flex> */}
          </Container>
          {/* <LargeWithAppLinksAndSocial /> */}
        </>
      )}
    </>
  );
}
