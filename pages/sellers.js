import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Sellers.module.css'
import Navbar from '../components/menu/menu'
import api from '../services/api';
import Link from 'next/link';



export default function Sellers() {

  const [sellers, setSellers] = useState(['']);

  async function showAllSellers() {
    try {
      const { data } = await api.get('/sellers');
      setSellers(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showAllSellers()
  }, []);

  const listSellers = sellers.map(seller =>
    <div key={seller.id} className={styles.card}>
      <p className={styles.titleCard}>{seller.name}</p>
      <p className={styles.infoCard}><b>Email:</b> <br /> {seller.email}<br /><b>Telefone:</b> <br /> {seller.cellphone}</p>

      <Link 
       href={'https://api.whatsapp.com/send?phone=55'+seller.cellphone}>      
      <input
        className={styles.button}
        type="submit"
        value="WhatsApp"
      />
      </Link>

    </div>
  )

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <p className={styles.title}>Consultores</p>

        <div className={styles.containerCards}>

          {listSellers}
        </div>

      </div>
    </div>
  )
}
