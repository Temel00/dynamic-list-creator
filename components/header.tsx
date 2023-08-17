import styles from '../styles/Home.module.css';
import Auth from './auth';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <picture className={styles.headerBG}>
          <source srcSet="../../v1.1/Clouds_BG_M.png" media="(max-width: 1081px)" />
          <img src="../../v1.1/Clouds_BG_D.png" alt="Faded Mountains" />
        </picture>

        <img
          className={styles.logo}
          src="../../v1.1/Logo_Lg.png"
          alt="Green and Yellow Backpack Logo"
        />
        <h1>Habit Sherpa</h1>
        <Auth />
      </header>
    </>
  );
};

export default Header;
