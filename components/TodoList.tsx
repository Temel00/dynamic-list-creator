import { Badge, Box, Heading, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FaToggleOff, FaToggleOn, FaTrash, FaPlus } from 'react-icons/fa';
import { deleteTodo, toggleTodoStatus, addTodo } from '../api/todo';
import { Checkbox, Input } from '@nextui-org/react';
import styles from '../styles/Home.module.css';

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

  const handleTodoDelete = async (id: string, task: string, isComplete: boolean) => {
    if (confirm('Are you sure you wanna delete this todo?')) {
      deleteTodo(id, task, isComplete);
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

  const handleAdd = async (e: any) => {
    const todo = {
      isComplete: false,
      task: e.value,
      docId: props.docid,
    };
    await addTodo(todo);
    e.value = '';
  };

  return (
    <>
      <h1>{title}</h1>
      <div className={styles.todoBox}>
        {todos &&
          todos.map((todo: any, i: number) => (
            <div key={i} className={styles.todoItem}>
              <input
                type="checkbox"
                id={'todo' + i}
                name="todoCheck"
                checked={todo.isComplete}
                onChange={() => handleToggle(todo.isComplete, todo.task)}
              />
              <label htmlFor={'todo' + i} className={styles.strikethrough}>
                {todo.task}
              </label>

              <FaTrash
                onClick={() => handleTodoDelete(props.docid, todo.task, todo.isComplete)}
              ></FaTrash>
            </div>
          ))}
        <div style={{ marginTop: '2em' }}>
          <Input
            label="New Task"
            placeholder="Enter new task"
            contentRight={<FaPlus />}
            contentClickable
            onContentClick={(key, e) => {
              handleAdd(e.currentTarget.parentElement?.firstChild);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TodoList;
