import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, X } from "lucide-react"
import { scrollToId } from "@/lib/scroll"
import { cn } from "@/lib/utils"

const LINKS = [
  { id: "profil", label: "Profil" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "veille", label: "Veille" },
  { id: "methode", label: "Méthode" },
  { id: "innovation", label: "Innovation" },
]

export function Nav() {
  const [active, setActive] = useState("")
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s))
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect() }
  }, [])

  const go = (id: string) => { setOpen(false); scrollToId(id) }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className="glass flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-[background] duration-500"
        style={{ background: scrolled ? "rgba(8, 7, 16, 0.86)" : undefined }}
      >
        <button onClick={() => go("accueil")} className="flex items-center gap-2.5 rounded-full px-2 py-1" aria-label="Retour en haut">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet to-azure font-serif text-[15px] italic text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.8)]">Eb</span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">Exaucé Batsimba</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className={cn("relative rounded-full px-3.5 py-2 text-[13.5px] transition-colors", active === l.id ? "text-white" : "text-soft hover:text-white")}>
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={() => go("contact")} className="rounded-full bg-white px-4 py-2 text-[13.5px] font-medium text-night transition hover:bg-lilac">
            Me contacter
          </button>
          <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/10 lg:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            className="glass absolute top-16 w-[calc(100%-2rem)] max-w-5xl rounded-3xl bg-night/80 p-3 lg:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className="w-full rounded-2xl px-4 py-3 text-left text-lg text-soft hover:bg-white/5 hover:text-white">{l.label}</button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
