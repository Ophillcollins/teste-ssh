import React from 'react';
import { Stack, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function OrderInfo() {
  const navigate = useNavigate();
  return (
    <>
      <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Parabéns!</Text>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
            Você acabou de compensar suas emissões e contribuir para o meio
            ambiente. Após a confirmação do pagamento você recebera o
            certificado de compensação de emissões no prazo máximo de 48 horas.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Button colorScheme="green" onClick={() => navigate('/')}>
              Voltar para o Verden
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
