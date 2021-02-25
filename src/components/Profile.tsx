import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src='http://github.com/giuliana-bezerra.png'
        alt='Giuliana Bezerra'
      />
      <div>
        <strong>Giuliana Bezerra</strong>
        <p>
          <img src='icons/level.svg' alt='level' />
          Level {level}
        </p>
      </div>
    </div>
  );
}
