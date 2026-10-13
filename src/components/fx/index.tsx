import { useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/** Apparition douce (flou → net) quand l'élément entre à l'écran. */
export function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Titre qui se dévoile lettre par lettre, du flou vers le net. */
export function BlurText({ text, className, delay = 0, stagger = 0.035, as = "span", gradient = false }: { text: string; className?: string; delay?: number; stagger?: number; as?: "span" | "h1" | "h2"; gradient?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const words = text.split(" ")
  // background-clip: text ne traverse pas les enfants transformés : pour un texte
  // en dégradé, on anime mot par mot et chaque mot porte lui-même le dégradé.
  if (gradient) {
    return (
      <span ref={ref} className={cn("inline", className)} aria-label={text}>
        {words.map((w, wi) => (
          <motion.span
            key={wi}
            aria-hidden="true"
            className="text-gradient inline-block whitespace-nowrap pr-[0.08em]"
            initial={{ opacity: 0, filter: "blur(14px)", y: "0.3em" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.9, delay: delay + wi * stagger * 4, ease: EASE }}
          >
            {w}
            {wi < words.length - 1 && "\u00a0"}
          </motion.span>
        ))}
      </span>
    )
  }
  let i = 0
  const Tag = as as "span"
  return (
    <Tag ref={ref} className={cn("inline", className)} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {[...w].map((ch, ci) => {
            const d = delay + i++ * stagger
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ opacity: 0, filter: "blur(14px)", y: "0.35em", scale: 1.15 }}
                animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: d, ease: EASE }}
              >
                {ch}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}

/** Mot qui change en boucle avec un fondu flouté. */
export function WordRotate({ words, className, interval = 2400 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  return (
    <span className={cn("relative inline-grid", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ opacity: 0, y: "0.6em", filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.6em", filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function HighlightWord({ word, progress, range, className }: { word: string; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const blur = useTransform(progress, range, [4, 0])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  return (
    <motion.span style={{ opacity, filter }} className={cn("inline-block whitespace-pre", className)}>
      {word}{" "}
    </motion.span>
  )
}

/** Paragraphe dont les mots s'allument au fil du défilement. */
export function ScrollHighlight({ text, className, accent = [] }: { text: string; className?: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = text.split(" ")
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length
        const isAccent = accent.some((a) => w.toLowerCase().includes(a.toLowerCase()))
        return (
          <HighlightWord key={i} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} className={isAccent ? "font-serif italic text-gradient pr-[0.1em]" : undefined} />
        )
      })}
    </p>
  )
}

/** En-tête de section : numéro, sur-titre, titre (avec partie en italique), chapeau. */
export function SectionHeader({ index, eyebrow, title, italic, lead, className }: { index: string; eyebrow: string; title: string; italic?: string; lead?: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-mute">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-lilac to-transparent" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
        <BlurText text={title} stagger={0.018} />
        {italic && (
          <>
            {" "}
            <span className="font-serif font-normal italic tracking-[-0.02em]">
              <BlurText text={italic} delay={title.length * 0.018} stagger={0.02} gradient />
            </span>
          </>
        )}
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft md:text-xl">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Compteur animé. */
export function Counter({ to, decimals = 0, suffix = "", prefix = "" }: { to: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const [val, setVal] = useState(0)
  useEffect(() => { if (inView) spring.set(to) }, [inView, spring, to])
  useMotionValueEvent(spring, "change", (v) => setVal(v))
  return <span ref={ref} className="tabular-nums">{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/** Bouton « magnétique » qui suit légèrement la souris. */
export function Magnetic({ children, className, strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/** Halo qui suit la souris sur toute la page. */
export function CursorGlow() {
  const x = useSpring(-500, { stiffness: 120, damping: 25 })
  const y = useSpring(-500, { stiffness: 120, damping: 25 })
  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{ x, y, background: "radial-gradient(closest-side, rgba(139,92,246,0.10), transparent)" }}
    />
  )
}

/** Barre de progression de lecture en haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-violet via-lilac to-sky" style={{ scaleX }} />
}

/** Barre de niveau qui se remplit à l'apparition. */
export function LevelBar({ label, value, note, tone = "violet" }: { label: string; value: number; note: string; tone?: "violet" | "amber" }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="text-soft">{label}</span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-mute">{note}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={cn("h-full rounded-full", tone === "amber" ? "bg-gradient-to-r from-amber to-mint" : "bg-gradient-to-r from-violet to-sky")}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        />
      </div>
    </div>
  )
}
