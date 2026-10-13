import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useInView } from "motion/react"
import { Bot, LifeBuoy, ShieldAlert, Activity, User, KeyRound, Skull } from "lucide-react"
import FibreArc from "@/components/originkit/FibreArc"
import { AnimatedBeam } from "@/components/ui/AnimatedBeam"
import { BlurText, Reveal } from "@/components/fx"
import { Brand } from "@/components/fx/Brand"
import { cn } from "@/lib/utils"

const Node = forwardRef<HTMLDivElement, { className?: string; children: ReactNode; label: string; sub?: string }>(({ className, children, label, sub }, ref) => (
  <div className="z-10 flex flex-col items-center gap-2 text-center">
    <div ref={ref} className={cn("grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-[#0d0b18] shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)]", className)}>
      {children}
    </div>
    <div className="text-[13px] font-medium leading-tight">{label}</div>
    {sub && <div className="-mt-1 font-mono text-[10.5px] text-mute">{sub}</div>}
  </div>
))
Node.displayName = "Node"

/** Schéma MCP avec faisceaux animés (21st.dev — Animated Beam). */
function McpDiagram() {
  const container = useRef<HTMLDivElement>(null)
  const user = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const s1 = useRef<HTMLDivElement>(null)
  const s2 = useRef<HTMLDivElement>(null)
  const s3 = useRef<HTMLDivElement>(null)
  const s4 = useRef<HTMLDivElement>(null)
  const beam = { gradientStartColor: "#a78bfa", gradientStopColor: "#60a5fa", pathColor: "#ffffff", pathOpacity: 0.12, pathWidth: 2 }

  return (
    <div ref={container} className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-14 py-6 md:h-[420px] md:flex-row md:gap-0 md:px-10 md:py-0">
      <Node ref={user} label="Utilisateur" sub="demande + valide"><User className="text-soft" /></Node>
      <Node ref={hub} label="Agent IA + client MCP" sub="Claude Code, VS Code…" className="h-24 w-24 rounded-3xl border-lilac/50 bg-gradient-to-br from-violet/40 to-azure/30">
        <Brand name="claude" color className="h-10 w-10" />
      </Node>
      <div className="grid grid-cols-2 gap-6 md:flex md:flex-col">
        <Node ref={s1} label="Serveur MCP GitHub"><Brand name="github" color className="h-6 w-6" /></Node>
        <Node ref={s2} label="Serveur MCP Vercel"><Brand name="vercel" color className="h-6 w-6" /></Node>
        <Node ref={s3} label="Supervision"><Activity className="text-sky" /></Node>
        <Node ref={s4} label="Tickets"><LifeBuoy className="text-lilac" /></Node>
      </div>
      <AnimatedBeam containerRef={container} fromRef={user} toRef={hub} {...beam} duration={3} />
      <AnimatedBeam containerRef={container} fromRef={s1} toRef={hub} curvature={-40} reverse {...beam} duration={4} />
      <AnimatedBeam containerRef={container} fromRef={s2} toRef={hub} curvature={-10} reverse {...beam} duration={3.5} delay={0.4} />
      <AnimatedBeam containerRef={container} fromRef={s3} toRef={hub} curvature={10} reverse {...beam} duration={4.5} delay={0.8} />
      <AnimatedBeam containerRef={container} fromRef={s4} toRef={hub} curvature={40} reverse {...beam} duration={3.8} delay={1.2} />
    </div>
  )
}

const LOG = [
  { k: "ok", t: "list_projects → 27 projets trouvés (portfolio-exauce., flux-master…)" },
  { k: "ok", t: "list_deployment_files → index.html, vercel.json, images/" },
  { k: "err", t: "get_deployment_file_contents → contenu tronqué (limite de taille de l'outil)" },
  { k: "err", t: "list_deployments (équipe) → 403 Forbidden : jeton non autorisé sur cette équipe" },
  { k: "dim", t: "→ arrêt et explication à l'utilisateur, aucune action forcée" },
]

