import Head from 'next/head'
import styles from '../styles/Login.module.css'
import { Button, Form } from 'react-bootstrap';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.cardLogin}>
        <h2 className={styles.title}>AdCar</h2>
        <input
          className={styles.input}
          type="text"
          name="user"
          placeholder="E-mail"
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Senha"
        />
        <input
          className={styles.button}
          type="submit"
          value="Login"
        />
        <p className={styles.link}>Ainda não é cadastrado?<br/> Faça login!</p><br/>
      </div>

    </div>
  )
}
