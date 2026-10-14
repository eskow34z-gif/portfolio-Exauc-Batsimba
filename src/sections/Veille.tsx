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
    key: "gen", name: "IA générative & LLM", short: "Générative",
    def: "Un LLM (Large Language Model) est entraîné sur d'énormes quantités de texte et de code. Il prédit, mot après mot, la suite la plus probable : c'est ce qui lui permet d'écrire, résumer, traduire ou produire un script.",
    tools: "ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), Microsoft Copilot.", logos: ["openai", "claude", "gemini"],
    usage: "Écrire ou expliquer un script PowerShell / Bash, comprendre un message d'erreur, rédiger une procédure.",
    me: "Je m'en sers comme d'un prof particulier. Quand une notion réseau ne rentre pas, je demande une explication, puis je vérifie dans le cours ou la doc officielle.",
    limits: "Hallucinations (réponses fausses mais sûres d'elles), connaissances datées, fuite de données si on colle des mots de passe ou des configurations clients. Jamais de script lancé sans relecture.",
  },
  {
    key: "cyber", name: "IA de cybersécurité", short: "Cybersécurité",
    def: "Surtout du machine learning : le modèle apprend le comportement « normal » d'un poste, d'un utilisateur ou d'un réseau, puis signale ce qui s'en écarte (connexion à 3 h du matin, processus qui chiffre des fichiers, flux inhabituel).",
    tools: "EDR / XDR : Microsoft Defender for Endpoint, CrowdStrike Falcon, SentinelOne ; détection réseau : Darktrace.",
    usage: "Repérer un ransomware avant qu'il chiffre le serveur de fichiers, isoler un poste compromis, trier des milliers d'alertes dans un SOC.",
    me: "On ne lit plus les journaux ligne par ligne, on valide ou on rejette des alertes déjà triées. Encore faut-il comprendre pourquoi l'outil a sonné.",
    limits: "Faux positifs et faux négatifs. Et les attaquants utilisent aussi l'IA : hameçonnage crédible, deepfakes vocaux pour usurper un dirigeant.",
  },
  {
    key: "aiops", name: "AIOps : supervision intelligente", short: "AIOps",
    def: "L'IA appliquée à l'exploitation informatique. Les modèles analysent métriques (CPU, RAM, disque, latence) et journaux pour détecter les anomalies, regrouper les alertes liées et prédire une panne.",
    tools: "Dynatrace (moteur Davis AI), Datadog (Watchdog), Splunk ITSI.", logos: ["dynatrace", "datadog"],
    usage: "Être prévenu qu'un disque sera plein dans 3 jours, trouver la cause racine quand 50 alertes arrivent en même temps.",
    me: "Avec Nagios ou Zabbix, on fixe des seuils à la main. Là, l'outil prévient avant la panne. Mais si je ne sais pas lire une courbe de CPU moi-même, je ne saurai pas s'il a raison.",
    limits: "Coûteux, demande beaucoup de données historiques propres, crée une dépendance à un éditeur.",
  },
  {
    key: "net", name: "IA réseau", short: "Réseau",
    def: "Des modèles spécialisés dans les données réseau (qualité Wi-Fi, trafic, configurations) qui diagnostiquent les problèmes de connexion et proposent ou appliquent des corrections.",
    tools: "Juniper Mist AI (assistant Marvis), Cisco AI Assistant, HPE Aruba Networking Central.", logos: ["cisco"],
    usage: "Répondre à « pourquoi le Wi-Fi de la salle B est lent ? », détecter un mauvais VLAN, vérifier une configuration avant de la pousser.",
    me: "En lisant sur ces outils, j'ai vu que le réseau restait indispensable. Pour valider une correction proposée par l'IA, il faut soi-même maîtriser l'adressage, les VLAN et le routage.",
    limits: "Surtout sur du matériel récent et coûteux. Une mauvaise correction automatique peut couper le réseau de toute une entreprise.",
  },
  {
    key: "agents", name: "Agents IA", short: "Agents",
    def: "Un agent est un LLM qui ne se contente pas de répondre : il planifie des étapes et agit via des outils (lire un fichier, lancer une commande, interroger une API), observe le résultat et recommence jusqu'à l'objectif.",
    tools: "Claude Code, GitHub Copilot (mode agent), Gemini CLI, Cursor, n8n ; standard de connexion : MCP.", logos: ["claude", "github", "mcp"],
    usage: "Diagnostiquer un déploiement en lisant ses journaux, ouvrir un ticket, préparer une modification et la soumettre à validation.",
    me: "Je m'en sers déjà sur Flux Master et je m'en suis servi pour ce portfolio. C'est l'innovation que j'ai choisie, je la détaille plus bas.",
    limits: "Un agent qui se trompe ne fait pas qu'écrire une bêtise, il l'exécute. Il lui faut donc le moins de droits possible et quelqu'un qui valide.",
  },
]

const RINGS = [
  { label: "Intelligence artificielle", text: "Le domaine entier : faire réaliser à une machine des tâches qui demandent de l'intelligence." },
  { label: "Machine learning", text: "La machine apprend des règles à partir d'exemples au lieu qu'on les programme." },
  { label: "Deep learning", text: "Des réseaux de neurones à nombreuses couches : images, son, texte." },
  { label: "IA générative / LLM", text: "Entraînée à produire du contenu : ChatGPT, Claude, Gemini." },
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
            Ma veille ne porte pas sur l'IA en général, mais sur les <strong className="text-white">IA spécialisées</strong> qui changent concrètement le travail d'un technicien systèmes &amp; réseaux.
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
                Quelles <span className="font-serif italic text-gradient">IA spécialisées</span> transforment le métier d'administrateur systèmes &amp; réseaux, et comment les utiliser <span className="font-serif italic text-gradient">sans créer de nouveaux risques</span> ?
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
              <p>Une IA n'est pas « intelligente en général » : c'est un <strong className="text-white">modèle entraîné sur un type de données précis pour une tâche précise</strong>. Un modèle qui détecte une attaque dans des journaux n'a rien à voir avec ChatGPT : ni les mêmes données, ni la même technique, ni les mêmes capacités.</p>
              <p>Toutes les IA actuelles sont des <strong className="text-white">IA « faibles » (spécialisées)</strong>. L'IA « générale », capable de tout faire comme un humain, n'existe pas. Pour un technicien SISR, j'en vois <strong className="text-white">cinq</strong> qui comptent vraiment. Les voici.</p>
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
            <h3 className="text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]">Les 5 spécialisations <span className="font-serif font-normal italic text-gradient">qui comptent pour un SISR.</span></h3>
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