/** Journal qui s'écrit ligne par ligne quand il arrive à l'écran. */
function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setN((v) => (v >= LOG.length ? v : v + 1)), 650)
    return () => clearInterval(id)
  }, [inView])
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-[#07060d]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-mute">claude-code — mcp:vercel</span>
      </div>
      <div className="min-h-[190px] overflow-x-auto p-5 font-mono text-[13px] leading-7">
        {LOG.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="whitespace-nowrap">
            <span className="text-mute">[agent]</span>{" "}
            <span className={l.k === "ok" ? "text-mint" : l.k === "err" ? "text-rose" : "text-soft"}>{l.t}</span>
          </motion.div>
        ))}
        {n < LOG.length && <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-lilac" />}
      </div>
    </div>
  )
}

const TIMELINE = [
  { d: "Nov. 2024", t: "Anthropic publie le MCP en open source." },
  { d: "2025", t: "Adoption par OpenAI, Google et Microsoft : un standard commun à tout le secteur." },
  { d: "Mai 2025", t: "Première faille médiatisée : injection de prompt via le serveur MCP GitHub, fuite de code privé." },
  { d: "9 déc. 2025", t: "Le MCP est confié à l'Agentic AI Foundation (Linux Foundation)." },
  { d: "28 juil. 2026", t: "Spécification « sans état » : plus simple à héberger et à faire monter en charge." },
]

const RISKS = [
  { icon: ShieldAlert, t: "Injection de prompt", d: "Un texte piégé (ticket, page web, issue GitHub) donne des ordres cachés à l'agent.", fix: "Tout contenu externe est non fiable ; validation humaine avant chaque action sensible." },
  { icon: Skull, t: "Empoisonnement d'outil", d: "Un serveur MCP malveillant cache des instructions dans la description de ses outils.", fix: "Uniquement des serveurs officiels ou audités, comme pour un logiciel." },
  { icon: KeyRound, t: "Permissions excessives", d: "Un agent avec des droits administrateur peut tout casser en une erreur.", fix: "Moindre privilège, jetons limités, journalisation de toutes les actions." },
]

const SOURCES = [
  ["modelcontextprotocol.io — documentation officielle", "https://modelcontextprotocol.io"],
  ["MCP joins the Agentic AI Foundation — blog officiel, 9 déc. 2025", "https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/"],
  ["Linux Foundation — création de l'Agentic AI Foundation", "https://www.prnewswire.com/news-releases/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation-aaif-anchored-by-new-project-contributions-including-model-context-protocol-mcp-goose-and-agentsmd-302636897.html"],
  ["The 2026-07-28 Specification — blog officiel MCP", "https://blog.modelcontextprotocol.io/posts/2026-07-28/"],
  ["MCP Tool Poisoning — Cloud Security Alliance", "https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-tool-poisoning-ai-agent-exfiltration-2/"],
  ["CERT-FR (ANSSI) — alertes de sécurité", "https://www.cert.ssi.gouv.fr/"],
]

