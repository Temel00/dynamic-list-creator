import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/" passHref>
        HOME
      </Link>
      <Link href="/about" passHref>
        ABOUT
      </Link>
      <Link href="/demo/cat" passHref>
        DEMO: CAT
      </Link>
      <Link href="/demo/dog" passHref>
        DEMO: DOG
      </Link>
    </footer>
  );
};

export default Footer;
