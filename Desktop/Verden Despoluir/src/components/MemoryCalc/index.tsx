import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Stack,
} from '@chakra-ui/react';
import { useEmissions } from '../../context/emissions';

export default function MemoryCalc() {
  const { emissions } = useEmissions();

  return (
    <>
      <Center bg={'white'}>
        <Box w={'full'} bg="white" mx={'auto'} p={6}>
          <UnorderedList>
            <Text>Referências/fontes</Text>
            <ListItem>
              <Link
                color="teal.500"
                href="https://pesquisa.in.gov.br/imprensa/jsp/visualiza/index.jsp?data=06/03/2015&jornal=1&pagina=17&totalArquivos=200"
                target="_blank"
              >
                1 Fonte:
                https://pesquisa.in.gov.br/imprensa/jsp/visualiza/index.jsp?data=06/03/2015&jornal=1&pagina=17&totalArquivos=200
              </Link>
            </ListItem>
            <ListItem>
              <Link
                color="teal.500"
                href="https://www.gov.br/mme/pt-br/assuntos/conselhos-e-comites/cnpe/resolucoes-do-cnpe/resolucoes-2021/copy2_of_ResoluesCNPE252021.pdf"
                target="_blank"
              >
                2 Fonte:
                https://www.gov.br/mme/pt-br/assuntos/conselhos-e-comites/cnpe/resolucoes-do-cnpe/resolucoes-2021/copy2_of_ResoluesCNPE252021.pdf
              </Link>
            </ListItem>
            <ListItem>
              <Link
                color="teal.500"
                href="https://antigo.mma.gov.br/images/arquivo/80060/Inventario_de_Emissoes_por_Veiculos_Rodoviarios_2013.pdf"
                target="_blank"
              >
                3 Fonte:
                hhttps://antigo.mma.gov.br/images/arquivo/80060/Inventario_de_Emissoes_por_Veiculos_Rodoviarios_2013.pdf
              </Link>
            </ListItem>
            <ListItem>
              <Link
                color="teal.500"
                href="https://cetesb.sp.gov.br/veicular/wp-content/uploads/sites/6/2022/03/Relatorio-Emissoes-Veiculares-2020.pdf"
                target="_blank"
              >
                4 Fonte:
                https://cetesb.sp.gov.br/veicular/wp-content/uploads/sites/6/2022/03/Relatorio-Emissoes-Veiculares-2020.pdf
              </Link>
            </ListItem>
            <ListItem>
              <Link
                color="teal.500"
                href="https://www.ghgprotocol.org/sites/default/files/ghgp/Global-Warming-Potential-Values%20%28Feb%2016%202016%29_1.pdf"
                target="_blank"
              >
                5 Fonte: AR 5
                https://www.ghgprotocol.org/sites/default/files/ghgp/Global-Warming-Potential-Values%20%28Feb%2016%202016%29_1.pdf
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Center>

      {/* <Center py={6} bg={'#EDF2F7'}> */}
      <Center bg={'white'}>
        <Stack direction="column" align="center" w="full">
          {emissions.calculation_memory.map((item: any, index: any) => (
            <Box
              maxW="7xl"
              w={'full'}
              // boxShadow={'2xl'}
              rounded={'md'}
              mx={'auto'}
              bg="white"
              key={index}
            >
              <TableContainer>
                <Text fontSize="2xl" textAlign="center">
                  Cálculo {index + 1} / {item.category}
                </Text>
                <Table size="sm">
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Lançamentos Manuais
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>Tipo de veículo</Td>
                      <Td>{item.category}</Td>
                    </Tr>
                    <Tr>
                      <Td>Quantidade de veículos na categoria</Td>
                      <Td>{item.vehicles} Veículo(s)</Td>
                    </Tr>
                    <Tr>
                      <Td>Ano de fabricação</Td>
                      <Td>{item.year}</Td>
                    </Tr>
                    <Tr>
                      <Td>Combustível</Td>
                      <Td>{item.fuel}</Td>
                    </Tr>
                    <Tr>
                      <Td>Km total mensal</Td>
                      <Td>{item.distance} Km</Td>
                    </Tr>
                    <Tr>
                      <Td>Km médio por litro</Td>
                      <Td>{item.liter} Km/Litro</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Percentuais Biocombustível
                  </Text>

                  <Text fontSize="2x1" ml={4} fontWeight={600}>
                    Percentual Gasolina C¹
                  </Text>
                  <Tbody>
                    <Tr>
                      <Td>Gasolina C 73%</Td>
                    </Tr>
                    <Tr>
                      <Td> Etanol Anidro 27%</Td>
                    </Tr>
                  </Tbody>
                  <Text fontSize="2x1" ml={4} fontWeight={600}>
                    Percentual Diesel²
                  </Text>
                  <Tbody>
                    <Tr>
                      <Td>Diesel 90%</Td>
                    </Tr>
                    <Tr>
                      <Td>Biodiesel 10%</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fatores de emissão
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>Fator CO₂ {item.fuel}³</Td>
                      <Td>{item.factor_co2_level_2} kgCO2/litro</Td>
                    </Tr>
                    {item.fuel == 'Diesel' ? (
                      <Tr>
                        <Td> Fator CO₂ Biodiesel³</Td>
                        <Td> {item.factor_co2_level_3} kgCO2/litro</Td>
                      </Tr>
                    ) : (
                      <Tr>
                        <Td> Fator CO₂ Etanol Anidro³</Td>
                        <Td> {item.factor_co2_level_3} kgCO2/litro</Td>
                      </Tr>
                    )}
                    <Tr>
                      <Td>Fator CH₄⁴</Td>
                      <Td>{item.factor_ch4} gCH₄/ km</Td>
                    </Tr>
                    <Tr>
                      <Td> Fator N₂O⁴</Td>
                      <Td> {item.factor_n20} gN₂O/km</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Potencial de aquecimento global por gás emitido⁵
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td> GWP CO₂</Td>
                      <Td>{item.gwp_co2}</Td>
                    </Tr>
                    <Tr>
                      <Td> GWP CH₄</Td>
                      <Td> {item.gwp_ch4}</Td>
                    </Tr>
                    <Tr>
                      <Td>GWP N₂O</Td>
                      <Td>{item.gwp_n20}</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 1: Apuração de volume mensal de combustível (Litro)
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>
                        {' '}
                        Km total mensal ({item.distance}) / Km médio por litro (
                        {item.liter}) = Volume de combustível Mensal (
                        {item.monthly_fuel_volume})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 2: Apuração do CO2 mensal total {item.fuel}
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 1 - Apuração do volume mensal de {item.fuel}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustível ({item.monthly_fuel_volume}) *
                        Percentual {item.fuel} ({item.percenetual_level_2}) =
                        Volume de combustível {item.fuel} mensal (
                        {item.monthly_level_2_fuel_volume})
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 2 - Apuração do CO2 mensal emitido por {item.fuel}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustível {item.fuel} mensal (
                        {item.monthly_level_2_fuel_volume}) * Fator CO2{' '}
                        {item.fuel} ({item.factor_co2_level_2}) / 1.000 = CO2
                        Total mensal {item.fuel} ({item.monthly_level_2_co2})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                {item.fuel == 'Diesel' ? (
                  <Table size="sm" marginTop={10}>
                    <Text fontSize="3x1" ml={4} fontWeight={600}>
                      Fase 3: Apuração do CO2 mensal total Biocombustível
                    </Text>

                    <Tbody>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 1 - Apuração do volume mensal de Biocombustível
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustível ({item.monthly_fuel_volume}) *
                          Percentual Biocombustível({item.percenetual_level_3})
                          = Volume de combustível Biocombustível mensal (
                          {item.monthly_level_3_fuel_volume})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 2 - Apuração do CO2 mensal emitido por
                          Biocombustível
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustível Biocombustível (
                          {item.monthly_level_3_fuel_volume}) * Fator CO2
                          Biocombustível({item.factor_co2_level_3}) / 1.000 =
                          CO2 Total mensal Biocombustível (
                          {item.monthly_level_3_co2})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          * As emissões de CO2 biogênico não são incluídas nas
                          emissões totais, mas são indicadas separadamente na
                          fase 3.
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                ) : null}

                {item.fuel == 'Gasolina C' ? (
                  <Table size="sm" marginTop={10}>
                    <Text fontSize="3x1" ml={4} fontWeight={600}>
                      Fase 3: Apuração do CO2 mensal total Etanol Anidro
                    </Text>

                    <Tbody>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 1 - Apuração do volume mensal de Etanol Anidro
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustível ({item.monthly_fuel_volume}) *
                          Percentual Etanol Anidro({item.percenetual_level_3}) =
                          Volume de combustível Etanol Anidro mensal (
                          {item.monthly_level_3_fuel_volume})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 2 - Apuração do CO2 mensal emitido por Etanol
                          Anidro
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustível Etanol Anidro (
                          {item.monthly_level_3_fuel_volume}) * Fator CO2 Etanol
                          Anidro({item.factor_co2_level_3}) / 1.000 = CO2 Total
                          mensal Etanol Anidro ({item.monthly_level_3_co2})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          * Emissões de biocombustíveis não se aplicam ao
                          cálculo das emissões de Etanol Hidratado.
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                ) : null}

                {item.fuel == 'Etanol Hidratado' ? (
                  <Table size="sm" marginTop={10}>
                    <Text fontSize="3x1" ml={4} fontWeight={600}>
                      Fase 3: Emissões de biocombustíveis não se aplica ao
                      cálculo das emissões de Etanol Hidratado.
                    </Text>
                  </Table>
                ) : null}

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 4: Apuração do CH4 mensal
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustível mensal ({item.monthly_fuel_volume}
                        ) * Fator CH4({item.factor_ch4}) * Autonomia (
                        {item.liter}) / 1.000,000 = CH4 mensal (
                        {item.ch4_monthly})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 5: Apuração do N2O mensal
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustível mensal ({item.monthly_fuel_volume}
                        ) * Fator N2O({item.factor_n20}) * Autonomia (
                        {item.liter}) / 1.000,000 = N2O mensal (
                        {item.n2o_monthly})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 6: Apuração CO2e mensal
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 1 - Apuração do CO2e mensal por veículo
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>
                        {' '}
                        CO2e (CO2) mensal ({item.co2_monthly}) * GWP CO2 (
                        {item.gwp_co2}) + CO2e (CH4) mensal ({item.ch4_monthly})
                        * GWP CH4 ({item.gwp_ch4}) + CO2e (N2O) mensal (
                        {item.n2o_monthly}) * GWP N2O ({item.gwp_n20}) = CO2e
                        mensal por veículo ({item.co2e_total_monthly_by_vehicle}
                        )
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 7: Estimativas das emissões anuais totais
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 1 - CO2e mensal X Estimativa de emissões anuais
                        por veículo:
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>
                        {' '}
                        CO2e mensal Total ({
                          item.co2e_total_monthly_by_vehicle
                        }{' '}
                        tCO₂e) * 12 = CO2e anual Total (
                        {item.co2e_total_annual_by_vehicle} tCO₂e)
                      </Td>
                    </Tr>

                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 2 - Multiplicação do CO2e anual Total pela
                        quantidade de veículos
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {' '}
                        CO2e anual total ({item.co2e_total_annual_by_vehicle}) *
                        Quantidade de veículos na categoria({item.vehicles}) =
                        CO2e anual Total ({item.co2e_annual_total} tCO₂e)
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Stack>
      </Center>
    </>
  );
}
