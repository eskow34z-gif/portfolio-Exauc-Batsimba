import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import NeonBorder from "@/components/originkit/NeonBorder"
import { BlurText, Reveal } from "@/components/fx"
import { Brand, type BrandName } from "@/components/fx/Brand"
import { cn } from "@/lib/utils"

type Spec = {
  key: string
  name: string
  short: string
  def: string
  tools: string
  logos?: BrandName[]
  usage: string
  me: string
  limits: string
}

const SPECS: Spec[] = [
  {
    key: "gen", name: "IA générative (texte)", short: "Générative",
    def: "C'est l'IA qu'on connaît tous : ChatGPT, Claude, Gemini. Elle a lu énormément de textes, et elle écrit une réponse en devinant, mot après mot, la suite la plus probable.",
    tools: "Groq et Gemini (dans Flux Master), Claude.", logos: ["gemini", "claude"],
    usage: "Lire un texte et en sortir l'essentiel, aider à écrire du code ou une procédure.",
    me: "Dans Flux Master, une IA lit la description de chaque bonne affaire et en sort les défauts et les frais à prévoir (par exemple « embrayage à changer »). Si un fournisseur d'IA ne répond pas, le script passe automatiquement au suivant : c'est de la redondance, comme en réseau.",
    limits: "Elle peut se tromper avec assurance (une « hallucination »). Dans Flux Master, son avis s'ajoute au calcul, il ne le remplace pas.",
  },
  {
    key: "vision", name: "IA de vision", short: "Vision",
    def: "Une IA spécialisée dans les images : elle « regarde » une photo et décrit ce qu'elle voit.",
    tools: "Gemini Vision (dans Flux Master).", logos: ["gemini"],
    usage: "Repérer un défaut sur une photo, lire un document scanné, reconnaître un objet.",
    me: "Dans Flux Master, une IA de vision examine les photos d'une annonce : état général, voyants allumés au tableau de bord, et les zones que le vendeur n'a pas montrées.",
    limits: "Une photo ne montre pas tout : l'analyse reste prudente et donne un niveau de confiance, pas une certitude.",
  },
  {
    key: "cyber", name: "IA de cybersécurité / anti-fraude", short: "Anti-fraude",
    def: "Une IA qui repère ce qui est anormal ou suspect : un programme dangereux sur un ordinateur, ou une arnaque dans une annonce.",
    tools: "Microsoft Defender (ordinateurs), agent anti-fraude de Flux Master (annonces).",
    usage: "Bloquer un rançongiciel, détecter une fausse annonce avant qu'un acheteur se fasse piéger.",
    me: "J'ai développé un agent anti-fraude pour Flux Master : quand une annonce arrive, une IA lui donne une note de risque de 0 à 100. Au-dessus de 70, l'annonce est mise en quarantaine au lieu d'être publiée.",
    limits: "Elle peut bloquer une vraie annonce ou laisser passer une arnaque. Et les fraudeurs utilisent aussi l'IA pour rendre leurs annonces plus crédibles.",
  },
  {
    key: "aiops", name: "IA de supervision", short: "Supervision",
    def: "Une IA qui surveille un système en permanence et prévient quand quelque chose ne va pas, idéalement avant la panne.",
    tools: "Datadog (en entreprise), mes agents d'audit (Flux Master).", logos: ["datadog"],
    usage: "Être prévenu qu'un disque ou une base de données sera bientôt pleine.",
    me: "Chaque lundi, un agent IA fait l'audit de Flux Master : taille de la base de données (limite gratuite de 500 Mo), calculs qui échouent, sites qui ne renvoient plus d'annonces, failles de sécurité. Il m'écrit un rapport.",
    limits: "Il faut quand même savoir lire son rapport et décider soi-même. Et un agent peut rater un problème.",
  },
  {
    key: "agents", name: "Agents IA", short: "Agents",
    def: "Une IA qui ne se contente pas de répondre : elle agit. Elle peut utiliser des outils (lire un fichier, consulter un site, lancer une action), regarder le résultat, puis continuer.",
    tools: "Claude Code, branché sur GitHub, Vercel et la base de données grâce au MCP.", logos: ["claude", "mcp"],
    usage: "Corriger un bug, préparer une modification, faire un audit.",
    me: "Je développe Flux Master avec un agent IA. Mes agents ont des règles strictes : ils ne suppriment rien et ne mettent rien en ligne seuls. Ils proposent, et c'est moi qui relis et valide. C'est l'innovation que j'ai choisie, je la détaille plus bas.",
    limits: "Quand un agent se trompe, il ne fait pas qu'écrire une bêtise : il l'exécute. Il faut donc limiter ses droits et valider ce qu'il fait.",
  },
]

