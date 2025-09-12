'use client'

import { useState } from "react"
import Image from "next/image"
import styles from "./Menu.module.scss"
import ELFAS from "../../../public/assets/img/ELFASA.jpg"
import Link from "next/link"

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
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/create">Create</Link>
        <Link href="/price">Price</Link>
      </nav>

      {/* Profile */}
      <div className={styles.profile}>
        <Link href="/profile">Profile</Link>
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
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/create">Create</Link>
          <Link href="/price">Price</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>

      {/* Затемнение */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </header>
  )
}
