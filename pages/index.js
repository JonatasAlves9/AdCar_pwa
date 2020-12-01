import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/menu/menu'
import Link from 'next/link'

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
        <div className={styles.cardConsultores}>
          <div className={styles.cardWhite}>
            <div className={styles.cardLeft}>
              <div className={styles.logo}>

              </div>
            </div>
            <div className={styles.cardRight}>
              <p className={styles.titleConsultores}>QUER NEGOCIAR?</p>
              <p className={styles.textoConsultores}>Entre em contato com nossos vendedores!</p>
              <Link
              href={'/sellers'}>      
              <input
                className={styles.button}
                type="submit"
                value="Vendedores"
              />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}