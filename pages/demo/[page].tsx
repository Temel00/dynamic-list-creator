import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import styles from '../../styles/Home.module.css';
import useAuth from '../../hooks/useAuth';
import React, { useState } from 'react';
import Auth from '../../components/auth';
import Link from 'next/link';
import TodoList from '../../components/TodoList';

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
    <div className={styles.container}>
      <main className={styles.main}>
        <Auth />
        {isLoggedIn ? (
          <div>
            <TodoList docid={(page as any).toString()}></TodoList>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5em',
            }}
          >
            <h3>Please Login to view protected pages.</h3>
            <Link
              href={'/'}
              style={{ padding: '.5em 1em', border: '1px solid black', textAlign: 'center' }}
            >
              Home
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
