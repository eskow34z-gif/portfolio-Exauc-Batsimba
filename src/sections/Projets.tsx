import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Briefcase, GitBranch, GitPullRequest, Rocket, Server, Eye } from "lucide-react"
import ShineCard from "@/components/originkit/ShineCard"
import { Counter, Reveal, SectionHeader } from "@/components/fx"
import { Brand } from "@/components/fx/Brand"

const FLOW = [
  { icon: GitBranch, label: "Branche" },
  { icon: GitPullRequest, label: "Pull request" },
  { icon: Eye, label: "Préproduction" },
  { icon: Rocket, label: "Production" },
]

function ProjectImage({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [ok, setOk] = useState(true)
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.07] bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.35),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(59,130,246,0.3),transparent_50%)] bg-night-2">
      {ok ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      ) : (
        <div className="grid h-full place-items-center">{fallback}</div>
      )}
    </div>
  )
}

/** Hauteur de la carte Flux Master selon la largeur d'écran (la carte a une hauteur fixe). */
function useCardHeight() {
  const pick = () => (window.innerWidth < 640 ? 860 : window.innerWidth < 1024 ? 680 : 600)
  const [h, setH] = useState(pick)
  useEffect(() => {
    const on = () => setH(pick())
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])
  return h
}

export function Projets() {
  const cardHeight = useCardHeight()
  return (
    <section id="projets" className="relative mx-auto max-w-7xl px-5 py-32 md:px-10 md:py-44">
      <SectionHeader index="03" eyebrow="Projets" title="Du labo" italic="à la production." />

      {/* Flux Master — carte à points métalliques (OriginKit Shine Card) */}
      <Reveal className="mt-16">
        <ShineCard height={cardHeight} highlight="#a78bfa" glow="#8b5cf6" density={42}>
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-[#0d0b1a] via-[#0d0b1a]/90 to-[#0d0b1a]/40 md:bg-gradient-to-r md:via-[#0d0b1a]/80 md:to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-7 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-mint">● En production</span>
              <span className="font-mono text-xs text-mute">Voitures d'occasion · Vercel</span>
            </div>
            <div className="max-w-xl">
              <div className="font-mono text-sm text-lilac">v<Counter to={18.47} decimals={2} /></div>
              <h3 className="mt-2 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">Flux <span className="font-serif font-normal italic text-gradient">Master</span></h3>
              <p className="mt-5 text-lg leading-relaxed text-soft">
                Un comparateur d'annonces de voitures d'occasion. Il récupère les annonces de plus de 15 sites (AutoScout24, ParuVendu…) et calcule pour chaque voiture le prix du marché et la vraie marge, une fois payés la carte grise, le transport et le contrôle technique. Il dit ensuite si c'est une bonne affaire, une voiture à négocier ou à éviter.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">
                Gratuit, en bêta avec de vrais testeurs. Derrière : une base de données, des robots qui collectent les annonces automatiquement, et des agents IA qui font un audit de sécurité chaque lundi.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {FLOW.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-2"
                >
                  <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-sm">
                    <f.icon size={15} className="text-lilac" /> {f.label}
                  </span>
                  {i < FLOW.length - 1 && <span className="text-mute">→</span>}
                </motion.div>
              ))}
              <span className="ml-auto hidden gap-3 text-mute md:flex"><Brand name="github" className="h-5 w-5" /><Brand name="vercel" className="h-5 w-5" /><Brand name="claude" className="h-5 w-5" /></span>
            </div>
          </div>
        </ShineCard>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Reveal>
          <article className="group bento-item h-full">
            <ProjectImage src="/images/proxmox.png" alt="Interface Proxmox VE de mon infrastructure" fallback={<div className="flex flex-col items-center gap-3 font-mono text-sm text-soft"><Brand name="proxmox" color className="h-12 w-12" />proxmox-lab</div>} />
            <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-mute">TP · BTS SIO</div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">Virtualisation avec Proxmox</h3>
            <p className="mt-3 text-soft">En TP, j'ai utilisé Proxmox pour créer des machines virtuelles : plusieurs ordinateurs simulés sur un seul serveur. Ça permet de tester des choses sans risquer de casser un vrai poste.</p>
            <div className="mt-5 flex flex-wrap gap-2">{["Proxmox", "Machines virtuelles", "TP"].map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-soft">{t}</span>)}</div>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="group bento-item h-full">
            <ProjectImage src="/images/stage-metm.png" alt="Réalisation pendant le stage chez METM" fallback={<div className="flex flex-col items-center gap-3 font-mono text-sm text-soft"><Briefcase size={44} className="text-lilac" />stage-metm</div>} />
            <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-mute">Stage · Entreprise</div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">Stage chez METM</h3>
                        <p className="mt-3 text-soft">Mon premier stage en entreprise. J'y ai installé des postes de travail et des logiciels Windows, côté matériel (hardware) comme côté logiciel (software).</p>
            <div className="mt-5 flex flex-wrap gap-2">{["Installation de postes", "Windows", "Logiciels"].map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-soft">{t}</span>)}</div>
          </article>
        </Reveal>
      </div>
      <span className="sr-only"><Server /></span>
    </section>
  )
}
