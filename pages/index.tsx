import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import Auth from '../components/auth';
import useAuth from '../hooks/useAuth';

const Home: NextPage = () => {
  const { isLoggedIn, user } = useAuth();
  console.log('home-user', user);
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
        {isLoggedIn 
        ? (<div style={{marginTop:'5em'}}><h1>This is the home page for {(user as any)?.displayName}</h1></div>)
        : (<div style={{marginTop:'5em'}}><h1>Please Login to view your lists.</h1></div>)
        }
      </main>
      <Footer />
    </div>
  );
};

export default Home;
