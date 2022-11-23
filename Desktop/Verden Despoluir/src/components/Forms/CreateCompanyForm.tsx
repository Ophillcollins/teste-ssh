import { useState } from 'react';
import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import api from '../../service/api';

type companyDataProps = {
  cnpj: string;
  email: string;
  corporate_name: string;
  address: string;
  number: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  commercial_phone: string;
};

export default function CreateCompanyForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [companyData, setCompanyData] = useState<companyDataProps>({
    cnpj: '',
    email: '',
    corporate_name: '',
    address: '',
    number: '',
    postal_code: '',
    city: '',
    state: '',
    country: '',
    commercial_phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    console.log(companyData);
    api
      .post(`/register/company`, JSON.stringify(companyData), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        setLoading(false);
        toast({
          position: 'top-right',
          title: 'Pronto!',
          description: 'Empresa cadastrada com sucesso',
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        console.log(error.response);
        toast({
          position: 'top-right',
          title: 'Ops!',
          description:
            'Não foi possível cadastrar uma nova empresa. Verifique se você tem permissão para cadastrar uma empresa ou entre em contato com nosso suporte',
          status: 'error',
          duration: 20000,
          isClosable: true,
        });
      });
  }

  function handleCep() {
    api
      .get(`https://viacep.com.br/ws/${companyData.postal_code}/json/`)
      .then(response =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore),
        setCompanyData({
          ...companyData,
          address: response.data.logradouro,
          city: response.data.localidade,
          state: response.data.uf,
        }),
      )
      .catch((error: any) => {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ModalHeader>Adicione os dados da nova empresa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={2} isRequired>
            <FormLabel>Cnpj</FormLabel>
            <Input
              type="text"
              placeholder="Digite o cnpj da empresa"
              name="cnpj"
              value={companyData.cnpj
                .replace(/\D+/g, '')
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite o e-mail corporativo"
              name="email"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Tazão Social</FormLabel>
            <Input
              type="text"
              placeholder="Digite a razão social ou nome da empresa"
              name="corporate_name"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>CEP</FormLabel>
            <Input
              type="text"
              placeholder="00000-000"
              maxLength={9}
              name="postal_code"
              onChange={handleChange}
              value={companyData.postal_code.replace(/(\d{5})(\d)/, '$1-$2')}
              onBlur={() => handleCep()}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Endereço</FormLabel>
            <Input
              type="text"
              placeholder="Digite o endereço"
              name="address"
              value={companyData.address}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Número</FormLabel>
            <Input
              type="number"
              placeholder="Digite número do endereço"
              name="number"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Cidade</FormLabel>
            <Input
              type="text"
              placeholder="Digite a cidade"
              name="city"
              value={companyData.city}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Estado</FormLabel>
            <Input
              type="text"
              placeholder="Digite o estado"
              name="state"
              value={companyData.state}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>País</FormLabel>
            <Input
              type="text"
              placeholder="Digite o país"
              name="country"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={2} isRequired>
            <FormLabel>Telefone comercial</FormLabel>
            <Input
              type="tel"
              maxLength={13}
              placeholder="(51) 0000-0000"
              name="commercial_phone"
              onChange={handleChange}
              value={companyData.commercial_phone
                .replace(/\D+/g, '')
                .replace(/(\d{2})(\d)/, '($1)$2')
                .replace(/(\d{4})(\d)/, '$1-$2')}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            loadingText="Cadastrando nova empresa"
          >
            Cadastrar
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
