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
  query,
  where,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  DocumentData,
  getDocs,
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
import { error } from 'console';

type Space = {
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  user: string;
  color: string;
}[];

const Spaces: NextPage = () => {
  const { isLoggedIn, user } = useAuth();
  const [spaces, setSpaces] = useState<Space>([]);

  useEffect(() => {
    refreshSpaces();
  }, [user]);

  const refreshSpaces = async () => {
    if (user !== '' && user !== null) {
      let ar: Space = [];
      const q = query(collection(db, 'spaces'), where('user', '==', (user as any).uid));
      try {
        const docSnap = await getDocs(q);
        docSnap.forEach(doc => {
          ar.push({
            createdAt: doc.data().createdAt,
            description: doc.data().description,
            title: doc.data().title,
            user: doc.data().user,
            color: doc.data().color,
            id: doc.id,
          });
        });
      } catch (err) {
        console.log(err);
      } finally {
        console.log(spaces);
        setSpaces(ar);
      }
    }
  };

  const handleCreateTodoList = async (e: any) => {
    console.log(e.value);
    try {
      const newSpaceRef = doc(collection(db, 'spaces'));

      const data = {
        createdAt: Date.now(),
        description: '',
        title: e.value,
        user: (user as any).uid,
        color: '4444cc',
      };

      await setDoc(newSpaceRef, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>FloraCare</title>
        <meta
          name="description"
          content="This is a house plant care web application that allows you to track watering and location of your house plants."
        />
        <link rel="icon" href="./FC_Logo_LG.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        {isLoggedIn ? (
          <section className={styles.spaceContent}>
            <h2>Your Spaces</h2>
            {spaces.map(space => {
              const { createdAt, description, id, title, user, color } = space;
              console.log('Space place: ' + title + ' and ' + id);
              return (
                <div className={styles.expItem} key={id}>
                  <button className={styles.expTag}></button>
                  <div className={styles.expName}>
                    <Link href={'/plants/' + title + '?s=' + id}>{title}</Link>
                    <button className={styles.expTrash}>
                      <FaRecycle style={{ fontSize: '1.5em' }} />
                    </button>
                  </div>
                </div>
              );
            })}

            <Popover placement="top" closeOnBlur={true}>
              <PopoverTrigger>
                <button className={styles.addTodo}>Add Space</button>
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
          </section>
        ) : (
          <div className={styles.loginContent}>
            <video width="300px" autoPlay muted loop>
              <source src="./v1.1/SpaceLogin.webm" type="video/webm"></source>
            </video>
          </div>
        )}
      </main>

      <Footer activePage={2} />
    </div>
  );
};

export default Spaces;
