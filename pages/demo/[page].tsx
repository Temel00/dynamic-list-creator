import { useRouter } from 'next/router';
import Footer from '../../components/footer';
import styles from '../../styles/Home.module.css';

const Page = () => {
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
        <h1 className={styles.title}>{page?.toString()}</h1>
        {imgPath ? <img src={imgPath} alt={imgPath} className={styles.demoImg}></img> : null}
        <br />
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
