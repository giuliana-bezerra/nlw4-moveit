import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { Home, Award, LogOut } from 'react-feather';
import styles from '../styles/components/MenuSideBar.module.css';

export default function MenuSideBar(props) {
  const [isHomeActive, setIsHomeActive] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.asPath == '/home' ? setIsHomeActive(true) : setIsHomeActive(false);
  }, [isHomeActive]);

  function handleHome() {
    router.push({ pathname: '/home' });
  }

  function handleLeaderBoard() {
    router.push('/leaderboard');
  }

  function handleLogout() {
    signOut();
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <img className={styles.smallLogo} src="small-logo.svg" alt="logo" />
      <div className={styles.menuItems}>
        <button
          className={
            isHomeActive ? styles.buttonIconFocused : styles.buttonIcon
          }
          onClick={handleHome}
        >
          <Home className={styles.menuIcon} size={32} />
        </button>
        <button
          className={
            isHomeActive ? styles.buttonIcon : styles.buttonIconFocused
          }
          onClick={handleLeaderBoard}
        >
          <Award className={styles.menuIcon} size={32} />
        </button>
      </div>
      <button className={styles.buttonIcon} onClick={handleLogout}>
        <LogOut className={styles.menuIconBlue} size={32} />
      </button>
    </div>
  );
}
