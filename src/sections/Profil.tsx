import { motion } from "motion/react"
import { Check } from "lucide-react"
import NeonBorder from "@/components/originkit/NeonBorder"
import { Reveal, ScrollHighlight, SectionHeader } from "@/components/fx"

const STEPS = [
  { n: "01", tag: "Constat", title: "Retard en réseau", text: "Moins d'implication en cours et en TP : adressage, sous-réseaux et VLAN moins maîtrisés que le reste.", color: "text-rose" },
  { n: "02", tag: "Prise de conscience", title: "Le réseau, c'est le métier", text: "Sans le réseau, on ne peut ni dépanner ni sécuriser quoi que ce soit. Je ne pouvais pas faire l'impasse.", color: "text-amber" },
  { n: "03", tag: "Action", title: "Rattrapage ciblé", text: "Je reprends les bases une par une, en commençant par l'adresse IP et les VLAN, avec l'IA comme prof particulier pour m'expliquer ce que je ne comprends pas.", color: "text-sky" },
  { n: "04", tag: "Aujourd'hui", title: "C'est en cours", text: "Je n'ai pas encore rattrapé tout mon retard. Mais j'ai retenu une chose : ne plus laisser une matière de côté parce qu'une autre m'intéresse plus.", color: "text-mint" },
]

const TIMELINE = [
  { when: "BTS SIO · 1re année", title: "Option SISR, IPSSI Val d'Europe", text: "Systèmes, réseaux, cybersécurité, support. Découverte de la virtualisation avec Proxmox." },
  { when: "Stage", title: "Stage chez METM", text: "Premier stage en entreprise, côté matériel (hardware) et logiciels (software)." },
  { when: "En parallèle", title: "Flux Master", text: "Un comparateur d'annonces de voitures d'occasion que j'ai créé, aujourd'hui en version 18 avec des bêta-testeurs." },
  { when: "BTS SIO · 2e année", title: "Recherche d'alternance", text: "Objectif : un poste de technicien systèmes & réseaux pour pratiquer et monter en compétences." },
]

const STRENGTHS = [
  ["Autonomie", "je cherche, je teste, je corrige. Flux Master en est à sa version 18."],
  ["Esprit de production", "quand une mise à jour casse quelque chose, je sais revenir en arrière et je lis les retours des utilisateurs."],
  ["IA", "je m'en sers tous les jours, mais je vérifie ce qu'elle me dit."],
  ["Remise en question", "j'ai vu mon retard en réseau et je le travaille."],
  ["Curiosité", "je suis l'actu tech tous les jours (voir ma veille plus bas)."],
]

export function Profil() {
  return (
    <section id="profil" className="relative mx-auto max-w-7xl px-5 py-32 md:px-10 md:py-44">
      <SectionHeader index="01" eyebrow="Profil" title="Qui je suis," italic="en vrai." />

      <ScrollHighlight
        className="mt-16 max-w-5xl text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.18] tracking-[-0.025em]"
        accent={["debout", "plante."]}
        text="J'aime comprendre comment une infra tient debout : les serveurs, le réseau, ce qui se passe quand un service tombe. À côté des cours, je maintiens une appli en production. Donc je sais ce que c'est d'être celui qui doit réparer quand ça plante."
      />

      {/* Bilan honnête — entouré d'une bordure néon (OriginKit) */}
      <Reveal className="relative mt-28">
        <div className="relative rounded-[28px]">
          <div className="pointer-events-none absolute inset-0">
            <NeonBorder color="#fbbf24" rounded={9} thickness={2} borderSize={40} glow={70} speed={6} />
          </div>
          <div className="relative rounded-[28px] bg-night-2/90 p-7 md:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber">Bilan personnel</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Honnêteté</span>
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Mon point faible de début d'année : <span className="font-serif font-normal italic text-amber">la matière réseau.</span>
            </h3>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-soft">
              Je préfère le dire clairement plutôt que le cacher : en début d'année, je ne me suis <strong className="text-white">pas assez impliqué dans les cours et TP réseau</strong>. Je passais mon temps sur Flux Master et sur l'IA, et j'ai pris du retard sur la base de l'option SISR. Voilà ce que j'ai fait ensuite.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
                >
                  <div className="font-mono text-[11px] uppercase tracking-widest text-mute">{s.n} · {s.tag}</div>
                  <div className={`mt-3 text-lg font-semibold ${s.color}`}>{s.title}</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-soft">{s.text}</p>
                  {i < STEPS.length - 1 && <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-white/30 to-transparent lg:block" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal><h3 className="text-2xl font-semibold tracking-tight">Parcours</h3></Reveal>
          <div className="relative mt-8 pl-8">
            <motion.div
              className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-lilac via-sky to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ bottom: 8 }}
            />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.12} className="relative pb-10 last:pb-0">
                <span className="absolute -left-8 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-lilac bg-night shadow-[0_0_16px_rgba(167,139,250,0.7)]" />
                <div className="font-mono text-xs uppercase tracking-widest text-lilac">{t.when}</div>
                <div className="mt-1.5 text-xl font-semibold tracking-tight">{t.title}</div>
                <p className="mt-1.5 text-soft">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal><h3 className="text-2xl font-semibold tracking-tight">Ce que j'apporte à une équipe</h3></Reveal>
          <ul className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {STRENGTHS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.08}>
                <li className="group flex items-start gap-4 py-5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet/30 to-azure/30 ring-1 ring-white/10 transition group-hover:from-violet group-hover:to-azure">
                    <Check size={14} />
                  </span>
                  <p className="text-[17px] leading-relaxed text-soft"><strong className="font-semibold text-white">{k}</strong> : {v}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
