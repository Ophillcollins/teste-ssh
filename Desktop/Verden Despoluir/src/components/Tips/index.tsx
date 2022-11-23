import { useEffect, useState } from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import api from '../../service/api';

export default function Tips() {
  const [tips, setTips] = useState([] as any);

  useEffect(() => {
    api
      .get('/tips')
      .then((response: any) => {
        setTips(response.data.tips);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  }, []);

  return (
    <Box maxW="full" bg="white" rounded={'md'} boxShadow={'2xl'} my={6} p={4}>
      <Text fontSize={'1x2'} fontWeight={600}>
        Dicas para diminuir sua pegada de carbono
      </Text>
      <UnorderedList>
        <ListItem>{tips[1]}</ListItem>
        <ListItem>{tips[2]}</ListItem>
        <ListItem>{tips[3]}</ListItem>
      </UnorderedList>
    </Box>
  );
}
