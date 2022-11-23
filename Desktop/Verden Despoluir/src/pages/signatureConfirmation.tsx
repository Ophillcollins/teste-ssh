import { Box, Heading, Text, Stack } from '@chakra-ui/react';

export default function SignatureConfirmation() {
  return (
    <>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 4, md: 8 }}
        py={{ base: 4, md: 8 }}
        px={4}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '4xl' }}
          lineHeight={'110%'}
        >
          <Text as={'span'} color="#004AAD">
            A assinatura do contrato de compensação foi realizada com sucesso!
          </Text>
        </Heading>
      </Stack>
    </>
  );
}
