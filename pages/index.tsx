import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import { FaRecycle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

import Link from 'next/link';

import Header from '../components/header';
import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  addDoc,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  DocumentData,
  getDocs,
} from 'firebase/firestore';

type Plant = {
  lastWater: Date;
  waterFreq: number;
  description: string;
  id: string;
  cname: string;
  sname: string;
  user: string;
  space: string;
}[];

type Report = {
  cname: string;
  lastWater: Date;
  waterFreq: number;
}[];

const Home: NextPage = () => {
  const { isLoggedIn, user } = useAuth();
  const [plants, setPlants] = useState<Plant>([]);
  const [thirstyplants, setThirstyPlants] = useState<Plant>([]);
  const [report, setReport] = useState<Report>([]);
  const [search, setSearch] = useState<Plant>([]);

  useEffect(() => {
    refreshPlants();
  }, [user]);

  const refreshPlants = async () => {
    if (user !== '' && user !== null) {
      let ar: Plant = [];
      let thirsty: Plant = [];

      const q = query(collection(db, 'plants'), where('user', '==', (user as any).uid));
      try {
        const docSnap = await getDocs(q);
        docSnap.forEach(doc => {
          const waterDays = ((Date.now() - doc.data().lastWater) / 8640000000).toString();
          const waterInt = parseInt(waterDays);
          if (doc.data().waterFreq <= waterDays) {
            console.log('better send an alert');
            thirsty.push({
              lastWater: doc.data().lastWater,
              waterFreq: doc.data().waterFreq,
              description: doc.data().description,
              cname: doc.data().cname,
              sname: doc.data().sname,
              user: doc.data().user,
              space: doc.data().space,
              id: doc.id,
            });
          } else {
            console.log('all good');
          }

          ar.push({
            lastWater: doc.data().lastWater,
            waterFreq: doc.data().waterFreq,
            description: doc.data().description,
            cname: doc.data().cname,
            sname: doc.data().sname,
            user: doc.data().user,
            space: doc.data().space,
            id: doc.id,
          });
        });
      } catch (err) {
        console.log(err);
      } finally {
        console.log(plants);
        setThirstyPlants(thirsty);
        setPlants(ar);
      }
    }
  };

  const generateReport = async () => {
    let ar: Report = [];
    try {
      plants.forEach(plant => {
        ar.push({
          cname: plant.cname,
          lastWater: plant.lastWater,
          waterFreq: plant.waterFreq,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReport(ar);
    }
  };

  const searchPlants = async () => {
    let ar: Plant = [];
    try {
      plants.forEach(doc => {
        const searchString = document.getElementById('searchInput').value;
        console.log(searchString);
        if (doc.cname == searchString) {
          console.log('Plant match');
          ar.push({
            lastWater: doc.lastWater,
            waterFreq: doc.waterFreq,
            description: doc.description,
            cname: doc.cname,
            sname: doc.sname,
            user: doc.user,
            space: doc.space,
            id: doc.id,
          });
        } else {
          console.log('No plant match');
          console.log(doc.cname + ' does not equal ' + searchString);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSearch(ar);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>FloraCare</title>
        <meta
          name="description"
          content="This is a house plant care web application that allows you to track watering and location of your house plants."
        />
        <link rel="icon" href="./FC_Logo_LG.ico" />
      </Head>

      <main className={styles.main}>
        <Header />

        {isLoggedIn && user != null && user != '' ? (
          <section className={styles.homeContent}>
            <h2>Welcome, {user.displayName}</h2>

            <div className={styles.homeStats}>
              <h4>Dashboard</h4>
              <div className={styles.homeStat}>
                <h3>Thirsty Plants</h3>
                <h3>{thirstyplants.length}</h3>
              </div>
              <div className={styles.homeStat}>
                <h3>Plant Count</h3>
                <h3>{plants.length}</h3>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--light-brown)',
                padding: '1em',
                borderRadius: '1em',
                gap: '1em',
              }}
            >
              <button
                style={{
                  background: 'none',
                  border: '1px solid black',
                  borderRadius: '999em',
                  padding: '.5em 1em',
                }}
                onClick={e => {
                  searchPlants();
                }}
              >
                Search Plants
              </button>
              <Input
                labelLeft="Find"
                aria-label="searchbar"
                id="searchInput"
                style={{ textAlign: 'center' }}
              ></Input>
              {search.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th colSpan={3}>Plants Search</th>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <th>Last Watered</th>
                      <th>Frequency (Days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search.map(plant => {
                      const { lastWater, waterFreq, cname } = plant;
                      const waterDate = new Date(lastWater).toLocaleDateString('en-US');
                      return (
                        <tr key={cname + lastWater}>
                          <td>{cname}</td>
                          <td>{waterDate}</td>
                          <td>{waterFreq}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--light-green)',
                padding: '1em',
                borderRadius: '1em',
                gap: '1em',
              }}
            >
              <button
                style={{
                  background: 'none',
                  border: '1px solid black',
                  borderRadius: '999em',
                  padding: '.5em 1em',
                }}
                onClick={e => {
                  generateReport();
                }}
              >
                Create Report
              </button>
              {report.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th colSpan={3}>{user.displayName}'s Plants Report</th>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <th>Last Watered</th>
                      <th>Frequency (Days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map(plant => {
                      const { lastWater, waterFreq, cname } = plant;
                      const waterDate = new Date(lastWater).toLocaleDateString('en-US');
                      return (
                        <tr key={cname + lastWater}>
                          <td>{cname}</td>
                          <td>{waterDate}</td>
                          <td>{waterFreq}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        ) : (
          <div className={styles.loginContent}>
            <h4>
              <span>Sorry!</span>
              <br />
              You cannot view your spaces without loggin in
            </h4>
            <video width="300px" autoPlay muted loop>
              <source src="./v1.1/SpaceLogin.webm" type="video/webm"></source>
            </video>
          </div>
        )}
      </main>

      <Footer activePage={1} />
    </div>
  );
};

export default Home;
