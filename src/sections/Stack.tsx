import { Brand, type BrandName } from "@/components/fx/Brand"

const ITEMS: { name: BrandName; label: string }[] = [
  { name: "proxmox", label: "Proxmox VE" },
  { name: "linux", label: "Linux" },
  { name: "bash", label: "Bash" },
  { name: "git", label: "Git" },
  { name: "github", label: "GitHub" },
  { name: "vercel", label: "Vercel" },
  { name: "mcp", label: "Model Context Protocol" },
  { name: "claude", label: "Claude" },
  { name: "gemini", label: "Gemini" },
  { name: "openai", label: "ChatGPT" },
]

/** Bandeau défilant des outils (s'arrête au survol). */
export function Stack() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee relative overflow-hidden border-y border-white/[0.06] bg-night py-7 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-14 pr-14">
        {row.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-mute transition-colors hover:text-white">
            <Brand name={it.name} className="h-6 w-6" />
            <span className="whitespace-nowrap text-[15px] font-medium tracking-tight">{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
