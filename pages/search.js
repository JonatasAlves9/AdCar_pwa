import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Search.module.css'
import Navbar from '../components/menu/menu'

import Link from 'next/link'

import api from '../services/api'

export default function Search() {

  const [cars, setCars] = useState([]);
  const [name, setName] = useState();

  async function showCars() {
    try {
      const { data } = await api.get('/cars');
      setCars(data);
      await console.log(cars)
    } catch (error) {
      console.log(error)
    }
  }

  async function searchCars() {
    try {
      const { data } = await api.get('/cars?search=' + name);
      setCars(data);
      await console.log(name)
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
          <div className={styles.image}>
            <img className={styles.img} src={cars.url_master} />
          </div>
          <div className={styles.info}>
            <p className={styles.carTitle}>{cars.name}</p>
            <p className={styles.carInfo}>
              <b>Marca: </b> {cars.brand} <br />
              <b>Cambio</b> {cars.gearbox}</p>

            <p className={styles.carPrice}>{cars.price}</p>

          </div>
        </div>
      </Link>
    </>
  )


  return (
    <div>
      <Navbar />
      <div className={styles.container}>

        <div className={styles.cardSearch}>
          <p className={styles.title}>Faça sua pesquisa</p>

          <div className={styles.centerDiv}>
            <input
              className={styles.input}
              type="text"
              name="text"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>

          <input
            onClick={() => searchCars()}
            className={styles.button}
            type="submit"
            value="Pesquisar"
          />
        </div>

        {carsCards}

      </div>
    </div>
  )
}
