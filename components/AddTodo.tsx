import React from 'react';
import { Box, Input, Button, Textarea, Stack, Select, useToast } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { addTodo } from '../api/todo';
import { Checkbox } from '@nextui-org/react';

type AddTodoProps = {
  docId: string;
};

const AddTodo = (props: AddTodoProps) => {
  const docId = props.docId;
  const [isComplete, setIsComplete] = React.useState(false);
  const [task, setTask] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: 'You must be logged in to create a todo',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const todo = {
      isComplete,
      task,
      docId,
    };
    await addTodo(todo);
    setIsLoading(false);

    setIsComplete(false);
    setTask('');

    toast({ title: 'Todo created successfully', status: 'success' });
  };

  return (
    <Box w="40%" margin={'0 auto'} display="block" mt={5}>
      <Stack direction="column">
        <Checkbox color="secondary" isSelected={isComplete}></Checkbox>
        <Textarea placeholder="Task" value={task} onChange={e => setTask(e.target.value)} />

        <Button
          onClick={() => handleTodoCreate()}
          disabled={task.length < 1 || isLoading}
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTodo;
