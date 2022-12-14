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
            <Text>ReferĂȘncias/fontes</Text>
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
                  CĂĄlculo {index + 1} / {item.category}
                </Text>
                <Table size="sm">
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    LanĂ§amentos Manuais
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>Tipo de veĂ­culo</Td>
                      <Td>{item.category}</Td>
                    </Tr>
                    <Tr>
                      <Td>Quantidade de veĂ­culos na categoria</Td>
                      <Td>{item.vehicles} VeĂ­culo(s)</Td>
                    </Tr>
                    <Tr>
                      <Td>Ano de fabricaĂ§ĂŁo</Td>
                      <Td>{item.year}</Td>
                    </Tr>
                    <Tr>
                      <Td>CombustĂ­vel</Td>
                      <Td>{item.fuel}</Td>
                    </Tr>
                    <Tr>
                      <Td>Km total mensal</Td>
                      <Td>{item.distance} Km</Td>
                    </Tr>
                    <Tr>
                      <Td>Km mĂ©dio por litro</Td>
                      <Td>{item.liter} Km/Litro</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Percentuais BiocombustĂ­vel
                  </Text>

                  <Text fontSize="2x1" ml={4} fontWeight={600}>
                    Percentual Gasolina CÂč
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
                    Percentual DieselÂČ
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
                    Fatores de emissĂŁo
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>Fator COâ {item.fuel}Âł</Td>
                      <Td>{item.factor_co2_level_2} kgCO2/litro</Td>
                    </Tr>
                    {item.fuel == 'Diesel' ? (
                      <Tr>
                        <Td> Fator COâ BiodieselÂł</Td>
                        <Td> {item.factor_co2_level_3} kgCO2/litro</Td>
                      </Tr>
                    ) : (
                      <Tr>
                        <Td> Fator COâ Etanol AnidroÂł</Td>
                        <Td> {item.factor_co2_level_3} kgCO2/litro</Td>
                      </Tr>
                    )}
                    <Tr>
                      <Td>Fator CHââŽ</Td>
                      <Td>{item.factor_ch4} gCHâ/ km</Td>
                    </Tr>
                    <Tr>
                      <Td> Fator NâOâŽ</Td>
                      <Td> {item.factor_n20} gNâO/km</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Potencial de aquecimento global por gĂĄs emitidoâ”
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td> GWP COâ</Td>
                      <Td>{item.gwp_co2}</Td>
                    </Tr>
                    <Tr>
                      <Td> GWP CHâ</Td>
                      <Td> {item.gwp_ch4}</Td>
                    </Tr>
                    <Tr>
                      <Td>GWP NâO</Td>
                      <Td>{item.gwp_n20}</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 1: ApuraĂ§ĂŁo de volume mensal de combustĂ­vel (Litro)
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>
                        {' '}
                        Km total mensal ({item.distance}) / Km mĂ©dio por litro (
                        {item.liter}) = Volume de combustĂ­vel Mensal (
                        {item.monthly_fuel_volume})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 2: ApuraĂ§ĂŁo do CO2 mensal total {item.fuel}
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 1 - ApuraĂ§ĂŁo do volume mensal de {item.fuel}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustĂ­vel ({item.monthly_fuel_volume}) *
                        Percentual {item.fuel} ({item.percenetual_level_2}) =
                        Volume de combustĂ­vel {item.fuel} mensal (
                        {item.monthly_level_2_fuel_volume})
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 2 - ApuraĂ§ĂŁo do CO2 mensal emitido por {item.fuel}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustĂ­vel {item.fuel} mensal (
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
                      Fase 3: ApuraĂ§ĂŁo do CO2 mensal total BiocombustĂ­vel
                    </Text>

                    <Tbody>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 1 - ApuraĂ§ĂŁo do volume mensal de BiocombustĂ­vel
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustĂ­vel ({item.monthly_fuel_volume}) *
                          Percentual BiocombustĂ­vel({item.percenetual_level_3})
                          = Volume de combustĂ­vel BiocombustĂ­vel mensal (
                          {item.monthly_level_3_fuel_volume})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 2 - ApuraĂ§ĂŁo do CO2 mensal emitido por
                          BiocombustĂ­vel
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustĂ­vel BiocombustĂ­vel (
                          {item.monthly_level_3_fuel_volume}) * Fator CO2
                          BiocombustĂ­vel({item.factor_co2_level_3}) / 1.000 =
                          CO2 Total mensal BiocombustĂ­vel (
                          {item.monthly_level_3_co2})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          * As emissĂ”es de CO2 biogĂȘnico nĂŁo sĂŁo incluĂ­das nas
                          emissĂ”es totais, mas sĂŁo indicadas separadamente na
                          fase 3.
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                ) : null}

                {item.fuel == 'Gasolina C' ? (
                  <Table size="sm" marginTop={10}>
                    <Text fontSize="3x1" ml={4} fontWeight={600}>
                      Fase 3: ApuraĂ§ĂŁo do CO2 mensal total Etanol Anidro
                    </Text>

                    <Tbody>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 1 - ApuraĂ§ĂŁo do volume mensal de Etanol Anidro
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustĂ­vel ({item.monthly_fuel_volume}) *
                          Percentual Etanol Anidro({item.percenetual_level_3}) =
                          Volume de combustĂ­vel Etanol Anidro mensal (
                          {item.monthly_level_3_fuel_volume})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>
                          {' '}
                          Etapa 2 - ApuraĂ§ĂŁo do CO2 mensal emitido por Etanol
                          Anidro
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          Volume de combustĂ­vel Etanol Anidro (
                          {item.monthly_level_3_fuel_volume}) * Fator CO2 Etanol
                          Anidro({item.factor_co2_level_3}) / 1.000 = CO2 Total
                          mensal Etanol Anidro ({item.monthly_level_3_co2})
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          {' '}
                          * EmissĂ”es de biocombustĂ­veis nĂŁo se aplicam ao
                          cĂĄlculo das emissĂ”es de Etanol Hidratado.
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                ) : null}

                {item.fuel == 'Etanol Hidratado' ? (
                  <Table size="sm" marginTop={10}>
                    <Text fontSize="3x1" ml={4} fontWeight={600}>
                      Fase 3: EmissĂ”es de biocombustĂ­veis nĂŁo se aplica ao
                      cĂĄlculo das emissĂ”es de Etanol Hidratado.
                    </Text>
                  </Table>
                ) : null}

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 4: ApuraĂ§ĂŁo do CH4 mensal
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustĂ­vel mensal ({item.monthly_fuel_volume}
                        ) * Fator CH4({item.factor_ch4}) * Autonomia (
                        {item.liter}) / 1.000,000 = CH4 mensal (
                        {item.ch4_monthly})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 5: ApuraĂ§ĂŁo do N2O mensal
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td>
                        {' '}
                        Volume de combustĂ­vel mensal ({item.monthly_fuel_volume}
                        ) * Fator N2O({item.factor_n20}) * Autonomia (
                        {item.liter}) / 1.000,000 = N2O mensal (
                        {item.n2o_monthly})
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 6: ApuraĂ§ĂŁo CO2e mensal
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 1 - ApuraĂ§ĂŁo do CO2e mensal por veĂ­culo
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>
                        {' '}
                        CO2e (CO2) mensal ({item.co2_monthly}) * GWP CO2 (
                        {item.gwp_co2}) + CO2e (CH4) mensal ({item.ch4_monthly})
                        * GWP CH4 ({item.gwp_ch4}) + CO2e (N2O) mensal (
                        {item.n2o_monthly}) * GWP N2O ({item.gwp_n20}) = CO2e
                        mensal por veĂ­culo ({item.co2e_total_monthly_by_vehicle}
                        )
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table size="sm" marginTop={10}>
                  <Text fontSize="3x1" ml={4} fontWeight={600}>
                    Fase 7: Estimativas das emissĂ”es anuais totais
                  </Text>

                  <Tbody>
                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 1 - CO2e mensal X Estimativa de emissĂ”es anuais
                        por veĂ­culo:
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>
                        {' '}
                        CO2e mensal Total ({
                          item.co2e_total_monthly_by_vehicle
                        }{' '}
                        tCOâe) * 12 = CO2e anual Total (
                        {item.co2e_total_annual_by_vehicle} tCOâe)
                      </Td>
                    </Tr>

                    <Tr>
                      <Td fontWeight={600}>
                        {' '}
                        Etapa 2 - MultiplicaĂ§ĂŁo do CO2e anual Total pela
                        quantidade de veĂ­culos
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {' '}
                        CO2e anual total ({item.co2e_total_annual_by_vehicle}) *
                        Quantidade de veĂ­culos na categoria({item.vehicles}) =
                        CO2e anual Total ({item.co2e_annual_total} tCOâe)
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
