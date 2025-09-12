'use client'

import { useState } from "react"
import Image from "next/image"
import styles from "./Menu.module.scss"
import ELFAS from "../../../public/assets/img/ELFASA.jpg"

export default function Menu() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      {/* Лого */}
      <div className={styles.logo}>
        <Image
          className={styles.logoImage}
          src={ELFAS}
          alt="ELFAS"
          width={40}
          height={40}
        />
        <b>ELFASA</b>
      </div>

      {/* Навигация */}
      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/create">Create</a>
        <a href="/price">Price</a>
      </nav>

      {/* Profile */}
      <div className={styles.profile}>
        <a href="/profile">Profile</a>
      </div>

      {/* Бургер */}
      <button
        className={`${styles.burger} ${open ? styles.active : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
      </button>

      {/* Сайдбар */}
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <nav className={styles.sidebarLinks}>
          <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/create">Create</a>
        <a href="/price">Price</a>
          <a href="/profile">Profile</a>
        </nav>
      </div>

      {/* Затемнение */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </header>
  )
}
