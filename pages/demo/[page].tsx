import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import styles from '../../styles/Home.module.css';
import useAuth from '../../hooks/useAuth';
import React, { useState } from 'react';
import Auth from '../../components/auth';
import Link from 'next/link';
import TodoList from '../../components/TodoList';
import Head from 'next/head';
import Header from '../../components/header';

const Page = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { page } = router.query;

  const [todos, setTodos] = useState([]);

  type TodoProps = {
    isComplete: boolean;
    title: string;
  };

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="This is the about page for Habit Sherpa." />
        <link rel="icon" href="./backpack.ico" />
      </Head>
      <main className={styles.page}>
        <Header />
        {isLoggedIn ? (
          <div className={styles.todoContent}>
            <TodoList docid={(page as any).toString()}></TodoList>
          </div>
        ) : (
          <div className={styles.loginContent}>
            <video width="300px" autoPlay muted loop>
              <source src="../../v1.1/HabitSherpa_LoginSign.webm" type="video/webm"></source>
            </video>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Page;
