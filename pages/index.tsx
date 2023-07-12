import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js site on GitHub Pages</title>
        <meta
          name="description"
          content="This is a Next.js template that can be exported as a static website and deployed on GitHub Pages."
        />
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          <a href="https://github.com/ethanppl/gh-pages-nextjs">
            This is a Next.js project template with typescript
          </a>{' '}
          that can be exported as a static website.
        </p>
        <p className={styles.description}>
          Try using this as a{' '}
          <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template">
            template
          </a>{' '}
          to publish your Next.js site on{' '}
          <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages">
            GitHub pages
          </a>
          !
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
