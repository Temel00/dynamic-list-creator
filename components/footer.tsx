import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <picture>
          <source srcSet="../../v1.1/Mountains_BG_M.png" media="(max-width: 1081px)" />
          <img
            className={styles.footerBG}
            src="../../v1.1/Mountains_BG_D.png"
            alt="Faded Mountains"
          />
        </picture>
      </footer>
      <div className={styles.footerLinks}>
        <div className={styles.footerLinkBox}>
          <Link href="/" passHref>
            Home
          </Link>
        </div>
        <div className={styles.footerLinkBox}>
          <Link href="/about" passHref>
            About
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
