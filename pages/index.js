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

  const [cars, setCars] = useState();

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

  if (cars !== undefined) {

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

    return (

      <div>
        <Navbar />
        <div className={styles.container}>
          <Head>
            <title>Home</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className={styles.cardMain}>
            <div className={styles.cardSecundary}>
              <figure>
                <img className={styles.imageMain} src="https://media.gazetadopovo.com.br/2020/01/17155825/lamborghini-huracan-Alexander-Migl-wikimedia-commons-660x372.jpg" alt="Minha Figura" />
              </figure>
              <div className={styles.cardInfo}>
                <h6 className={styles.text}>Top</h6>
                <h4 className={styles.text}>Corolla</h4>
                <button className={styles.buttonMain}>Ver carro</button>
              </div>
            </div>
          </div>

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
