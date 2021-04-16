import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';
import MenuSideBar from '../components/MenuSideBar';

import styles from '../styles/pages/Home.module.css';
import { api } from '../services/api';
import { useEffect, useState } from 'react';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

export default function Home() {
  const [session, loading] = useSession();
  const [user, setUser] = useState({
    level: 1,
    challengesCompleted: 0,
    currentExperience: 0,
  });

  if (loading) return null;
  if (!session) window.location.href = '/';

  return (
    <ChallengeProvider session={session}>
      <div className={styles.container}>
        <MenuSideBar />
        <div className={styles.homeContainer}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallengeProvider>
  );
}
