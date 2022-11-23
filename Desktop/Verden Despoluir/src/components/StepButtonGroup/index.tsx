import { Button, Flex } from '@chakra-ui/react';

type Props = {
  isDisabled: any;
  prevStep: any;
  nextStep: any;
  nextStepButtonText: any;
};

export default function StepButtonGroup(props: Props) {
  return (
    <Flex width="100%" justify="flex-end" my={4}>
      <Button
        isDisabled={props.isDisabled}
        mr={4}
        onClick={props.prevStep}
        size="sm"
        variant="ghost"
      >
        Voltar
      </Button>
      <Button colorScheme="blue" size="sm" onClick={props.nextStep}>
        {props.nextStepButtonText}
      </Button>
    </Flex>
  );
}
