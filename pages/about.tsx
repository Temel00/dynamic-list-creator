import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import Auth from '../components/auth';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <Head>
          <title>About</title>
          <meta
            name="description"
            content="This is the about page for Habit Sherpa."
          />
          <link rel="icon" href="./backpack.ico" />
        </Head>

        <main className={styles.main} style={{ alignItems: 'flex-start' }}>
          <Auth/>
          <div style={{display:'flex', flexFlow:'column nowrap', alignItems:'center', marginTop:'5em'}}>
            <h1>This is the About page.</h1>            
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
