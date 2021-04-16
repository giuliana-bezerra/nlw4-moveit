import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import MenuSideBar from '../components/MenuSideBar';
import { api } from '../services/api';

import homeStyles from '../styles/pages/Home.module.css';
import styles from '../styles/pages/LeaderBoard.module.css';

interface IUser {
  _id: string;
  name: string;
  avatar: string;
  level: Number;
  challengesCompleted: Number;
  currentExperience: Number;
}

export default function LeaderBoard() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users').then((res) => {
      setUsers(res.data.users);
      setLoading(false);
    });
  }, []);

  return (
    <div className={homeStyles.container}>
      <MenuSideBar />
      <div className={homeStyles.homeContainer}>
        <Head>
          <title>Leaderboard | move.it</title>
        </Head>
        <header>
          <h1>Leaderboard</h1>
          {!loading && (
            <table className={styles.leaderBoardTable}>
              <thead className={styles.headerTable}>
                <tr>
                  <th className={styles.positionHeader}>Posição</th>
                  <th colSpan={1}></th>
                  <th className={styles.tableHeader}>Usuário</th>
                  <th className={styles.tableHeader}>Desafios</th>
                  <th className={styles.tableHeader}>Experiência</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className={styles.positionColumn}>{index + 1}</td>
                      <td style={{ width: '0.5%' }}></td>
                      <td className={styles.userColumn}>
                        <div className={styles.rowBox}>
                          <img
                            className={styles.avatar}
                            src={user.avatar}
                            alt="avatar"
                          />
                          <div className={styles.columnBox}>
                            <p className={styles.userNameText}>{user.name}</p>
                            <div
                              style={{ display: 'flex', flexDirection: 'row' }}
                            >
                              <img
                                width={14}
                                height={16}
                                src="icons/level.svg"
                                alt="level"
                              />
                              <span className={styles.userLevelText}>
                                Level {user.level}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.challengesColumn}>
                        <span className={styles.blueText}>
                          {user.challengesCompleted}
                        </span>{' '}
                        completados
                      </td>
                      <td className={styles.xpColumn}>
                        <span className={styles.blueText}>
                          {user.currentExperience}
                        </span>{' '}
                        xp
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.rowSeparator}></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </header>
      </div>
    </div>
  );
}
