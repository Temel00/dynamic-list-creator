import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import Auth from '../components/auth';
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
import { Input } from '@nextui-org/react';

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
    const q = query(collection(db, 'sojourns'), where('user', '==', (user as any).uid));

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
    try {
      const q = query(collection(db, 'sojourns'), where('user', '==', (user as any).uid));
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
        <Auth />
        {isLoggedIn ? (
          <div
            style={{
              marginTop: '5em',
              display: 'flex',
              flexFlow: 'column nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2em',
            }}
          >
            <h1>This is the home page for {(user as any)?.displayName}</h1>
            <div>
              <h2>Sojourns</h2>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1em',
                }}
              >
                {(sojourns[1] as any)?.sojourns.map((sojourn: SojournProps) => (
                  <Link
                    key={sojourn.docid}
                    href={'/demo/' + sojourn.docid}
                    style={{ padding: '.5em 1em', border: '1px solid black', borderRadius: '.5em' }}
                  >
                    {sojourn.title}
                  </Link>
                ))}
              </div>
            </div>
            <Popover placement="top" closeOnBlur={false}>
              <PopoverTrigger>
                <button
                  style={{
                    padding: '.5em 1em',
                    border: '1px solid black',
                    borderRadius: '.5em',
                    background: 'none',
                  }}
                >
                  Trigger
                </button>
              </PopoverTrigger>
              <PopoverContent
                style={{
                  background: '#eee',
                  padding: '1em',
                  borderRadius: '.5em',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1em',
                }}
              >
                <PopoverBody
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'start',
                    gap: '1em',
                  }}
                >
                  <Input
                    id="listName"
                    aria-label="listName"
                    placeholder="Enter Name"
                    style={{ textAlign: 'center' }}
                  />
                  <PopoverCloseButton style={{ aspectRatio: '1' }} />
                </PopoverBody>

                <PopoverFooter
                  border="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={4}
                >
                  <ButtonGroup size="md">
                    <button
                      style={{
                        padding: '.5em 1em',
                        border: '1px solid black',
                        borderRadius: '.5em',
                        background: 'none',
                      }}
                      onClick={e =>
                        handleCreateTodoList(
                          e.currentTarget.parentElement?.parentElement?.parentElement?.firstChild
                            ?.firstChild?.firstChild?.firstChild?.lastChild
                        )
                      }
                    >
                      Todo
                    </button>
                    <button
                      style={{
                        padding: '.5em 1em',
                        border: '1px solid black',
                        borderRadius: '.5em',
                        background: 'none',
                      }}
                    >
                      Routine
                    </button>
                    <button
                      style={{
                        padding: '.5em 1em',
                        border: '1px solid black',
                        borderRadius: '.5em',
                        background: 'none',
                      }}
                    >
                      Habit
                    </button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div style={{ marginTop: '5em' }}>
            <h1>Please Login to view your lists.</h1>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
