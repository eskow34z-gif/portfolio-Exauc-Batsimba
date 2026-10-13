import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Sparkles } from "lucide-react"
import { Reveal, SectionHeader } from "@/components/fx"
import { Brand, type BrandName } from "@/components/fx/Brand"

const STEPS = [
  { t: "Cibler", d: "Des mots-clés liés à ma problématique : « AI SOC », « AIOps », « MCP », « agent IA », « Proxmox », « ransomware »." },
  { t: "Collecter", d: "Les alertes viennent à moi : abonnements Reddit et YouTube, notifications, algorithme TikTok entraîné sur la tech." },
  { t: "Vérifier", d: "Je remonte à la source d'origine et je recoupe avec au moins 2 sources indépendantes." },
  { t: "Analyser", d: "Une IA résume ou explique, puis je me demande : qu'est-ce que ça change pour un technicien SISR ?" },
  { t: "Capitaliser", d: "Une fiche de veille courte, et la mise à jour de ce portfolio." },
]

const SOURCES: { name: string; logo?: BrandName; where: string; alert: string; role: string; trust: number }[] = [
  { name: "Reddit", logo: "reddit", where: "r/sysadmin, r/networking, r/homelab, r/Proxmox, r/cybersecurity, r/ClaudeAI", alert: "Abonnements, tri « Top de la semaine », flux RSS par subreddit (/r/sysadmin/.rss)", role: "Retours de vrais administrateurs : pannes, avis honnêtes, incidents vécus", trust: 3 },
  { name: "YouTube", logo: "youtube", where: "Chaînes tech, réseau et cybersécurité, conférences, démos d'outils", alert: "Abonnements + cloche sur les chaînes clés", role: "Comprendre en profondeur : tutoriels, démonstrations, explications longues", trust: 3 },
  { name: "TikTok", logo: "tiktok", where: "Comptes tech et IA, actualités courtes", alert: "Algorithme entraîné + collection « veille »", role: "Détecter une tendance tôt. Jamais une source finale : un déclencheur", trust: 1 },
  { name: "IA", where: "Claude, Gemini, ChatGPT", alert: "À la demande, quand une info m'arrive", role: "Expliquer, résumer, comparer ; mode recherche pour retrouver la source d'origine", trust: 2 },
]

const CHECKS = [
  ["Source d'origine", "je remonte à l'annonce officielle (blog de l'éditeur, documentation, CERT-FR pour les failles)."],
  ["Date", "l'info est-elle récente ? En IA, six mois, c'est déjà vieux."],
  ["Recoupement", "au moins deux sources indépendantes disent la même chose."],
  ["Auteur", "un professionnel du domaine, ou quelqu'un qui vend un produit ?"],
  ["IA contre-vérifiée", "même question à deux IA différentes ; si elles divergent, je creuse."],
]

const FICHE = [
  ["Date", "Juillet 2026"],
  ["Déclencheur", "Post Reddit sur une « nouvelle version de MCP »"],
  ["Source vérifiée", "Blog officiel modelcontextprotocol.io — spécification du 28/07/2026"],
  ["Résumé", "Le protocole devient « sans état » : plus de session à maintenir entre l'agent et le serveur."],
  ["Impact SISR", "Serveurs MCP plus simples à héberger, à répartir et à superviser."],
  ["Fiabilité", "Élevée — source primaire"],
]

export function Methode() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] })
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="methode" className="relative mx-auto max-w-7xl px-5 py-32 md:px-10 md:py-44">
      <SectionHeader
        index="05"
        eyebrow="Méthodologie de veille & d'alerte"
        title="Comment je"
        italic="m'informe."
        lead={<>Mes sources sont rapides mais pas toujours fiables : réseaux sociaux et IA. Ma méthode sert donc surtout à <strong className="text-white">trier et vérifier</strong>.</>}
      />

      {/* Cycle en 5 étapes, la ligne se remplit au défilement */}
      <div ref={ref} className="relative mt-20">
        <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/10 lg:block" />
        <motion.div className="absolute left-0 top-[27px] hidden h-px bg-gradient-to-r from-violet via-lilac to-sky shadow-[0_0_12px_rgba(167,139,250,0.9)] lg:block" style={{ width: line }} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1}>
              <div className="relative">
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-lilac/40 bg-night font-serif text-2xl italic text-lilac shadow-[0_0_30px_-6px_rgba(139,92,246,0.8)]">{i + 1}</div>
                <h4 className="mt-6 text-xl font-semibold tracking-tight">{s.t}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-soft">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="mt-28 grid gap-4 md:grid-cols-2">
        {SOURCES.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.08}>
            <div className="bento-item h-full">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                    {s.logo ? <Brand name={s.logo} color className="h-6 w-6" /> : <Sparkles className="text-lilac" size={22} />}
                  </div>
                  <h4 className="text-2xl font-semibold tracking-tight">{s.name}</h4>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-mute">Fiabilité</div>
                  <div className="mt-1.5 flex justify-end gap-1">{[0, 1, 2, 3, 4].map((d) => <span key={d} className={`h-1.5 w-5 rounded-full ${d < s.trust ? "bg-gradient-to-r from-violet to-sky" : "bg-white/10"}`} />)}</div>
                </div>
              </div>
              <dl className="mt-6 space-y-4 text-[15px]">
                <div><dt className="font-mono text-[11px] uppercase tracking-widest text-mute">Ce que j'y suis</dt><dd className="mt-1 text-soft">{s.where}</dd></div>
                <div><dt className="font-mono text-[11px] uppercase tracking-widest text-mute">Comment l'alerte arrive</dt><dd className="mt-1 text-soft">{s.alert}</dd></div>
                <div><dt className="font-mono text-[11px] uppercase tracking-widest text-mute">Rôle dans ma veille</dt><dd className="mt-1 text-white">{s.role}</dd></div>
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-[28px] p-7 md:p-10">
            <h3 className="text-3xl font-semibold tracking-tight">Ma grille <span className="font-serif font-normal italic text-gradient">de vérification</span></h3>
            <p className="mt-3 text-soft">Une info vue sur TikTok ou Reddit ne devient « vraie » qu'après ces 5 contrôles :</p>
            <ol className="mt-6 space-y-4">
              {CHECKS.map(([k, v], i) => (
                <li key={k} className="flex gap-4">
                  <span className="font-mono text-sm text-lilac">0{i + 1}</span>
                  <p className="text-[15.5px] leading-relaxed text-soft"><strong className="text-white">{k}</strong> — {v}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0c0a16] p-7 md:p-10">
            <div className="absolute right-6 top-6 rotate-6 rounded-md border border-mint/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-mint">vérifié</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-mute">Exemple</div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">Fiche de veille</h3>
            <div className="mt-6 divide-y divide-dashed divide-white/10">
              {FICHE.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-mute">{k}</span>
                  <span className="text-[15px] text-soft">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
