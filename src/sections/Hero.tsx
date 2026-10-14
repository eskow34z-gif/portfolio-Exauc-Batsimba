import { motion, useScroll, useTransform } from "motion/react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { useRef } from "react"
import RibbonGlow from "@/components/originkit/RibbonGlow"
import { BlurText, Magnetic, WordRotate } from "@/components/fx"
import { scrollToId } from "@/lib/scroll"

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <section ref={ref} id="accueil" className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 md:items-center md:pb-0">
      {/* Rubans de lumière WebGL (OriginKit) */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <RibbonGlow background="#05040a" color1="#7c3aed" color2="#3b82f6" speed={38} size={118} angle={-160} reach={320} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,transparent_20%,#05040a_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-night" />

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-[13px] text-soft"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
          </span>
          BTS SIO · Option SISR
        </motion.div>

        <h1 className="mt-8 text-[clamp(4.4rem,18vw,11.5rem)] md:text-[clamp(4rem,13vw,11.5rem)] font-semibold leading-[0.86] tracking-[-0.06em]">
          <BlurText text="Exaucé" delay={0.3} stagger={0.06} />
          <br />
          <span className="font-serif font-normal italic tracking-[-0.03em]">
            <BlurText text="Batsimba." delay={0.65} stagger={0.06} gradient />
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            className="max-w-xl text-xl leading-snug text-soft md:text-2xl"
          >
            Technicien systèmes &amp; réseaux en formation. Je construis{" "}
            <WordRotate className="font-medium text-white" words={["des infrastructures.", "des réseaux.", "des déploiements.", "avec des agents IA."]} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: EASE }}
            className="flex flex-wrap gap-3 md:justify-end"
          >
            <Magnetic>
              <button onClick={() => scrollToId("veille")} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-[15px] font-medium text-night">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-lilac via-sky to-lilac transition-transform duration-700 group-hover:translate-x-0" />
                <span className="relative">Découvrir ma veille</span>
                <ArrowRight size={17} className="relative transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => scrollToId("projets")} className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium text-white transition hover:bg-white/10">
                Mes projets
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.9 }}
          className="mt-14 hidden items-center justify-between border-t border-white/10 pt-6 text-[13px] text-mute md:flex"
        >
          <span className="font-mono">IPSSI Val d'Europe · Option SISR</span>
          <button onClick={() => scrollToId("profil")} className="flex items-center gap-2 text-soft hover:text-white">
            Faire défiler <ArrowDown size={15} style={{ animation: "float-y 2s ease-in-out infinite" }} />
          </button>
          <span className="font-mono">Veille : l'IA dans Flux Master</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
