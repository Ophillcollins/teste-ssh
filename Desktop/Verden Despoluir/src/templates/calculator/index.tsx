/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Wrap, WrapItem } from '@chakra-ui/react';
import { useState, KeyboardEvent } from 'react';
import { icons } from 'react-icons/lib';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Center,
  Stack,
  Button,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  FormHelperText,
  Progress,
  Card,
  CardBody,
  Text,
  StackDivider,
  CardHeader,
  Heading,
  CardFooter,
  Flex,
  IconButton,
  Avatar,
  Img,


} from '@chakra-ui/react';

import { useEmissions } from '../../context/emissions';
import { dataMonth } from '../../constants';
import { useFetch } from '../../hooks/useFetch';
import StepSelect from '../../components/StepSelect';
import StepSelectId from '../../components/StepSelectId';
import StoredCalculationsTemplate from '../storedCalculations';
import { FaColumns } from "react-icons/fa";

type ListOptions = {
  name: string;
  id: string;
};

export default function CalculatorTemplate() {
  // const [month, setMonth] = useState<string>('');
  const [step, setStep] = useState<string>('1');
  const [category, setCategory] = useState<ListOptions>({
    id: '',
  } as ListOptions);
  const [subCategory, setSubCategory] = useState<ListOptions>({
    id: '',
  } as ListOptions);
  const [year, setYear] = useState<string>('');
  const [numberOfVehicles, setNumberOfVehicles] = useState<string>('1');
  const [Km, setKm] = useState<string>('');
  const [literKm, setLiterKm] = useState<string>('');
  const [fuels, setFuels] = useState<ListOptions>({ id: '' } as ListOptions);

  const { setStoredCalculations, month, setMonth } = useEmissions();

  const { data: listCategory } = useFetch<[number | string]>('/categories');
  const { data: listSubCategory } = useFetch<[number | string]>(
    `/categories/${category.id}/subcategories`,
    category.id,
  );
  const { data: listYear } = useFetch<[number | string]>(
    `/categories/${category.id}/subcategories/${subCategory.id}/years`,
    subCategory.id,
  );
  const { data: listFuels } = useFetch<[number | string]>(
    `/categories/${category.id}/subcategories/${subCategory.id}/fuels`,
    subCategory.id,
  );

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  function handleAddToTable() {
    setStoredCalculations((arr: [number | string]) => [
      ...arr,
      {
        month: month,
        category: {
          id: category.id,
          name: category.name,
        },
        subcategory: {
          id: subCategory.id,
          name: subCategory.name,
        },
        fuel: {
          id: fuels.id,
          name: fuels.name,
          measure: 'litro',
        },
        distance: Km.replaceAll(',', '.'),
        vehicles: numberOfVehicles,
        liter: literKm.replaceAll(',', '.'),
        year: year,
      },
    ]);
    setStep('9');
  }

  function restartCalculation() {
    setStep('1');
    setStoredCalculations([]);
    setMonth('');
  }

  return (
    <>
      <Box alignItems='center' maxW='100%' maxH='300px' display='flex' justifyContent='space-between' flexWrap='wrap' padding='0 0 0 2rem' >

        <Card maxW='23%' h='450px' bg="white" mb={4}>
          <CardHeader>
            <Flex display='flex' justifyContent='space-between' alignItems='center'>
              <Flex flex='2' gap='4' alignItems='center'>
                <Box>
                  <Heading alignItems='center' mt={2} size='sm'>Emissões veiculares</Heading>
                </Box>
              </Flex>
            </Flex>
            <Img ml={10} mt={4} w='120px' h='120px' src='Design-veiculos-verden.png'></Img>
          </CardHeader>
          <CardBody>
            <Text mb={14}>
              Clique em calculadora para realizar os calculos veiculares.
            </Text>
            <CardFooter>
              <Button colorScheme='blue' onClick={onOpen}>Calcular emissões</Button>
              <Stack direction='row' spacing={4}></Stack>
            </CardFooter>
          </CardBody>
        </Card>

        <Card maxW='23%' h='450px' bg="white" mb={4}>
          <CardHeader>
            <Flex display='flex' justifyContent='space-between' alignItems='center'>
              <Flex flex='2' gap='4' alignItems='center'>
                <Box>
                  <Heading mt={2} size='sm'>Outras emissões escopo 1</Heading>
                </Box>
              </Flex>
            </Flex>
            <Img ml={10} mt={4} w='120px' h='120px' src='Design-veiculos-verden.png'></Img>          
            </CardHeader>
          <CardBody>
            <Text mt={1} >
              Calcule demais emissões de GEE das atividades operacionais da sua empresa.
            </Text><br />
            <CardFooter>
              <Button colorScheme='blue' >Em breve</Button>
              <Stack direction='row' spacing={4}></Stack>
            </CardFooter>
          </CardBody>
        </Card>

        <Card maxW='23%' h='450px' bg="white" mb={4}>
          <CardHeader>
            <Flex display='flex' justifyContent='space-between' alignItems='center'>
              <Flex flex='2' gap='4' alignItems='center'>
                <Box>
                  <Heading mt={2} size='sm'>Emissões do escopo 2</Heading>
                </Box>
              </Flex>
            </Flex>
            <Img ml={10} mt={4} w='120px' h='120px' src='Design-veiculos-verden.png'></Img>          </CardHeader>
          <CardBody>
            <Text >
              Calcule as emissões da GEE de energia da sua empresa.
            </Text><br /><br /><br />
            <CardFooter>
              <Button colorScheme='blue' >Em breve</Button>
              <Stack direction='row' spacing={4}></Stack>
            </CardFooter>
          </CardBody>
        </Card>

        <Card maxW='23%' h='450px' bg="white" mb={4}>
          <CardHeader>
            <Flex display='flex' justifyContent='space-between' alignItems='center'>
              <Flex flex='2' gap='4' alignItems='center'>
                <Box>
                  <Heading mt={2} size='sm'>Emissões do escopo 3</Heading>
                </Box>
              </Flex>
            </Flex>
            <Img ml={10} mt={4} w='120px' h='120px' src='Design-veiculos-verden.png'></Img>
            </CardHeader>
          <CardBody>
            <Text >
              Calcule as emissões de GEE dos Stakeholders da sua empresa.
            </Text><br /><br />
            <CardFooter>
              <Button colorScheme='blue' >Em breve</Button>
              <Stack direction='row' spacing={4}></Stack>
            </CardFooter>
          </CardBody>
        </Card>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='50%'>
          <ModalHeader>Calcular emissões veiculares</ModalHeader>


          <Center p={{ base: 2, sm: 6 }} bg={'#EDF2F7'}>
            <Box w="full" maxW="x3" boxShadow={'2x1'} bg={'white'} rounded={'md'}>
              {step == '1' ? (
                <>
                  <StepSelect
                    indicator="Etapa 1 de 8"
                    title="Mês da apuração"
                    description="Informe o mês de apuração das emissões"
                    placeholder="Selecione uma opção"
                    data={dataMonth}
                    setData={setMonth}
                    back={false}
                    disabled={month}
                    progress={11}
                    onClickStep={() => setStep('2')}
                  />
                </>
              ) : null}

              {step == '2' ? (
                <StepSelectId
                  indicator="Etapa 2 de 8"
                  title="Categoria"
                  description=" Selecione o tipo de veículo para cálculo"
                  placeholder="Selecione uma opção"
                  data={listCategory}
                  setData={setCategory}
                  back={true}
                  progress={22}
                  disabled={category.id}
                  onClickStepBack={restartCalculation}
                  onClickStep={() => setStep('3')}
                />
              ) : null}

              {step == '3' ? (
                <StepSelectId
                  indicator="Etapa 3 de 8"
                  title="Tipo de Motor"
                  description="Informe o tipo de motor do veículo
                  informado."
                  placeholder="Selecione uma opção"
                  data={listSubCategory}
                  setData={setSubCategory}
                  back={true}
                  progress={33}
                  onClickStepBack={() => setStep('2')}
                  disabled={subCategory.id}
                  onClickStep={() => setStep('4')}
                />
              ) : null}

              {step == '4' ? (
                <StepSelect
                  indicator="Etapa 4 de 8"
                  title="Ano de Fabricação"
                  description="Informe o ano de fabricação do veículo informado"
                  placeholder="Selecione uma opção"
                  data={listYear}
                  setData={setYear}
                  back={true}
                  progress={44}
                  onClickStepBack={() => setStep('3')}
                  disabled={year}
                  onClickStep={() => setStep('5')}
                />
              ) : null}

              {step === '5' ? (
                <>
                  <FormControl bg={'white'} rounded={'md'} p={4}>
                    <FormLabel>Quantidade de veículos</FormLabel>

                    <NumberInput
                      allowMouseWheel
                      step={1}
                      min={1}
                      value={numberOfVehicles}
                    >
                      <NumberInputField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNumberOfVehicles(e.target.value.replaceAll('.', ''))
                        }
                        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                            setStep('6');
                          }
                        }}
                      />
                    </NumberInput>

                    <FormHelperText>
                      Informe a quantidade de veículos da categoria {category.name}{' '}
                      que você deseja realizar o cálculo
                    </FormHelperText>

                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="end"
                      align="center"
                      pt={4}
                    >
                      <Button
                        color={'#004AAD'}
                        variant="outline"
                        onClick={() => setStep('4')}
                      >
                        voltar
                      </Button>

                      <Button
                        disabled={numberOfVehicles == '' ? true : false}
                        onClick={() => setStep('6')}
                        bg={'#004AAD'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                        _focus={{
                          bg: 'blue.500',
                        }}
                        variant="solid"
                      >
                        avançar
                      </Button>
                    </Stack>
                    <Progress value={55} mt={4} />
                  </FormControl>
                </>
              ) : null}

              {step == '6' ? (
                <StepSelectId
                  indicator="Etapa 6 de 8"
                  title="Combustível"
                  description="Informe o tipo de combustível que é consumido pelo veículo informado"
                  placeholder="Selecione uma opção"
                  data={listFuels}
                  setData={setFuels}
                  back={true}
                  progress={66}
                  onClickStepBack={() => setStep('5')}
                  disabled={fuels.id}
                  onClickStep={() => setStep('7')}
                />
              ) : null}

              {step === '7' ? (
                <>
                  <FormControl bg={'white'} rounded={'md'} p={4}>
                    <FormLabel>Quilometragem média mensal</FormLabel>

                    <NumberInput
                      step={1}
                      defaultValue={1}
                      min={1}
                      keepWithinRange={false}
                      clampValueOnBlur={false}
                      allowMouseWheel
                      value={Km}
                    >
                      <NumberInputField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setKm(e.target.value.replaceAll('.', ''))
                        }
                        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                            setStep('8');
                          }
                        }}
                      />
                    </NumberInput>

                    <FormHelperText>
                      Digite a quilometragem média no mês da apuração dos veículos
                      informados
                    </FormHelperText>

                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="end"
                      align="center"
                      pt={4}
                    >
                      <Button
                        color={'#004AAD'}
                        variant="outline"
                        onClick={() => setStep('6')}
                      >
                        voltar
                      </Button>

                      <Button
                        disabled={Km == '' ? true : false}
                        onClick={() => setStep('8')}
                        bg={'#004AAD'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                        _focus={{
                          bg: 'blue.500',
                        }}
                        variant="solid"
                      >
                        avançar
                      </Button>
                    </Stack>
                    <Progress value={77} mt={4} />
                  </FormControl>
                </>
              ) : null}

              {step === '8' ? (
                <>
                  <FormControl bg={'white'} rounded={'md'} p={4}>
                    <FormLabel>Quilometragem por litro</FormLabel>

                    <NumberInput
                      min={0.1}
                      keepWithinRange={false}
                      clampValueOnBlur={false}
                      allowMouseWheel
                      value={literKm}
                    >
                      <NumberInputField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setLiterKm(
                            e.target.value
                              .replace(/\D/g, '')
                              .replace(/(\d)(\d{1})$/, '$1,$2'),
                          )
                        }
                        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                            handleAddToTable();
                          }
                        }}
                      />
                    </NumberInput>

                    <FormHelperText>
                      Por fim, informe a quilometragem média por litro de
                      combustível feita pelos veículos informados
                    </FormHelperText>

                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="end"
                      align="center"
                      pt={4}
                    >
                      <Button
                        color={'#004AAD'}
                        variant="outline"
                        onClick={() => setStep('7')}
                      >
                        voltar
                      </Button>

                      <Button
                        disabled={literKm == '' ? true : false}
                        onClick={handleAddToTable}
                        bg={'#004AAD'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                        _focus={{
                          bg: 'blue.500',
                        }}
                        variant="solid"
                      >
                        Cadastrar cálculo
                      </Button>
                    </Stack>
                    <Progress value={90} mt={4} />
                  </FormControl>
                </>
              ) : null}
            </Box>
          </Center>
          {step === '9' ? (
            <StoredCalculationsTemplate
              setStepTable={() => setStep('2')}
              calculatorLinkNavigate="/emissions"
            />
          ) : null}
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
}
