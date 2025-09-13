'use client'

import Link from "next/link";
import styles from "./Pricing.module.scss"

const pricing = [
  {
    name: "Local storage",
    price: 1,
  },
  {
    name: "Online storage",
    price: 2,
  },
  {
    name: "Public storage",
    price: 4,
  },
  {
    name: "Private storage",
    price: 7,
  },
]

const Connection = [
  {
    name: "Public service",
    price: 0.1,
  },
  {
    name: "Private service",
    price: 0.7,
  },
];
const Timer = [
  {
    name: "Local storage",
    price: 0.1,
  },
  {
    name: "Online storage",
    price: 0.2,
  },
  {
    name: "Public storage",
    price: 0.4,
  },
  {
    name: "Private storage",
    price: 0.9,
  },
]

export default function Pricing() {



  return (

    <div className={styles.container}>

      <div className={styles.priceStatusService}>Price for a product</div>

      <div className={styles.pricing__container}>
        {pricing.map(item => (
          <div className={styles.pricing__items} key={item.name}>
            <span> {item.name} </span>   <span>{item.price} $ </span>
          </div>
        ))}
      </div>
      <br />
      <div className={styles.Connection}>Connection a user</div>
      <div className={styles.pricing__container}>
        {Connection.map(item => (
          <div className={styles.pricing__items} key={item.name}>
            <span> {item.name} </span>   <span>{item.price} $ </span>
          </div>
        ))}
      </div>
       <br />
      <div className={styles.Timer}>Price a week</div>
      <div className={styles.pricing__container}>
        {Timer.map(item => (
          <div className={styles.pricing__items} key={item.name}>
            <span> {item.name} </span>   <span>{item.price} $ </span>
          </div>
        ))}
      </div>
<br />

      <h4><b>Our service for creating questions each for 0.01 $</b></h4>
      <br />
  <Link 
  href="https://t.me/elfasa_tasa" 
  target="_blank" 
  rel="noopener noreferrer"
  className={styles.btn}
>
  Use the service
</Link>
    </div>
  )
}