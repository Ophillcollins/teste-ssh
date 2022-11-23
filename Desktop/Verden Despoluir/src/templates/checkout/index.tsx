import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Text,
  GridItem,
  Heading,
  Center,
  Progress,
  Icon,
  RadioGroup,
  Radio,
  Wrap,
  Link,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import ReCAPTCHA from 'react-google-recaptcha';
import QRCode from 'qrcode.react';
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask';
import { useFetch } from '../../hooks/useFetch';
import { useEmissions } from '../../context/emissions';
import api from '../../service/api';
import { countries } from '../../constants';

type ProjectProps = {
  projectTitle: string;
  projectCode: string;
};

type CompensationsProps = {
  value: string;
  credits: string;
};

type InstalmentsProps = {
  value: string;
  0: string;
};

export default function CheckoutTemplate() {
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps);
  const [valuesCompensation, setValuesCompensation] =
    useState<CompensationsProps>({} as CompensationsProps);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<number>();
  const [postalCode, setPostalCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [uf, setUf] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expMonth, setExpMonth] = useState<string>('');
  const [expYear, setExpYear] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');
  const [installments, setInstallments] = useState<string>('1');
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [loadingCompensate, setLoadingCompensate] = useState<boolean>(false);
  const [loadingPdfContract, setLoadingPdfContract] = useState<boolean>(false);
  const [loadingSignature, setLoadingSignature] = useState<boolean>(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [pixCode, setPixCode] = useState<string>('');
  const [pixQRCode, setQRPixCode] = useState<string>('');
  const [formStep, setFormStep] = useState<string>('1');
  const [creditCardInstallment, setCreditCardInstallment] = useState({} as any);
  const [modalProjectDescription, setModalProjectDescription] =
    useState<string>('1');

  const { emissions } = useEmissions();
  const toast = useToast();
  const navigate = useNavigate();
  const recaptchaRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: listProjects } = useFetch<[string]>('/registered/projecs/name');

  useEffect(() => {
    if (emissions.length < 1) {
      navigate('/calculator');
      toast({
        position: 'top-right',
        title: 'Ops!',
        description: 'Ocorreu um erro. Por favor, tente novamente!',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    }
  }, []);

  // function getEncryptCard(cardData: any) {
  function getEncryptCard() {
    const script = document.createElement('script');
    script.src =
      'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';
    script.async = true;
    document.body.appendChild(script);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const card = window.PagSeguro.encryptCard({
      // sandbox
      // publicKey:
      //   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB',

      //production
      publicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAriZhndrkaaECJwgeQwpBxlJBcTiIXRN5SpKkb26vMFUwFpzQFroO/dJZ6e6e5kw4XLjy02o2HC8yKN3Gedc2rol19sbnhFg8I1isqwezit916Llr9vi8dBA0uo6Vu+JEyIvAvmEzhGvau4wZb0VvqfSOTJHJtJuoNpFap1KEUFJyvktRC9K2vIzsJy/+7HF6zD5geZvZjlL2T5Ep/AVAWI7kxC/0iiWf8lkoqYcx0VY+8sFlN/+JsKGffuk7p9wbDDf6f5NMuo8qQ1UiChYFaS5fYH/ooIb0ouHlM9DAI4ma1qM265m2+YfnXYMGFT9qyTKlRr1fbjeEggyx8oF7MwIDAQAB',

      holder: cardName,
      number: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      securityCode: securityCode,
    });

    if (card.hasErrors) {
      if (paymentMethod == 'CREDIT_CARD') {
        toast({
          position: 'top-right',
          title: 'Ops!',
          description:
            'Ocorreu algum erro naverificação dos dados do cartão. Por favor, insira os dados do cartão novamente.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      const encrypted = '';
      return encrypted;
    }

    const encrypted = card.encryptedCard;
    document.body.removeChild(script);
    return encrypted;
  }

  function handlePixCheckout(event: { preventDefault: () => void }) {
    event.preventDefault();

    setLoadingCompensate(true);
    api
      .post(
        '/create/pix',
        JSON.stringify({
          project_code: project.projectCode,
          project_title: project.projectTitle,
          user_id: userId,
          item_description:
            'Créditos de Carbono para Compensação de Emissões Veiculares (tCO₂e)',
          item_amount: '1',
          item_price: valuesCompensation.value.replaceAll(',', '.'),
          tco2e_tokens: valuesCompensation.credits.replaceAll(',', '.'),
          user_name: name,
          user_email: email,
          document_number: documentNumber.replace(/\D/g, ''),
          address: {
            street: address,
            number: addressNumber,
            locality: locality,
            city: city,
            region: city,
            region_code: uf,
            country: country,
            postal_code: postalCode.replace(/\D/g, ''),
          },
          payment_method: {
            type: paymentMethod,
          },
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        setLoadingCompensate(false);
        toast({
          position: 'top-right',
          title: 'Pronto!',
          description:
            'Pedido de compensação das emissões realizado com sucesso.',
          status: 'success',
          duration: 20000,
          isClosable: true,
        });

        setPixCode(response.data.pixCopiaECola);
        setQRPixCode(response.data.pixCopiaECola);
        setShowQRCode(true);
      })
      .catch(function (error: any) {
        console.log(error);
        console.log(error.response);
        setLoadingCompensate(false);
        toast({
          position: 'top-right',
          title: 'Ops!',
          description: 'Não foi possível realizar o pedido.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function handleCheckout(event: { preventDefault: () => void }) {
    event.preventDefault();
    const encrypted = getEncryptCard();
    setLoadingCompensate(true);

    api
      .post(
        '/checkout',
        JSON.stringify({
          project_code: project.projectCode,
          project_title: project.projectTitle,
          user_id: userId,
          item_description:
            'Créditos de Carbono para Compensação de Emissões Veiculares (tCO₂e)',
          item_amount: '1',
          item_price: valuesCompensation.value.replaceAll(',', '.'),
          tco2e_tokens: valuesCompensation.credits.replaceAll(',', '.'),
          user_name: name,
          user_email: email,
          document_number: documentNumber.replace(/\D/g, ''),
          address: {
            street: address,
            number: addressNumber,
            locality: locality,
            city: city,
            region: uf,
            region_code: uf,
            country: country,
            postal_code: postalCode.replace(/\D/g, ''),
          },
          payment_method: {
            type: paymentMethod,
            installments: installments,
            card: {
              encrypted: encrypted,
            },
          },
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        setLoadingCompensate(false);
        if (paymentMethod == 'BOLETO') {
          toast({
            // position: 'top-right',
            title: 'O seu pedido de compensação foi realizado!',
            description:
              'Você receberá em instantes um email com a confirmação do pedido de compensação. Caso tenha alguma duvida, entre em contato com nosso suporte.',
            status: 'success',
            duration: 90000,
            isClosable: true,
          });
          window.open(response.data.payment_link[0].href);
          setButtonIsDisabled(true);
          navigate('/');
        } else {
          toast({
            // position: 'top-right',
            title: 'O seu pedido de compensação foi realizado!',
            description:
              'Você receberá em instantes um email com a confirmação do pedido de compensação. Caso tenha alguma duvida, entre em contato com nosso suporte.',
            status: 'success',
            duration: 90000,
            isClosable: true,
          });
        }
        setButtonIsDisabled(true);
        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        setLoadingCompensate(false);
        toast({
          position: 'top-right',
          title: 'Ops!',
          description: 'Não foi possível realizar o pedido.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function handleCep() {
    setLoadingCep(true);
    fetch(`https://viacep.com.br/ws/${postalCode}/json/`)
      .then(res => res.json())
      .then(data => {
        setLoadingCep(false);
        setAddress(data.logradouro);
        setUf(data.uf);
        setLocality(data.bairro);
        setCity(data.localidade);
      })
      .catch(error => {
        setLoadingCep(false);
        console.log(error);
        console.log(error.response);
        toast({
          title: 'Ops!',
          description: 'CEP não encontrado.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function handleRecapcha() {
    const token = recaptchaRef.current.getValue();
    api
      .post(
        `/recaptcha/checkout`,
        JSON.stringify({
          token: token,
        }),
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        if (response.data.success == true) {
          setButtonIsDisabled(false);
          return;
        }
        recaptchaRef.current.reset();
      })
      .catch(function (error) {
        recaptchaRef.current.reset();
        console.log(error);
        console.log(error.response);
      });
  }

  useEffect(() => {
    api
      .get(`/user`)
      .then((response: any) => {
        setUserId(response.data.data.id);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      'data:application/pdf;base64,'.length,
    );
    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    const out = new Uint8Array(length);
    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: 'application/pdf' });
  };

  const handlePdfContract = () => {
    setLoadingPdfContract(true);
    api
      .post(
        '/create/pdf',
        JSON.stringify({
          name: name,
          email: email,
          item_value: valuesCompensation.value.replaceAll(',', '.'),
          document_number: documentNumber,
          street: address,
          number: addressNumber,
          locality: locality,
          city: city,
          region: uf,
          region_code: uf,
          country: country,
          postal_code: postalCode.replace(/\D/g, ''),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(function (response: any) {
        const blob = base64toBlob(
          'data:application/pdf;base64,' + response.data,
        );
        const url = URL.createObjectURL(blob);
        setLoadingPdfContract(false);
        window.open(url);
      })
      .catch(function (error: any) {
        setLoadingPdfContract(false);
        console.log(error);
        console.log(error.response);
      });
  };

  const handleSignature = () => {
    setLoadingSignature(true);
    api
      .post(
        '/signature',
        JSON.stringify({
          name: name,
          clientUserId: userId,
          email: email,
          item_value: valuesCompensation.value.replaceAll(',', '.'),
          document_number: documentNumber,
          street: address,
          number: addressNumber,
          locality: locality,
          city: city,
          region: uf,
          region_code: uf,
          country: country,
          postal_code: postalCode.replace(/\D/g, ''),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(function (response: any) {
        setLoadingSignature(false);
        window.open(response.data.url);
      })
      .catch(function (error: any) {
        setLoadingSignature(false);
        console.log(error);
        console.log(error.response);
      });
  };

  function handleSelectProject(item: any) {
    setProject({
      projectTitle: item.project_title,
      projectCode: item.project_code,
    });
    setFormStep('4');
  }

  const handleOpenModal = (id: string) => {
    setModalProjectDescription(id);
    onOpen();
  };

  const handleValueCompensation = () => {
    setFormStep('5');

    api
      .post(
        '/parcelaCartao',
        JSON.stringify({
          value: valuesCompensation.value
            .replaceAll('.', '')
            .replaceAll(',', '.'),
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(function (response: any) {
        console.log(response.data);
        setCreditCardInstallment(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
        console.log(error.response);
      });
  };

  return (
    <>
      <Box pos="relative" overflow="hidden" bg={'white'}>
        <Center p={{ base: 2, sm: 6 }} bg={'#EDF2F7'}>
          <Stack>
            <form
              onSubmit={
                paymentMethod == 'PIX' ? handlePixCheckout : handleCheckout
              }
            >
              {formStep == '1' ? (
                <>
                  <Progress hasStripe value={15} mb={8} bg="white" />

                  <Heading size="md" mb={6} maxW="sm">
                    Confirme suas informações abaixo para finalizar o seu pedido
                    de compensação das emissões veículares.
                  </Heading>

                  <Text maxW="sm">
                    Primeiro informe seus dados pessoais ou de sua empresa.
                  </Text>

                  <Box
                    w="full"
                    maxW="sm"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <FormControl as={GridItem} colSpan={[6]} mb={6}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Nome Completo ou Razão Social
                      </FormLabel>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        placeholder="Informe seu nome ou razão social"
                        size="md"
                        w="full"
                        rounded="md"
                        shadow="sm"
                        required
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl id="doc" as={GridItem} colSpan={[6, 3]} mb={6}>
                      <FormLabel
                        htmlFor="documentNumber"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        CPF ou CNPJ
                      </FormLabel>
                      <Box rounded="md" bg="white" shadow="sm">
                        <CpfCnpj
                          placeholder="Informe seu cpf ou cnpj"
                          type="text"
                          name="documentNumber"
                          id="documentNumber"
                          required
                          value={documentNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDocumentNumber(e.target.value)
                          }
                          style={{
                            width: '100%',
                            padding: '1.2rem',
                            outline: 'blue',
                            border: '1px solid #EDF2F7',
                            borderRadius: '0.5rem',
                            height: '32px',
                          }}
                        />
                      </Box>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                      <FormLabel
                        htmlFor="email_address"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Email
                      </FormLabel>
                      <Input
                        placeholder="Informe seu email"
                        type="email"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                      />
                    </FormControl>

                    <Stack mt={2}>
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '50%' }}
                        colorScheme="blue"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        disabled={
                          name && documentNumber && email ? false : true
                        }
                        onClick={() => setFormStep('2')}
                      >
                        Avançar
                        <Icon as={ArrowForwardIcon} ml={1} size="md" />
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : null}

              {formStep == '2' ? (
                <>
                  <Progress hasStripe value={30} mb={8} bg="white" />

                  <Heading size="md" mb={6} maxW="sm">
                    Informe seu endereço
                  </Heading>

                  <Text maxW="sm">
                    Agora, informe seu endereço ou o endereço de sua empresa.
                  </Text>

                  <Box
                    w="full"
                    maxW="sm"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <FormControl as={GridItem} colSpan={[6]} mb={6}>
                      <FormLabel
                        htmlFor="postal_code"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        CEP
                      </FormLabel>
                      <Input
                        placeholder="Informe seu cep"
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        maxLength={9}
                        value={postalCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPostalCode(e.target.value)
                        }
                        onKeyDown={(e: any) => {
                          if (e.keyCode == 13) {
                            handleCep();
                          }
                        }}
                      />
                      <Stack
                        spacing={4}
                        direction="row"
                        justifyContent="right"
                        align="center"
                        mt="1"
                      >
                        <Button
                          isLoading={loadingCep}
                          loadingText="Consultando"
                          onClick={handleCep}
                        >
                          Consultar CEP
                        </Button>
                      </Stack>
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                      <FormLabel
                        htmlFor="street_address"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Rua
                      </FormLabel>
                      <Input
                        placeholder="Informe o nome de sua rua"
                        type="text"
                        name="street_address"
                        id="street_address"
                        autoComplete="street-address"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        value={address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAddress(e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Número
                      </FormLabel>
                      <Input
                        placeholder="Informe o número de sua residência"
                        type="number"
                        name="address_number"
                        id="address_number"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setAddressNumber(e.target.value.replace(/\D/g, ''))
                        }
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Bairro
                      </FormLabel>
                      <Input
                        placeholder="Informe seu bairro"
                        type="text"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        value={locality}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setLocality(e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Cidade
                      </FormLabel>
                      <Input
                        placeholder="Informe sua cidade"
                        type="text"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        value={city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCity(e.target.value)
                        }
                      />
                    </FormControl>

                    <FormControl as={GridItem} colSpan={[6, 2]} mb={6}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        País
                      </FormLabel>
                      <Select
                        placeholder="Selecione seu país"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setCountry(e.target.value)
                        }
                      >
                        {countries.map((item: any, index: any) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      alignItems="center"
                      mt={2}
                    >
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="gray"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('1')}
                      >
                        <Icon as={ArrowBackIcon} mr={1} size="md" />
                        Voltar
                      </Button>
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="blue"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        disabled={
                          address &&
                          addressNumber &&
                          locality &&
                          city &&
                          postalCode
                            ? false
                            : true
                        }
                        onClick={() => setFormStep('3')}
                      >
                        Avançar
                        <Icon as={ArrowForwardIcon} ml={1} size="md" />
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : null}

              {formStep == '3' ? (
                <>
                  <Progress
                    hasStripe
                    value={45}
                    mb={8}
                    bg="white"
                    maxW="md"
                    mx="auto"
                  />

                  <Heading
                    size="md"
                    mb={6}
                    w="full"
                    maxW="md"
                    mx="auto"
                    px={{ base: 2, sm: 0 }}
                  >
                    Qual projeto você deseja apoiar com a compra dos Créditos de
                    Carbono?
                  </Heading>

                  <Text w="full" maxW="md" mx="auto" px={{ base: 2, sm: 0 }}>
                    Conheça os projetos sustentáveis que selecionamos para que
                    você possa compensar as emissões da sua frota.
                  </Text>

                  <Box w="full" maxW="800px" mx="auto">
                    <Wrap alignItems={'center'} spacing={4} my={4}>
                      {listProjects.map((item: any, index: string) => {
                        return (
                          <WrapItem key={index}>
                            <Box
                              w={{ base: '320px', sm: 'sm' }}
                              maxW="600px"
                              bg="white"
                              border={1}
                              p={2}
                              rounded={'md'}
                              overflow={'hidden'}
                            >
                              {/* <Image
                                  h={'200px'}
                                  w={'full'}
                                  src={
                                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                  }
                                  objectFit={'cover'}
                                /> */}
                              <Box p={6}>
                                <Stack spacing={0} align={'left'}>
                                  <Heading
                                    fontSize="16px"
                                    fontWeight={500}
                                    fontFamily={'body'}
                                    mb={2}
                                  >
                                    {item.project_title}
                                  </Heading>

                                  <Link
                                    isExternal
                                    color="blue.500"
                                    href={item.project_link}
                                    mb={6}
                                  >
                                    Visite o projeto
                                  </Link>

                                  <Modal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    size="5xl"
                                  >
                                    <ModalOverlay />
                                    <ModalContent p={4}>
                                      <ModalCloseButton />
                                      <ModalBody>
                                        {modalProjectDescription}
                                      </ModalBody>

                                      <ModalFooter>
                                        <Button
                                          variant="ghost"
                                          onClick={onClose}
                                        >
                                          Fechar
                                        </Button>
                                      </ModalFooter>
                                    </ModalContent>
                                  </Modal>
                                </Stack>

                                <Stack
                                  direction={{ base: 'column', sm: 'row' }}
                                  alignItems="center"
                                  mt={8}
                                >
                                  <Button
                                    w={'full'}
                                    onClick={() =>
                                      handleOpenModal(item.project_description)
                                    }
                                  >
                                    Saiba mais
                                  </Button>
                                  <Button
                                    w={'full'}
                                    colorScheme="blue"
                                    rounded={'md'}
                                    onClick={() => handleSelectProject(item)}
                                  >
                                    Apoiar este projeto
                                  </Button>
                                </Stack>
                              </Box>
                            </Box>
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                  </Box>

                  <Box
                    w="100%"
                    maxW="md"
                    mx="auto"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <Stack direction="row" alignItems="center" mt={2}>
                      <Button
                        ml="auto"
                        w="full"
                        colorScheme="gray"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('2')}
                      >
                        <Icon as={ArrowBackIcon} mr={1} size="md" />
                        Voltar
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : null}

              {formStep == '4' ? (
                <>
                  <Progress hasStripe value={60} mb={8} bg="white" />

                  <Heading size="md" mb={6} maxW="sm">
                    Compensação das emissões veículares
                  </Heading>

                  <Text maxW="sm">
                    Nesta etapa você pode selecionar o valor de compensação de
                    suas emissões veículares. Você pode compensar suas emissões
                    mensais ou anuais com base o resultado do cálculo de suas
                    emissões.
                  </Text>

                  <Box
                    w="full"
                    maxW="sm"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <FormControl as={GridItem} colSpan={[6]} mb={6}>
                      <FormLabel
                        htmlFor="project"
                        fontSize="sm"
                        fontWeight="500"
                        color="gray.700"
                        _dark={{
                          color: 'gray.50',
                        }}
                      >
                        Deseja Compensar emissões mensais ou anuais?
                      </FormLabel>
                      <Select
                        placeholder="Selecione uma opção"
                        autoComplete="given-name"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        required
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setValuesCompensation({
                            credits:
                              e.target.options[e.target.selectedIndex].id,
                            value: e.target.value,
                          })
                        }
                      >
                        <option
                          value={emissions.total_compensation_monthly}
                          id={emissions.total_CO2e_monthly}
                          key={1}
                        >
                          Mensal R$ {emissions.total_compensation_monthly} (
                          {emissions.total_CO2e_monthly} tokens)
                        </option>

                        <option
                          value={emissions.total_compensation_annual}
                          id={emissions.total_CO2e_annual}
                          key={2}
                        >
                          Anual R$ {emissions.total_compensation_annual} (
                          {emissions.total_CO2e_annual} tokens)
                        </option>
                      </Select>
                    </FormControl>

                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      alignItems="center"
                      mt={8}
                    >
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="gray"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('3')}
                      >
                        <Icon as={ArrowBackIcon} mr={1} size="md" />
                        Voltar
                      </Button>
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="blue"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        disabled={valuesCompensation.value ? false : true}
                        onClick={handleValueCompensation}
                      >
                        Avançar
                        <Icon as={ArrowForwardIcon} ml={1} size="md" />
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : null}

              {formStep == '5' ? (
                <>
                  <Progress hasStripe value={75} mb={8} bg="white" />

                  <Heading size="md" mb={6} maxW="sm">
                    Informações sobre o pagamento
                  </Heading>

                  <Text maxW="sm">
                    Aqui você seleciona a forma de pagamento da compensação de
                    suas emissões.
                  </Text>

                  <Box
                    w="full"
                    maxW="sm"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <RadioGroup
                      onChange={setPaymentMethod}
                      value={paymentMethod}
                      defaultValue="BOLETO"
                    >
                      <Stack>
                        <Radio value="BOLETO" defaultChecked>
                          Boleto Bancário
                        </Radio>
                        {/* <Radio value="PIX">PIX</Radio> */}
                        <Radio value="CREDIT_CARD">Cartão de Crédito</Radio>
                      </Stack>
                    </RadioGroup>

                    {paymentMethod == 'CREDIT_CARD' ? (
                      <>
                        <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                          <FormLabel
                            htmlFor="card_number"
                            fontSize="sm"
                            fontWeight="500"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Número do cartão
                          </FormLabel>
                          <Input
                            type="text"
                            id="card_number"
                            name="card_number"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md"
                            maxLength={16}
                            value={cardNumber}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              setCardNumber(e.target.value.replace(/\D/g, ''))
                            }
                          />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 3]} mb={6}>
                          <FormLabel
                            fontSize="sm"
                            fontWeight="500"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Data de validade (Mês/Ano)
                          </FormLabel>
                          <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="baseline"
                          >
                            <Input
                              type="text"
                              placeholder="Ex: 06"
                              shadow="sm"
                              size="md"
                              w="full"
                              rounded="md"
                              maxLength={2}
                              value={expMonth}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) =>
                                setExpMonth(e.target.value.replace(/\D/g, ''))
                              }
                            />
                            <Input
                              type="text"
                              placeholder="Ex: 2030"
                              shadow="sm"
                              size="md"
                              w="full"
                              rounded="md"
                              minLength={4}
                              maxLength={4}
                              value={expYear}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) =>
                                setExpYear(e.target.value.replace(/\D/g, ''))
                              }
                            />
                          </Stack>
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 2]} mb={6}>
                          <FormLabel
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Nome do usuário do cartão
                          </FormLabel>
                          <Input
                            type="text"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md"
                            required
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setCardName(e.target.value)}
                          />
                          <Text fontSize="xs" textAlign="left">
                            Este campo aceita apenas letras, não aceita números
                          </Text>
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 2]} mb={6}>
                          <FormLabel
                            fontSize="sm"
                            fontWeight="500"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Código de segurança
                          </FormLabel>
                          <Input
                            type="text"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md"
                            maxLength={4}
                            value={securityCode}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              setSecurityCode(e.target.value.replace(/\D/g, ''))
                            }
                          />
                        </FormControl>

                        <FormControl as={GridItem} colSpan={[6, 2]} mb={6}>
                          <FormLabel
                            fontSize="sm"
                            fontWeight="500"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Número de parcelas
                          </FormLabel>
                          <Select
                            placeholder="Selecione uma opção"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md"
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>,
                            ) => setInstallments(e.target.value)}
                          >
                            {creditCardInstallment.map(
                              (item: InstalmentsProps, index: string) => {
                                return (
                                  <option value={index + 1} key={index}>
                                    {item.value} = R${item[0]}
                                  </option>
                                );
                              },
                            )}
                          </Select>
                        </FormControl>
                      </>
                    ) : null}
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      alignItems="center"
                      mt={2}
                    >
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="gray"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('4')}
                      >
                        <Icon as={ArrowBackIcon} mr={1} size="md" />
                        Voltar
                      </Button>
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="blue"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        disabled={paymentMethod ? false : true}
                        onClick={() => setFormStep('6')}
                      >
                        Avançar
                        <Icon as={ArrowForwardIcon} ml={1} size="md" />
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : null}

              {formStep == '6' ? (
                <>
                  <Progress hasStripe value={90} mb={8} bg="white" />

                  <Heading size="md" mb={6} maxW="sm">
                    Contrato de compensação das emissões
                  </Heading>

                  <Text maxW="sm">
                    Nesta etapa você pode visualizar seu contrato de compensação
                    das emissões veículares e também pode realizar a assinatura
                    digital do contrato.
                  </Text>

                  <Box
                    w="full"
                    maxW="sm"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <Button
                      w="full"
                      colorScheme="teal"
                      p={4}
                      my={2}
                      isLoading={loadingPdfContract}
                      loadingText="Gerando contrato"
                      onClick={handlePdfContract}
                    >
                      Visualizar contrato de compensação
                    </Button>
                    <Button
                      w="full"
                      my={2}
                      colorScheme="blue"
                      p={4}
                      loadingText="Gerando contrato"
                      isLoading={loadingSignature}
                      onClick={handleSignature}
                    >
                      Assinar contrato digitalmente
                    </Button>

                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      alignItems="center"
                      mt={8}
                    >
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="gray"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('5')}
                      >
                        <Icon as={ArrowBackIcon} mr={1} size="md" />
                        Voltar
                      </Button>
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="blue"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('7')}
                      >
                        Avançar
                        <Icon as={ArrowForwardIcon} ml={1} size="md" />
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : null}

              {formStep == '7' ? (
                <>
                  <Progress hasStripe value={100} mb={8} bg="white" />

                  <Heading size="md" mb={6} maxW="sm">
                    Resumo do pedido de compensação das emissões veículares.
                  </Heading>

                  <Text maxW="sm">
                    Aqui esta o resumo de seu pedido. Confira as informações
                    abaixo para finalizar seu pedido de compensação.
                  </Text>

                  <Box
                    w="full"
                    maxW="sm"
                    boxShadow={'2x1'}
                    bg={'white'}
                    rounded={'md'}
                    my={4}
                    p={6}
                  >
                    <Heading size="sm">Projeto selecionado:</Heading>
                    <Text mb={2}>{project.projectTitle}</Text>

                    <Heading size="sm">Valor total da compensação </Heading>
                    <Text mb={2}>R$:{valuesCompensation.value}</Text>

                    <Heading size="sm">
                      Creditos de carbono compensados:{' '}
                    </Heading>
                    <Text mb={2}>{valuesCompensation.credits} tCO2e</Text>

                    <Stack my={8}>
                      <ReCAPTCHA
                        // sitekey={processo.env.REACT_APP_SITE_KEY}
                        sitekey="6LcLGsshAAAAAKp3YXWrOHPgoIaEIMI63QfrftQr"
                        onChange={handleRecapcha}
                        ref={recaptchaRef}
                      />
                    </Stack>

                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      alignItems="center"
                      mt={8}
                    >
                      <Button
                        ml="auto"
                        w={{ base: 'full', sm: '49%' }}
                        colorScheme="gray"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="sm"
                        size="md"
                        onClick={() => setFormStep('5')}
                      >
                        <Icon as={ArrowBackIcon} mr={1} size="md" />
                        Voltar
                      </Button>
                      <Button
                        w={{ base: 'full', sm: '49%' }}
                        type="submit"
                        colorScheme="blue"
                        _focus={{
                          shadow: '',
                        }}
                        fontWeight="md"
                        size="md"
                        isLoading={loadingCompensate}
                        loadingText="Compensando"
                        isDisabled={buttonIsDisabled}
                      >
                        Compensar Emissões
                      </Button>
                    </Stack>

                    {showQRCode ? (
                      <Stack my={4}>
                        <Text size="sm">
                          Aqui esta seu QRCode e código PIX paga pagamento e
                          compensação das emissões!
                        </Text>
                        <QRCode
                          value={pixQRCode}
                          size={200}
                          renderAs="canvas"
                        />
                        <Text>Código copia e cola: </Text>
                        <Heading size="xs">{pixCode}</Heading>
                      </Stack>
                    ) : null}
                  </Box>
                </>
              ) : null}
            </form>
          </Stack>
        </Center>
      </Box>
    </>
  );
}
