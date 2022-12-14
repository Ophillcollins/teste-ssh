import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Center,
  Box,
  chakra,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
} from '@chakra-ui/react';
import { useFetch } from '../hooks/useFetch';
import { useAuthContext } from '../context/authContext';
import SidebarWithHeader from '../components/SidebarWithHeader';
import api from '../service/api';
import { useEmissions } from '../context/emissions';

interface StatsCardProps {
  title: string;
  stat: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      bg={'white'}
    >
      <StatLabel fontWeight={'medium'}>{title}</StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default function DashboardEmissions() {
  const navigate = useNavigate();
  const { emissions } = useEmissions();
  const [buttonLoading, setButtonLoading] = useState(false);
  const toast = useToast();

  function storeCalculation() {
    setButtonLoading(true);
    api
      .post(
        '/users/store/despoluir',
        JSON.stringify(
          emissions.emissions_by_categories.map((detail: any, item: any) => ({
            month: detail.month,
            category: detail.category,
            subcategory: detail.subcategory.name,
            year: detail.year,
            fuel: detail.fuel,
            ch4: detail.subcategory.factors.CH4.replace(',', '.'),
            n2o: detail.subcategory.factors.N2O.replace(',', '.'),
            co2: detail.subcategory.factors.CO2.replace(',', '.'),
            tco2e: emissions.total_CO2e_monthly
              .replace(/\./g, '')
              .replace(',', '.'),
            tco2e_annual: emissions.total_CO2e_annual
              .replace(/\./g, '')
              .replace(',', '.'),
            total_compensate: emissions.total_compensation_monthly
              .replace(/\./g, '')
              .replace(',', '.'),
            total_compensate_annual: emissions.total_compensation_annual
              .replace(/\./g, '')
              .replace(',', '.'),
          })),
        ),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {
        setButtonLoading(false);
        toast({
          title: 'Pronto!',
          description: 'C??lculo armazeznado com sucesso.',
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
          title: 'Ops!',
          description: 'N??o foi poss??vel armazenar o c??lculo.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <SidebarWithHeader>
        <Center bg={'#EDF2F7'}>
          <Box maxW="7xl" mx={'auto'} p={3} bg={'#EDF2F7'}>
            <chakra.h1
              textAlign={'center'}
              fontSize={'2xl'}
              py={10}
              fontWeight={'bold'}
            >
              Aqui esta o resultado de suas emiss??es
            </chakra.h1>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={{ base: 4, lg: 8 }}
            >
              <StatsCard
                title={'Valor para compensa????o mensal'}
                stat={`R$ ${emissions.total_compensation_monthly}`}
              />
              <StatsCard
                title={'Valor para compensa????o anual'}
                stat={`R$ ${emissions.total_compensation_annual}`}
              />
              <StatsCard
                title={'Emiss??es tCO???e Mensal (Toneladas)'}
                stat={`${emissions.total_CO2e_monthly} tCO???e`}
              />
              <StatsCard
                title={'Emiss??es tCO???e Anual (Toneladas)'}
                stat={`${emissions.total_CO2e_annual} tCO???e`}
              />
            </SimpleGrid>

            <Stack
              spacing={4}
              direction={{ base: 'column', md: 'row' }}
              justifyContent="right"
              align="center"
              rounded={'lg'}
              bg={'white'}
              p={6}
              mt="6"
              shadow={'xl'}
            >
              <Button
                size="md"
                w={{ base: 'full' }}
                onClick={() => navigate('/dashboard-calculator')}
              >
                Calcular novamente
              </Button>
              <Button
                w={{ base: 'full' }}
                bg={'#004AAD'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                size="md"
                isLoading={buttonLoading}
                loadingText="Armazenando c??lculo"
                onClick={storeCalculation}
              >
                Armazenar C??lculo
              </Button>
            </Stack>
          </Box>
        </Center>

        <Center py={6} bg={'#EDF2F7'}>
          <Stack direction="column" align="center" w="full">
            {emissions !== '' ? (
              emissions.emissions_details.map((detail: any, index: string) => (
                <Box
                  maxW="7xl"
                  w={'full'}
                  boxShadow={'2xl'}
                  rounded={'md'}
                  overflow={'hidden'}
                  mx={'auto'}
                  key={index}
                >
                  <TableContainer
                    bg="white"
                    rounded={'md'}
                    boxShadow={'2xl'}
                    mt={10}
                  >
                    <Table>
                      <TableCaption>
                        Detalhes C??lculo N??
                        {index + 1}-{detail.category}.
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Campo</Th>
                          <Th>Valor</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>M??s</Td>
                          <Td>{detail.month}</Td>
                        </Tr>
                        <Tr>
                          <Td>Categoria</Td>
                          <Td>{detail.category}</Td>
                        </Tr>
                        <Tr>
                          <Td>Subcategoria</Td>
                          <Td>{detail.subcategory.name}</Td>
                        </Tr>
                        <Tr>
                          <Td>N??mero de ve??culos</Td>
                          <Td>{detail.vehicles}</Td>
                        </Tr>
                        <Tr>
                          <Td>Combust??vel consumido</Td>
                          <Td>{detail.fuel}</Td>
                        </Tr>
                        <Tr>
                          <Td>Quilometragem por litro</Td>
                          <Td>{detail.liter.replace('.', ',')} Km/litro</Td>
                        </Tr>
                        <Tr>
                          <Td>Quilometragem m??dia mensal</Td>
                          <Td>{detail.distance} Km/M??dio mensal</Td>
                        </Tr>
                        <Tr>
                          <Td>Ano</Td>
                          <Td>{detail.year}</Td>
                        </Tr>
                        <Tr>
                          <Td>tCO??? (Di??xido de Carbono) Mensal</Td>
                          <Td>
                            {detail.subcategory.factors.co2_monthly + ' tCO???'}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>tCH??? (Metano) Mensal</Td>
                          <Td>
                            {detail.subcategory.factors.ch4_monthly + ' tCH???'}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>tN???O (??xido Nitroso) Mensal</Td>
                          <Td>
                            {detail.subcategory.factors.n2o_monthly + ' tN???O'}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>tCO???e m??dio mensal por ve??culo</Td>
                          <Td>
                            {detail.subcategory.factors
                              .co2e_total_monthly_by_vehicle + ' tCO???e'}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>tCO???e mensal total</Td>
                          <Td>
                            {detail.subcategory.factors.co2e_monthly_total +
                              ' tCO???e'}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              ))
            ) : (
              <chakra.h2
                textAlign={'center'}
                fontSize={'3l'}
                py={10}
                fontWeight={'bold'}
              >
                Este c??lculos n??o possui mais detalhes
              </chakra.h2>
            )}
          </Stack>
        </Center>
      </SidebarWithHeader>
    </>
  );
}
