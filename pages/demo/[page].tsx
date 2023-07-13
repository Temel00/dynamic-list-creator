import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import styles from '../../styles/Home.module.css';
import useAuth from '../../hooks/useAuth';
import React, { useEffect } from 'react';
import Auth from '../../components/auth';
import Link from 'next/link';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const Page = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { page } = router.query;

  let imgPath = undefined;
  switch (page) {
    case 'cat':
      // always try to use relative path
      imgPath = '../cat.jpg';
      break;
    case 'dog':
      // always try to use relative path
      imgPath = '../dog.jpeg';
      break;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Auth />
        {isLoggedIn ? (
          <div>
            <h1 className={styles.title}>{page?.toString()}</h1>
            {imgPath ? <img src={imgPath} alt={imgPath} className={styles.demoImg}></img> : null}
            <br />
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

// we need this function to generate a static site
export async function getStaticPaths() {
  return {
    paths: [{ params: { page: 'cat' } }, { params: { page: 'dog' } }],
    fallback: false, // fallback must be false for `next export`
  };
}

// we need this function to generate a static site
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Page;
