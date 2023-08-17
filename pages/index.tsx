import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import Auth from '../components/auth';
import { FaRecycle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  ButtonGroup,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import Header from '../components/header';

const Home: NextPage = () => {
  const { isLoggedIn, user } = useAuth();
  const [sojourns, setSojourns] = useState([]);

  type SojournProps = {
    docid: string;
    type: string;
    title: string;
  };

  const refreshData = () => {
    if (!user) {
      setSojourns([]);
      return;
    }
    const q = query(collection(db, 'expeditions'), where('user', '==', (user as any).uid));

    onSnapshot(q, querySnapchot => {
      let ar: any = [{}];
      querySnapchot.docs.forEach(doc => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setSojourns(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleCreateTodoList = async (e: any) => {
    console.log(e.value);
    try {
      const q = query(collection(db, 'expeditions'), where('user', '==', (user as any).uid));
      console.log(q);
      const newTodoRef = doc(collection(db, 'todo'));
      onSnapshot(q, querySnapchot => {
        querySnapchot.docs.forEach(async doc => {
          const sojournRef = doc.ref;
          const data = {
            createdAt: Date.now(),
            description: '',
            docid: newTodoRef.id,
            status: 'active',
            tasks: [],
            title: e.value,
            user: (user as any).uid,
          };

          await setDoc(newTodoRef, data);

          await updateDoc(sojournRef, {
            sojourns: arrayUnion({ docid: newTodoRef.id, title: e.value, type: 'todo' }),
          });
        });
      });

      // await addDoc(collection(db, 'sojourns'),  )
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Habit Sherpa</title>
        <meta
          name="description"
          content="This is a dynamic list creation app that lets users build todos, routines, and habits."
        />
        <link rel="icon" href="./backpack.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        {isLoggedIn ? (
          <div className={styles.mainContent}>
            <div>
              <h2>Expeditions</h2>
              <div className={styles.expBox}>
                {(sojourns[1] as any)?.sojourns?.map((sojourn: SojournProps) => (
                  <div className={styles.expItem} key={sojourn.docid}>
                    <button className={styles.expTag}></button>
                    <div className={styles.expName}>
                      <Link href={'/demo/' + sojourn.docid}>{sojourn.title}</Link>
                      <button className={styles.expTrash}>
                        <FaRecycle style={{ fontSize: '1.5em' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Popover placement="top" closeOnBlur={true}>
              <PopoverTrigger>
                <button className={styles.addTodo}>Add List</button>
              </PopoverTrigger>
              <PopoverContent
                style={{
                  alignItems: 'center',
                  background: '#eee',
                  borderRadius: '.5em',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  gap: '1em',
                  justifyContent: 'center',
                  padding: '1em',
                }}
              >
                <PopoverBody
                  style={{
                    alignItems: 'start',
                    display: 'flex',
                    gap: '1em',
                    width: '100%',
                  }}
                >
                  <Input
                    aria-label="listName"
                    id="listName"
                    placeholder="Enter Name"
                    style={{ textAlign: 'center' }}
                  />
                  <PopoverCloseButton style={{ aspectRatio: '1' }} />
                </PopoverBody>

                <PopoverFooter
                  alignItems="center"
                  border="0"
                  display="flex"
                  justifyContent="space-between"
                  pb={4}
                >
                  <button
                    style={{
                      background: 'none',
                      border: '1px solid black',
                      borderRadius: '.5em',
                      padding: '.5em 1em',
                    }}
                    onClick={e =>
                      handleCreateTodoList(
                        e.currentTarget.parentElement?.parentElement?.parentElement?.firstChild
                          ?.firstChild?.firstChild?.firstChild?.lastChild?.lastChild
                      )
                    }
                  >
                    Add
                  </button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className={styles.loginContent}>
            <video width="300px" autoPlay muted loop>
              <source src="./v1.1/HabitSherpa_LoginSign.webm" type="video/webm"></source>
            </video>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
