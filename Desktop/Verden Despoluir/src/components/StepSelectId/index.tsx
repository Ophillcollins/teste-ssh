import {
  Button,
  CircularProgress,
  Select,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Progress,
} from '@chakra-ui/react';

type Props = {
  back?: boolean;
  disabled: string;
  data?: any;
  setData?: any;
  title: string;
  description: string;
  type?: any;
  onClickStep?: any;
  onClickStepBack?: any;
  placeholder?: string;
  indicator?: string;
  progress?: number;
};

type ListOptions = {
  name: string;
  id: string;
};

export default function StepSelectId(props: Props) {
  return (
    <FormControl bg={'white'} rounded={'md'} p={4}>
      <FormLabel>{props.title}</FormLabel>
      {props.data[0] == '' ? (
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <CircularProgress isIndeterminate color="#004AAD" />
        </Stack>
      ) : (
        <>
          <Select
            placeholder={props.placeholder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              props.setData({
                name: e.target.options[e.target.selectedIndex].text,
                id: e.target.value,
              })
            }
          >
            {props.data.map((item: ListOptions, index: string) => {
              return (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              );
            })}
          </Select>
        </>
      )}
      <FormHelperText>{props.description}</FormHelperText>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        align="center"
        pt={4}
      >
        {props.back ? (
          <Button
            color={'#004AAD'}
            variant="outline"
            onClick={props.onClickStepBack}
          >
            voltar
          </Button>
        ) : null}

        <Button
          disabled={props.disabled == '' ? true : false}
          onClick={props.onClickStep}
          type={props.type}
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
      <Progress value={props.progress} mt={4} />
    </FormControl>
  );
}
