import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/menu/menu'
import Link from 'next/link'
import { Fab } from '@material-ui/core';
import { Call } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

import api from '../services/api'

export default function Home() {

  const [cars, setCars] = useState([]);

  async function showCars() {
    try {
      const { data } = await api.get('/cars');
      setCars(data);
      await console.log(cars)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showCars()
  }, []);


  const carsCards = cars.map(cars =>
    <>
      <Link
        href={'/car?id=' + cars.id}>
        <div className={styles.card}>
          <img className={styles.img} src={cars.url_master} />
        </div>
      </Link>
    </>
  )

  if (cars !== undefined) {

    return (

      <div>
        <Navbar />
        <div className={styles.container}>
          <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className={styles.containerBanner}>
            <p className={styles.titleDestaques}>Destaques</p>

            <div className={styles.containerDestaques}>
              {carsCards}
            </div>
          </div>
          <div className={styles.containerBanner}>
            <p className={styles.titleNovidades}>Novidades</p>

            <div className={styles.containerDestaques}>
              {carsCards}

            </div>
          </div>

          <div className={styles.fab}>
            <Link
              href={'/sellers'}>
              <Fab aria-label="edit">
                <Call />
              </Fab>
            </Link>
          </div>

        </div>

      </div>
    )
  } else {
    return (

      <div>
        <Navbar />
        <div className={styles.container}>
          <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className={styles.containerBanner}>
            <p className={styles.titleDestaques}>Destaques</p>

            <div className={styles.containerDestaques}>
            
            <Skeleton animation="wave" variant="rect" width={500} height={118} />
            </div>
          </div>
          <div className={styles.containerBanner}>
            <p className={styles.titleNovidades}>Novidades</p>

            <div className={styles.containerDestaques}>
            <Skeleton animation="wave" variant="rect" width={500} height={118} />
            </div>
          </div>

          <div className={styles.fab}>
            <Link
              href={'/sellers'}>
              <Fab aria-label="edit">
                <Call />
              </Fab>
            </Link>
          </div>

        </div>

      </div>
    )
  }


}