export function Innovation() {
  return (
    <section id="innovation" className="relative overflow-hidden">
      {/* Fibre optique WebGL (OriginKit) */}
      <div className="relative min-h-[100svh]">
        <div className="absolute inset-0">
          <FibreArc background="#05040a" baseColor="#4c1d95" accentColor="#a78bfa" highlight="#e0f2fe" speed={60} direction={0} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 py-32 md:px-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-mute">06</span>
              <span className="h-px w-10 bg-gradient-to-r from-lilac to-transparent" />
              <span className="eyebrow">Innovation choisie</span>
            </div>
          </Reveal>
          <h2 className="mt-8 max-w-5xl text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
            <BlurText text="Les agents IA &" stagger={0.03} />
            <br />
            <span className="font-serif font-normal italic tracking-[-0.03em]"><BlurText text="le Model Context Protocol." delay={0.45} stagger={0.03} gradient /></span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-soft md:text-2xl">
              Jusqu'ici, une IA <em>parlait</em>. Avec les agents et le MCP, elle <strong className="text-white">agit</strong> sur de vrais outils. Un changement direct pour les métiers de l'infrastructure.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-32 md:px-10 md:pb-44">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-[28px] p-7 md:p-10">
              <Brand name="mcp" color className="h-9 w-9" />
              <p className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em]">Un <span className="font-serif font-normal italic text-gradient">standard ouvert</span> qui permet à n'importe quelle IA de se brancher sur n'importe quel outil.</p>
              <p className="mt-5 text-[17px] leading-relaxed text-soft">On le compare à un <strong className="text-white">port USB-C pour l'IA</strong> : avant, chaque IA avait besoin d'un connecteur spécifique pour chaque outil. Avec le MCP, un outil développe <em>une seule fois</em> son « serveur MCP », et toutes les IA compatibles peuvent l'utiliser.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid h-full gap-4">
              <div className="rounded-[28px] border border-rose/25 bg-rose/[0.05] p-7">
                <div className="font-mono text-xs uppercase tracking-widest text-rose">Sans MCP</div>
                <p className="mt-3 text-[17px] leading-relaxed text-soft">Je copie un message d'erreur dans ChatGPT, il répond, je recopie sa réponse dans le terminal. L'IA ne voit rien et ne fait rien elle-même.</p>
              </div>
              <div className="rounded-[28px] border border-mint/25 bg-mint/[0.05] p-7">
                <div className="font-mono text-xs uppercase tracking-widest text-mint">Avec MCP</div>
                <p className="mt-3 text-[17px] leading-relaxed text-soft">L'agent lit lui-même les journaux du déploiement, trouve l'erreur, propose la correction et me demande validation avant de l'appliquer.</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Schéma animé */}
        <Reveal className="mt-6">
          <div className="glass overflow-hidden rounded-[28px] p-6 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-3xl font-semibold tracking-tight">Comment ça <span className="font-serif font-normal italic text-gradient">fonctionne</span></h3>
              <span className="font-mono text-xs text-mute">JSON-RPC 2.0 · stdio (local) ou HTTP + OAuth (distant)</span>
            </div>
            <div className="mt-4"><McpDiagram /></div>
            <div className="grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
              {[
                ["Outils (tools)", "Des actions que l'IA peut lancer : « lister les déploiements », « créer une issue »."],
                ["Ressources (resources)", "Des données que l'IA peut lire : un fichier, un journal, une documentation."],
                ["Prompts", "Des modèles de tâches prêts à l'emploi proposés par le serveur."],
              ].map(([k, v]) => (
                <div key={k}><div className="font-semibold">{k}</div><p className="mt-1 text-[15px] text-soft">{v}</p></div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Chronologie */}
        <div className="mt-28">
          <Reveal><h3 className="text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]">Pourquoi c'est <span className="font-serif font-normal italic text-gradient">la dernière innovation majeure.</span></h3></Reveal>
          <div className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-4">
            <motion.div className="absolute left-0 right-0 top-[9px] hidden h-px origin-left bg-gradient-to-r from-violet via-lilac to-sky md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} />
            {TIMELINE.map((e, i) => (
              <Reveal key={e.d} delay={0.2 + i * 0.15}>
                <div className="relative pl-8 md:pl-0 md:pt-10">
                  <span className="absolute left-0 top-0.5 h-[18px] w-[18px] rounded-full border-[3px] border-lilac bg-night shadow-[0_0_18px_rgba(167,139,250,0.9)]" />
                  <div className="font-mono text-sm text-lilac">{e.d}</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-soft">{e.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Cas réel */}
        <Reveal className="mt-28">
          <div className="rounded-[28px] border border-mint/25 bg-[linear-gradient(135deg,rgba(52,211,153,0.08),rgba(5,4,10,0.6)_55%)] p-7 md:p-12">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-mint">Cas réel vécu</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mute">Préparation de ce portfolio</span>
            </div>
            <h3 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">J'ai utilisé un agent IA + MCP pour <span className="font-serif font-normal italic text-mint">récupérer mon ancien portfolio.</span></h3>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-soft">J'ai demandé à un agent IA (Claude Code) de se connecter à mon compte Vercel via son serveur MCP. Voici ce qu'il s'est passé :</p>
            <div className="mt-8"><Terminal /></div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-mint/25 bg-mint/[0.05] p-6">
                <div className="font-semibold text-mint">Ce que ça montre de positif</div>
                <p className="mt-2 text-[15.5px] leading-relaxed text-soft">En quelques secondes, ce qui m'aurait pris plusieurs minutes. Et surtout, les <strong className="text-white">permissions ont fonctionné</strong> : l'erreur 403 prouve que l'IA ne peut pas sortir des droits que je lui ai donnés.</p>
              </div>
              <div className="rounded-2xl border border-amber/25 bg-amber/[0.05] p-6">
                <div className="font-semibold text-amber">Ce que ça montre comme limites</div>
                <p className="mt-2 text-[15.5px] leading-relaxed text-soft">Les outils ont des limites techniques (fichier tronqué), et la gestion des droits (OAuth, périmètre d'équipe) doit être bien comprise par l'administrateur. Exactement une compétence SISR.</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Usages + risques */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-[28px] p-7 md:p-10">
              <Bot className="text-lilac" size={30} />
              <h3 className="mt-5 text-3xl font-semibold tracking-tight">Ce que ça change <span className="font-serif font-normal italic text-gradient">pour un technicien SISR</span></h3>
              <ul className="mt-6 space-y-4 text-[16px] leading-relaxed text-soft">
                <li><strong className="text-white">Diagnostic</strong> — l'agent lit les journaux d'un serveur et propose la cause probable.</li>
                <li><strong className="text-white">Support</strong> — il crée et documente les tickets, résume l'historique d'un incident.</li>
                <li><strong className="text-white">Supervision</strong> — il explique une alerte en langage clair.</li>
                <li><strong className="text-white">Documentation</strong> — il tient à jour les procédures à partir de ce qui a été fait.</li>
                <li><strong className="text-white">Nouveau rôle</strong> — l'administrateur <em>déploie, sécurise et surveille</em> les serveurs MCP de l'entreprise.</li>
              </ul>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {RISKS.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.1}>
                <div className="bento-item border-l-2 !border-l-rose/70">
                  <div className="flex items-center gap-3"><r.icon size={20} className="text-rose" /><h4 className="text-lg font-semibold">{r.t}</h4></div>
                  <p className="mt-2 text-[15px] text-soft">{r.d}</p>
                  <p className="mt-3 border-t border-dashed border-white/10 pt-3 text-[15px] text-soft"><strong className="text-mint">Parade :</strong> {r.fix}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Avis */}
        <Reveal className="mt-28">
          <blockquote className="mx-auto max-w-5xl text-center text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.2] tracking-[-0.03em]">
            « Les agents IA ne vont pas remplacer les techniciens. Ils vont changer leur travail : moins de tâches répétitives, plus de contrôle et de sécurité. <span className="font-serif italic text-gradient">Il faut maîtriser les bases encore mieux qu'avant.</span> »
          </blockquote>
          <p className="mx-auto mt-6 max-w-2xl text-center text-soft">On ne peut pas valider ce que propose une IA sur un VLAN si on ne sait pas soi-même ce qu'est un VLAN. C'est pour ça que j'ai décidé de rattraper sérieusement mon retard en réseau.</p>
        </Reveal>

        <Reveal className="mt-20">
          <div className="border-t border-white/10 pt-8">
            <div className="font-mono text-xs uppercase tracking-widest text-mute">Sources principales</div>
            <ol className="mt-4 grid gap-2 text-[14.5px] md:grid-cols-2">
              {SOURCES.map(([label, url], i) => (
                <li key={url} className="flex gap-3"><span className="font-mono text-mute">{String(i + 1).padStart(2, "0")}</span><a href={url} target="_blank" rel="noopener" className="text-soft underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-lilac">{label}</a></li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
