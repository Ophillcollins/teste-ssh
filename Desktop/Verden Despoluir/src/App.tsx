import { Routes } from './routes';
import CookieConsent from 'react-cookie-consent';
import { Link } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Routes />

      <CookieConsent
        debug={true}
        style={{
          boxShadow: '2x4',
          padding: '1rem 1rem 4rem 1rem',
          fontSize: '17px',
          backgroundColor: '#EEEEEE',
          margin: '3rem 0rem 3rem 1.5rem',
          color: '#000000',
          borderRadius: '2px',
          alignContent: 'center',
          alignItems: 'center',
        }}
        buttonText="Prosseguir"
        buttonStyle={{
          backgroundColor: '#004AAD',
          color: '#ffffff',
          borderRadius: '4px',
        }}
      >
        Nós usamos cookies e outras tecnologias semelhantes para melhorar e
        personalizar a sua experiência em nossos serviços. Ao utilizar nossos
        serviços, você concorda com tal monitoramento. Conheça nossa{' '}
        <u>
          <Link
            href="https://celo4.earth/politica-de-privacidade/"
            isExternal
            color="blue.500"
            style={{
              borderBottom: '1px',
            }}
          >
            Política de Privacidade.
          </Link>
        </u>
      </CookieConsent>
    </>
  );
}

export default App;
