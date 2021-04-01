import { useContext } from 'react';
import { useSession } from 'next-auth/client';

import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile(props) {
  const { level } = useContext(ChallengeContext);
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <div className={styles.profileContainer}>
      <img src={session.user.image} alt={session.user.name} />
      <div>
        <strong>{session.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
