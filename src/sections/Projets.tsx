import { useState } from "react"
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

export function Projets() {
  return (
    <section id="projets" className="relative mx-auto max-w-7xl px-5 py-32 md:px-10 md:py-44">
      <SectionHeader index="03" eyebrow="Projets" title="Du labo" italic="à la production." />

      {/* Flux Master — carte à points métalliques (OriginKit Shine Card) */}
      <Reveal className="mt-16">
        <ShineCard height={560} highlight="#a78bfa" glow="#8b5cf6" density={42}>
          <div className="flex h-full flex-col justify-between p-7 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-mint">● En production</span>
              <span className="font-mono text-xs text-mute">Plateforme web · Vercel</span>
            </div>
            <div className="max-w-xl">
              <div className="font-mono text-sm text-lilac">v<Counter to={18.47} decimals={2} /></div>
              <h3 className="mt-2 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">Flux <span className="font-serif font-normal italic text-gradient">Master</span></h3>
              <p className="mt-5 text-lg leading-relaxed text-soft">
                Une plateforme web que je conçois et maintiens moi-même, avec un programme bêta et un recueil d'avis utilisateurs (fonctionnalité la plus utile, prix jugé juste). Développée avec un agent IA : chaque modification passe par une branche et une relecture avant la mise en ligne.
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
            <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-mute">Infrastructure · BTS SIO</div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">Infrastructure Proxmox</h3>
            <p className="mt-3 text-soft">Mise en place d'un hyperviseur Proxmox VE pour héberger machines virtuelles et conteneurs. Mon labo pour tester des services et pratiquer le réseau sans risquer un environnement de production.</p>
            <div className="mt-5 flex flex-wrap gap-2">{["Proxmox VE", "VM", "LXC", "Snapshots"].map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-soft">{t}</span>)}</div>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="group bento-item h-full">
            <ProjectImage src="/images/stage-metm.png" alt="Réalisation pendant le stage chez METM" fallback={<div className="flex flex-col items-center gap-3 font-mono text-sm text-soft"><Briefcase size={44} className="text-lilac" />stage-metm</div>} />
            <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-mute">Stage · Entreprise</div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">Stage chez METM</h3>
            {/* À COMPLÉTER : décris tes vraies missions (2-3 phrases concrètes) */}
            <p className="mt-3 text-soft">Première immersion dans un environnement informatique réel : support aux utilisateurs et interventions techniques. J'y ai appris la rigueur et l'importance de bien communiquer avec les utilisateurs.</p>
            <div className="mt-5 flex flex-wrap gap-2">{["Support", "Terrain", "Entreprise"].map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-soft">{t}</span>)}</div>
          </article>
        </Reveal>
      </div>
      <span className="sr-only"><Server /></span>
    </section>
  )
}
