import { Badge, Box, Heading, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { deleteTodo, toggleTodoStatus } from '../api/todo';
import { Checkbox } from '@nextui-org/react';

type TodoListProps = {
  docid: string;
};

const TodoList = (props: TodoListProps) => {
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState('');

  const { user } = useAuth();
  const toast = useToast();
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(
      collection(db, 'todo'),
      where('user', '==', (user as any).uid),
      where('docid', '==', props.docid)
    );

    onSnapshot(q, querySnapchot => {
      let ar: any = [{}];
      querySnapchot.docs.forEach(doc => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTitle(ar[1].title);
      setTodos(ar[1].tasks);
      console.log('docid in query', props.docid);
      console.log('ar', ar[1].tasks);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id: string) => {
    if (confirm('Are you sure you wanna delete this todo?')) {
      deleteTodo(id);
      toast({ title: 'Todo deleted successfully', status: 'success' });
    }
  };

  const handleToggle = async (checked: boolean, task: string) => {
    await toggleTodoStatus({ docId: props.docid, task, checked });
    toast({
      title: `Todo marked ${!checked}`,
      status: checked == true ? 'success' : 'warning',
    });
  };

  return (
    <Box mt={5}>
      <h1>{title}</h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos &&
          todos.map((todo: any, i: number) => (
            <div
              key={i}
              style={{ padding: '.25em 1em', border: '1px solid black', borderRadius: '1em' }}
            >
              <Checkbox
                isSelected={todo.isComplete}
                lineThrough
                color="secondary"
                // onChange={() => handleToggle(todo.isComplete, todo.task)}
              >
                {todo.task}
              </Checkbox>
            </div>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;
