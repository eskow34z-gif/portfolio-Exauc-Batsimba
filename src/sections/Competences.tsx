import { Cloud, Network, Server, ShieldCheck, Sparkles, Users } from "lucide-react"
import { BentoItem } from "@/components/ui/BentoItem"
import { LevelBar, Reveal, SectionHeader } from "@/components/fx"
import { Brand } from "@/components/fx/Brand"

function Icon({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/25 to-azure/20 text-lilac ring-1 ring-white/10">{children}</div>
}

export function Competences() {
  return (
    <section id="competences" className="relative mx-auto max-w-7xl px-5 py-32 md:px-10 md:py-44">
      <SectionHeader
        index="02"
        eyebrow="Compétences"
        title="Ce que je sais faire,"
        italic="sans exagérer."
        lead="Des niveaux volontairement honnêtes : un jury ou un recruteur doit pouvoir me questionner sur tout ce qui est affiché ici."
      />

      {/* Grille bento (21st.dev — Cybernetic Bento Grid) */}
      <Reveal className="mt-16">
        <div className="grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-4">
          <BentoItem className="md:col-span-2 md:row-span-2">
            <Icon><Server size={22} /></Icon>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">Systèmes &amp; virtualisation</h3>
              <Brand name="proxmox" color className="h-6 w-6" />
            </div>
            <p className="mt-3 max-w-md text-soft">Hyperviseur Proxmox VE : machines virtuelles et conteneurs, snapshots, un labo pour tester sans risque.</p>
            <div className="mt-10 space-y-5">
              <LevelBar label="Proxmox VE (VM, LXC, snapshots)" value={70} note="bon" />
              <LevelBar label="Linux (ligne de commande, services)" value={55} note="intermédiaire" />
              <LevelBar label="Windows (poste, support)" value={60} note="intermédiaire" />
            </div>
          </BentoItem>

          <BentoItem className="md:col-span-2">
            <Icon><Network size={22} /></Icon>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">Réseaux</h3>
              <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-widest text-amber">en rattrapage</span>
            </div>
            <p className="mt-3 text-soft">Ma priorité de l'année : OSI / TCP-IP, adressage IPv4 et sous-réseaux, VLAN, DHCP / DNS, routage.</p>
            <div className="mt-6"><LevelBar label="Bases réseau (OSI, IPv4, CIDR)" value={45} note="en progression" tone="amber" /></div>
          </BentoItem>

          <BentoItem>
            <Icon><Cloud size={22} /></Icon>
            <h3 className="text-xl font-semibold tracking-tight">Cloud &amp; déploiement</h3>
            <p className="mt-2 text-[15px] text-soft">GitHub (branches, pull requests), Vercel (préproduction et production).</p>
            <div className="mt-5 flex gap-3 text-mute"><Brand name="github" className="h-5 w-5" /><Brand name="vercel" className="h-5 w-5" /><Brand name="git" className="h-5 w-5" /></div>
          </BentoItem>

          <BentoItem>
            <Icon><Sparkles size={22} /></Icon>
            <h3 className="text-xl font-semibold tracking-tight">IA &amp; automatisation</h3>
            <p className="mt-2 text-[15px] text-soft">Claude, Gemini, ChatGPT ; agents IA reliés à des outils via MCP.</p>
            <div className="mt-5 flex gap-3"><Brand name="claude" color className="h-5 w-5" /><Brand name="gemini" color className="h-5 w-5" /><Brand name="openai" color className="h-5 w-5" /><Brand name="mcp" color className="h-5 w-5" /></div>
          </BentoItem>

          <BentoItem className="md:col-span-2">
            <Icon><ShieldCheck size={22} /></Icon>
            <h3 className="text-xl font-semibold tracking-tight">Cybersécurité (bases)</h3>
            <p className="mt-2 text-[15px] text-soft">Moindre privilège, gestion des accès (OAuth, jetons), sauvegardes, risques liés à l'IA (injection de prompt). Vécu concrètement : voir le cas réel dans la partie Innovation.</p>
          </BentoItem>

          <BentoItem className="md:col-span-2">
            <Icon><Users size={22} /></Icon>
            <h3 className="text-xl font-semibold tracking-tight">Savoir-être</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Autonomie", "Remise en question", "Curiosité", "Écoute des utilisateurs", "Persévérance"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-soft">{t}</span>
              ))}
            </div>
          </BentoItem>
        </div>
      </Reveal>
    </section>
  )
}
