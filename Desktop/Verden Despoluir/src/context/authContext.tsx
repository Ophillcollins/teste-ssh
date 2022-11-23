import { CircularProgress, Stack } from '@chakra-ui/react';
import React, { useState, createContext, useContext, useEffect } from 'react';
import api from '../service/api';

type Props = {
  children?: React.ReactNode;
};

export const AuthContext = createContext({} as any);

export const AuthProvider = (props: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
        token,
      )}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          authenticated,
          setAuthenticated,
        }}
      >
        {loading ? (
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <CircularProgress isIndeterminate color="green.300" size="100" />
          </Stack>
        ) : (
          props.children
        )}
      </AuthContext.Provider>
    </>
  );
};
export const useAuthContext = () => useContext(AuthContext);
