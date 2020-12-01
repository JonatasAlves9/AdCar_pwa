import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Car.module.css'
import Navbar from '../components/menu/menu'
import api from '../services/api'
import { useRouter } from 'next/router'
import { Carousel } from 'react-bootstrap'

export default function Car() {
  const router = useRouter()

  const { id } = router.query
  const [car, setCar] = useState();
  const [images, setImages] = useState();

  async function showCar() {
    try {
      const { data } = await api.get('/images/' + id);
      setCar(data);
      setImages(data.url)
      console.log(images)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    showCar()
  }, [id]);

  if (images !== undefined && car !== undefined) {
    const carouselImage = images.map(image =>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image.url}
          alt="Third slide"
        />

      </Carousel.Item>
    )

    return (
      <div>
        <Navbar />
        <div className={styles.container}>

          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={car.car.url_master}
                alt="Third slide"
              />

            </Carousel.Item>
            {carouselImage}

          </Carousel>
          <div className={styles.cardsCenter}>
            <div className={styles.cardInfo}>
              <p className={styles.titlePrice}><b>R$ {car.car.price}</b> </p>

              <p className={styles.pInfo}><b>{car.car.name}</b> <br />
                <b>Marca:</b> {car.car.brand} <br />
                <b>Km:</b> {car.car.km} <br />
                <b>Ano:</b> {car.car.year} <br /></p>


            </div>
          </div>
          <div className={styles.cardsCenter}>
            <div className={styles.cardInfo}>
              <p className={styles.titleDescription}><b>Descrição</b> </p>

              <p className={styles.pInfo}>{car.car.description}</p>

              <input
                className={styles.button}
                type="submit"
                value="Entrar em contato"
              />

            </div>
          </div>
        </div>
      </div>)
  } else {
    return (
      <div>Carregando</div>
    )
  }


}
