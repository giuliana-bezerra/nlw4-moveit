import { createContext, useState, ReactNode, useEffect } from 'react';
import { Session } from 'next-auth';
import challenges from '../../challenges.json';
import LevelUpModel from '../components/LevelUpModel';
import { useSession } from 'next-auth/client';
import { api } from '../services/api';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
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

interface ChallengeProviderProps {
  children: ReactNode;
  session: Session;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({
  session,
  children,
}: ChallengeProviderProps) {
  const [user, setUser] = useState(session.user);
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    api.get(`/users/${session.user.id}`).then((res) => {
      if (res.data.user === null) {
        const userPayload = {
          ...user,
          level,
          challengesCompleted,
          currentExperience,
        };
        api.post('/users', userPayload).then((_) => setUser(userPayload));
      } else {
        setUser(res.data.user);
        setLevel(res.data.user.level);
        setCurrentExperience(res.data.user.currentExperience);
        setChallengesCompleted(res.data.user.challengesCompleted);
      }
    });
  }, []);

  function levelUp() {
    const newLevel = level + 1;
    setLevel(newLevel);
    setIsLevelUpModalOpen(true);
    return newLevel;
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;
    const { amount } = activeChallenge;
    let newLevel = level;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      newLevel = levelUp();
    }

    // FIXME: Salvar atualização do user
    const userPayload = {
      ...user,
      level: newLevel,
      challengesCompleted: challengesCompleted + 1,
      currentExperience: finalExperience,
    };
    api.post('/users', userPayload).then((_) => setUser(userPayload));

    setCurrentExperience(userPayload.currentExperience);
    setActiveChallenge(null);
    setChallengesCompleted(userPayload.challengesCompleted);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModel />}
    </ChallengeContext.Provider>
  );
}
