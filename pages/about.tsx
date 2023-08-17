import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import Header from '../components/header';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="This is the about page for Habit Sherpa." />
        <link rel="icon" href="./backpack.ico" />
      </Head>

      <main className={styles.about} style={{ alignItems: 'flex-start' }}>
        <Header />
        <div className={styles.aboutContent}>
          <h1>This is the About page.</h1>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
