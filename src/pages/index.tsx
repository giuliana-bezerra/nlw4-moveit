import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSession, getCsrfToken, signIn } from 'next-auth/client';
import styles from '../styles/pages/Landing.module.css';

export default function Landing({ csrfToken }) {
  const [session, loading] = useSession();
  const router = useRouter();

  function handleSignIn(e) {
    e.preventDefault();
    signIn('github');
  }

  if (loading) return null;

  if (session) {
    router.replace('/home');
  }
  return (
    <div className={styles.container}>
      <div className={styles.watermark}>
        <img className={styles.watermarkImg} src="watermark.svg" />
      </div>
      <div className={styles.signForm}>
        <img className={styles.logoWhite} src="logo-white.svg" />
        <p className={styles.titleForm}>Bem-vindo</p>
        <div className={styles.githubContainer}>
          <img className={styles.githubIcon} src="icons/github.svg" />
          <p className={styles.githubText}>
            Faça login com seu Github para começar
          </p>
        </div>
        <div className={styles.githubForm}>
          <input
            className={styles.githubInputText}
            type="text"
            placeholder="Digite seu username"
          />
          <button
            className={styles.githubButton}
            type="button"
            onClick={handleSignIn}
          >
            <img src="icons/arrow-right.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
