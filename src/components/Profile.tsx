import styles from '../styles/components/Profile.module.css';

export default function Profile() {
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
          Level 1
        </p>
      </div>
    </div>
  );
}
