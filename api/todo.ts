import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

type TodoProps = {
  isComplete: boolean;
  task: string;
  docId: string;
};

type ToggleProps = {
  docId: string;
  task: string;
  checked: boolean;
};

const addTodo = async (props: TodoProps) => {
  const { isComplete, task, docId } = props;
  try {
    const todoRef = doc(db, 'todo', docId);
    await updateDoc(todoRef, {
      tasks: arrayUnion({ isComplete, task }),
    });
  } catch (err) {}
};

const toggleTodoStatus = async (props: ToggleProps) => {
  const { docId, task, checked } = props;
  try {
    const todoRef = doc(db, 'todo', docId);
    await updateDoc(todoRef, {
      tasks: arrayRemove({
        task: task,
        isComplete: checked,
      }),
    }).then(() => {
      updateDoc(todoRef, {
        tasks: arrayUnion({ task: task, isComplete: !checked }),
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId: string, task: string, isComplete: boolean) => {
  console.log('docid: ', docId);
  console.log('task in delete', task);
  try {
    const todoRef = doc(db, 'todo', docId);
    await updateDoc(todoRef, {
      tasks: arrayRemove({ task: task, isComplete: isComplete }),
    });
  } catch (err) {
    console.log(err);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo };
