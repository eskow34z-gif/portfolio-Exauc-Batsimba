import { useEffect } from "react"
import Lenis from "lenis"
import { CursorGlow, ScrollProgress } from "@/components/fx"
import { setLenis } from "@/lib/scroll"
import { Nav } from "@/sections/Nav"
import { Hero } from "@/sections/Hero"
import { Stack } from "@/sections/Stack"
import { Profil } from "@/sections/Profil"
import { Competences } from "@/sections/Competences"
import { Projets } from "@/sections/Projets"
import { Veille } from "@/sections/Veille"
import { Methode } from "@/sections/Methode"
import { Innovation } from "@/sections/Innovation"
import { Contact } from "@/sections/Contact"

export default function App() {
  // Défilement fluide (désactivé si l'utilisateur préfère moins d'animations)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    setLenis(lenis)
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); setLenis(null) }
  }, [])

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Profil />
        <Competences />
        <Projets />
        <Veille />
        <Methode />
        <Innovation />
        <Contact />
      </main>
    </>
  )
}
