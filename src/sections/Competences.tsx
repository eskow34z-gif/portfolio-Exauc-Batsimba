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
        italic="pour de vrai."
        lead="J'ai mis des niveaux honnêtes. Si c'est écrit ici, vous pouvez me poser la question."
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
            <p className="mt-3 max-w-md text-soft">En TP, j'ai utilisé Proxmox : un logiciel qui permet de faire tourner plusieurs ordinateurs « virtuels » sur une seule machine physique.</p>
            <div className="mt-10 space-y-5">
              <LevelBar label="Virtualisation avec Proxmox" value={30} note="vu en TP" tone="amber" />
            </div>
          </BentoItem>

          <BentoItem className="md:col-span-2">
            <Icon><Network size={22} /></Icon>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">Réseaux</h3>
              <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-widest text-amber">en rattrapage</span>
            </div>
            <p className="mt-3 text-soft">C'est mon point faible, je le dis franchement. Je reprends les bases une par une : l'adresse IP, les VLAN, puis DHCP et DNS.</p>
            <div className="mt-6"><LevelBar label="Bases réseau" value={20} note="débutant, en rattrapage" tone="amber" /></div>
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
            <p className="mt-2 text-[15px] text-soft">Une règle simple : ne donner à un outil que les droits dont il a vraiment besoin. Je l'ai vu en vrai, quand un agent IA a été bloqué parce qu'il n'avait pas l'autorisation (voir la partie Innovation).</p>
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