const RINGS = [
  { label: "Intelligence artificielle", text: "Le grand ensemble : faire faire à une machine des choses qui demandent normalement de l'intelligence." },
  { label: "Machine learning", text: "La machine apprend toute seule à partir de milliers d'exemples, au lieu qu'on lui écrive toutes les règles." },
  { label: "Deep learning", text: "Une façon plus poussée d'apprendre, inspirée du cerveau. Utilisée pour les images, la voix et le texte." },
  { label: "IA générative", text: "Celle qui crée du texte ou des images : ChatGPT, Claude, Gemini." },
]

export function Veille() {
  const [active, setActive] = useState(0)
  const [ring, setRing] = useState(3)
  const spec = SPECS[active]

  return (
    <section id="veille" className="relative overflow-hidden py-32 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.18),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-mute">04</span>
            <span className="h-px w-10 bg-gradient-to-r from-lilac to-transparent" />
            <span className="eyebrow">Veille technologique</span>
          </div>
        </Reveal>

        <h2 className="mt-8 text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
          <BlurText text="« L'IA » n'existe pas." stagger={0.03} />
          <br />
          <span className="font-serif font-normal italic tracking-[-0.03em]">
            <BlurText text="Il existe des IA." delay={0.6} stagger={0.04} gradient />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-soft">
            Ma veille ne porte pas sur l'IA en général, mais sur les <strong className="text-white">IA spécialisées</strong>. Et je l'ai tournée vers le projet que j'utilise le plus : <strong className="text-white">Flux Master</strong>, où j'en utilise déjà plusieurs.
          </p>
        </Reveal>

        {/* Problématique */}
        <Reveal className="mt-20">
          <div className="relative rounded-[28px]">
            <div className="pointer-events-none absolute inset-0">
              <NeonBorder color="#a78bfa" rounded={8} thickness={2} borderSize={60} glow={90} speed={8} />
            </div>
            <div className="relative rounded-[28px] bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(5,4,10,0.92)_60%)] px-7 py-10 md:px-14 md:py-16">
              <div className="eyebrow">Problématique</div>
              <p className="mt-5 text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em]">
                Comment des <span className="font-serif italic text-gradient">IA spécialisées</span> peuvent faire tourner et surveiller une application comme Flux Master, <span className="font-serif italic text-gradient">sans créer de nouveaux risques</span> ?
              </p>
            </div>
          </div>
        </Reveal>

        {/* Réponse à la question du jury + cercles emboîtés */}
        <div className="mt-24 grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber">Question qu'on m'a posée</span>
            <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">« L'IA a des spécialisations » : <span className="font-serif font-normal italic text-lilac">qu'est-ce que tu veux dire par là ?</span></h3>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-soft">
              <p>Une IA n'est pas « intelligente en général » : c'est un <strong className="text-white">modèle entraîné sur un type de données précis pour une tâche précise</strong>. L'IA qui repère un virus sur un ordinateur n'a rien à voir avec ChatGPT : elle n'a pas appris les mêmes choses et ne sait pas faire les mêmes choses.</p>
              <p>Aujourd'hui, toutes les IA sont <strong className="text-white">spécialisées</strong> : chacune sait faire une chose. Une IA capable de tout faire comme un humain, ça n'existe pas encore. Dans Flux Master, j'en utilise <strong className="text-white">cinq</strong>. Les voici, chacune avec un exemple tiré de mon projet.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[520px]">
              <div className="relative aspect-square w-full">
                {RINGS.map((r, i) => {
                  const size = 100 - i * 19
                  const on = ring === i
                  return (
                    <button
                      key={r.label}
                      onMouseEnter={() => setRing(i)}
                      onFocus={() => setRing(i)}
                      onClick={() => setRing(i)}
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border transition-all duration-500",
                        on ? "border-lilac/80 bg-violet/[0.12] shadow-[0_0_60px_-12px_rgba(139,92,246,0.8)]" : "border-white/10 bg-white/[0.012] hover:border-white/25",
                      )}
                      style={{ width: `${size}%`, height: `${size}%` }}
                      aria-label={r.label}
                    >
                      <span className={cn("absolute left-1/2 top-[7%] -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest transition-colors sm:text-[11.5px]", on ? "text-white" : "text-mute")}>{r.label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 min-h-[64px] text-center">
                <AnimatePresence mode="wait">
                  <motion.p key={ring} initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(6px)" }} className="text-[15px] leading-snug text-soft">
                    <strong className="text-white">{RINGS[ring].label}</strong> — {RINGS[ring].text}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-mute">Survoler un cercle</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Les 5 spécialisations */}
        <div className="mt-28">
          <Reveal>
            <h3 className="text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]">Les 5 spécialisations <span className="font-serif font-normal italic text-gradient">à l'œuvre dans Flux Master.</span></h3>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[320px_1fr]">
            <div role="tablist" aria-label="Spécialisations" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {SPECS.map((s, i) => (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn("relative flex shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors", active === i ? "text-white" : "text-mute hover:text-soft")}
                >
                  {active === i && <motion.span layoutId="spec-bg" className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet/25 to-azure/10 ring-1 ring-lilac/40" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <span className="relative font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative whitespace-nowrap text-[17px] font-medium">{s.short}</span>
                </button>
              ))}
            </div>

            <div className="glass relative min-h-[460px] overflow-hidden rounded-[28px] p-7 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={spec.key}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pointer-events-none absolute -right-4 -top-10 font-serif text-[220px] italic leading-none text-white/[0.04]">{String(active + 1).padStart(2, "0")}</div>
                  <div className="flex flex-wrap items-center gap-4">
                    <h4 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{spec.name}</h4>
                    <div className="flex gap-2.5">{spec.logos?.map((l) => <Brand key={l} name={l} color className="h-6 w-6" />)}</div>
                  </div>
                  <p className="mt-5 max-w-3xl text-lg leading-relaxed text-soft">{spec.def}</p>
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="font-mono text-[11px] uppercase tracking-widest text-mute">Outils réels</div>
                      <p className="mt-2 text-[15px] text-soft">{spec.tools}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                      <div className="font-mono text-[11px] uppercase tracking-widest text-mute">Usage concret en SISR</div>
                      <p className="mt-2 text-[15px] text-soft">{spec.usage}</p>
                    </div>
                    <div className="rounded-2xl border border-mint/25 bg-mint/[0.06] p-5">
                      <div className="flex items-center gap-2 font-semibold text-mint"><CheckCircle2 size={17} /> Ce que ça change pour moi</div>
                      <p className="mt-2 text-[15px] text-soft">{spec.me}</p>
                    </div>
                    <div className="rounded-2xl border border-amber/25 bg-amber/[0.06] p-5">
                      <div className="flex items-center gap-2 font-semibold text-amber"><AlertTriangle size={17} /> Limites</div>
                      <p className="mt-2 text-[15px] text-soft">{spec.limits}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
