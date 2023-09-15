import Footer from '../../components/footer';
import styles from '../../styles/Home.module.css';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../components/header';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
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
import { db } from '../../firebase';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { Input } from '@nextui-org/react';
import { FaRecycle } from 'react-icons/fa';

type Space = {
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  user: string;
  color: string;
}[];

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

const Page: NextPage = () => {
  const { isLoggedIn, user } = useAuth();
  const searchParams = useSearchParams();
  const spaceId = searchParams.get('s');
  const [plants, setPlants] = useState<Plant>([]);
  const [space, setSpace] = useState<Space>([]);
  useEffect(() => {
    refreshSpace();
    refreshPlants();
  }, [user]);

  const refreshSpace = async () => {
    if (spaceId != null) {
      let ar: Space = [];
      const spaceRef = doc(db, 'spaces', spaceId);
      try {
        const docSnap = await getDoc(spaceRef);
        if (docSnap != null) {
          ar.push({
            createdAt: docSnap.data()?.createdAt,
            description: docSnap.data()?.description,
            id: docSnap.data()?.id,
            title: docSnap.data()?.title,
            user: docSnap.data()?.user,
            color: docSnap.data()?.color,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSpace(ar);
        console.log(space);
      }
    }
  };

  const refreshPlants = async () => {
    if (user !== '' && user !== null) {
      let ar: Plant = [];
      console.log('userid: ' + (user as any).uid);
      console.log('spaceid: ' + spaceId);

      const q = query(
        collection(db, 'plants'),
        where('user', '==', (user as any).uid),
        where('space', '==', spaceId)
      );
      try {
        const docSnap = await getDocs(q);
        docSnap.forEach(doc => {
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
        setPlants(ar);
      }
    }
  };

  const handleCreatePlant = async (com: string, sci: string, wfreq: string) => {
    try {
      const newPlantRef = doc(collection(db, 'plants'));

      const data = {
        lastWater: Date.now(),
        waterFreq: parseInt(wfreq),
        description: '',
        cname: com,
        sname: sci,
        user: (user as any).uid,
        space: spaceId,
      };

      await setDoc(newPlantRef, data);
    } catch (error) {
      console.log(error);
    } finally {
      refreshPlants();
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>About</title>
        <meta name="description" content="This is a user's space to track plants" />
        <link rel="icon" href="./FC_Logo.LG.ico" />
      </Head>
      <main className={styles.page}>
        <Header />
        {isLoggedIn ? (
          <section className={styles.pageContent}>
            <h1>{space[0]?.title}</h1>

            {plants.map(plant => {
              const { lastWater, waterFreq, description, id, cname, sname, user, space } = plant;
              return (
                <div className={styles.expItem} key={id}>
                  <button className={styles.expTag}></button>
                  <div className={styles.expName}>
                    <h3>{cname}</h3>
                    <h4>
                      <em>{sname}</em>
                    </h4>

                    <button className={styles.expTrash}>
                      <FaRecycle style={{ fontSize: '1.5em' }} />
                    </button>
                  </div>
                </div>
              );
            })}

            <Popover placement="top" closeOnBlur={true}>
              <PopoverTrigger>
                <button className={styles.addTodo}>Add Plant</button>
              </PopoverTrigger>
              <PopoverContent
                style={{
                  alignItems: 'center',
                  background: '#eee',
                  borderRadius: '.5em',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  gap: '1em',
                  justifyContent: 'center',
                  padding: '1em',
                }}
              >
                <PopoverBody
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    gap: '1em',
                    width: '80vw',
                  }}
                >
                  <Input
                    labelLeft="Common Name"
                    aria-label="comName"
                    id="comName"
                    style={{ textAlign: 'center' }}
                  />
                  <Input
                    labelLeft="Scientific Name"
                    aria-label="sciName"
                    id="sciName"
                    style={{ textAlign: 'center' }}
                  />
                  <Input
                    labelRight="Days between watering"
                    type="number"
                    aria-label="waterFreq"
                    id="waterFreq"
                    style={{ textAlign: 'center', width: '50px' }}
                  />
                  <PopoverCloseButton
                    style={{ aspectRatio: '1', position: 'absolute', top: '-10px', right: '-10px' }}
                  />
                </PopoverBody>

                <PopoverFooter
                  alignItems="center"
                  border="0"
                  display="flex"
                  justifyContent="space-between"
                  pb={4}
                >
                  <button
                    style={{
                      background: 'none',
                      border: '1px solid black',
                      borderRadius: '.5em',
                      padding: '.5em 1em',
                    }}
                    onClick={e => {
                      const c =
                        e.currentTarget.parentElement?.parentElement?.parentElement?.firstChild?.firstChild?.firstChild?.firstChild?.lastChild?.lastChild?.value.toString();
                      const s =
                        e.currentTarget.parentElement?.parentElement?.parentElement?.firstChild?.firstChild?.childNodes[1]?.firstChild?.lastChild?.lastChild?.value.toString();

                      const w =
                        e.currentTarget.parentElement?.parentElement?.parentElement?.firstChild
                          ?.firstChild?.childNodes[2]?.firstChild?.lastChild?.firstChild?.value;

                      handleCreatePlant(c, s, w);
                    }}
                  >
                    Add
                  </button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </section>
        ) : (
          <div className={styles.loginContent}>
            <video width="300px" autoPlay muted loop>
              <source src="../../v1.1/SpaceLogin.webm" type="video/webm"></source>
            </video>
          </div>
        )}
      </main>
      <Footer activePage={2} />
    </div>
  );
};

export default Page;
