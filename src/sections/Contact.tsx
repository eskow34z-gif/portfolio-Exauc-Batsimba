import { ArrowUpRight, Mail } from "lucide-react"
import RibbonGlow from "@/components/originkit/RibbonGlow"
import { BlurText, Magnetic, Reveal } from "@/components/fx"
import { Brand } from "@/components/fx/Brand"
import { scrollToId } from "@/lib/scroll"

// À COMPLÉTER : ton adresse e-mail et l'URL de ton profil LinkedIn
const EMAIL = "ton.email@exemple.fr"
const LINKEDIN = "https://www.linkedin.com/"
const GITHUB = "https://github.com/eskow34z-gif"

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <RibbonGlow background="#05040a" color1="#3b82f6" color2="#8b5cf6" speed={30} size={130} angle={20} reach={280} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-night/40 to-night" />

      <div className="relative mx-auto flex min-h-[90svh] max-w-7xl flex-col items-center justify-center px-5 py-32 text-center md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-mute">07</span>
            <span className="h-px w-10 bg-gradient-to-r from-lilac to-transparent" />
            <span className="eyebrow">Contact</span>
          </div>
        </Reveal>
        <h2 className="mt-8 text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
          <BlurText text="Construisons" stagger={0.04} />
          <br />
          <span className="font-serif font-normal italic tracking-[-0.03em]"><BlurText text="la suite ensemble." delay={0.4} stagger={0.04} gradient /></span>
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-soft">Je cherche une alternance de technicien systèmes &amp; réseaux. Motivé, lucide sur mes points à travailler, et prêt à apprendre vite.</p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-medium text-night transition hover:bg-lilac">
                <Mail size={18} /> M'écrire <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={LINKEDIN} target="_blank" rel="noopener" className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-medium hover:bg-white/10">
                <Brand name="linkedin" className="h-[18px] w-[18px]" /> LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a href={GITHUB} target="_blank" rel="noopener" className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-medium hover:bg-white/10">
                <Brand name="github" className="h-[18px] w-[18px]" /> GitHub
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-mute md:px-10">
          <span>© {new Date().getFullYear()} Exaucé Batsimba Monekene · BTS SIO SISR</span>
          <span className="font-mono text-xs">Effets : OriginKit (WebGL) · 21st.dev · Motion</span>
          <button onClick={() => scrollToId("accueil")} className="hover:text-white">Haut de page ↑</button>
        </div>
      </footer>
    </section>
  )
}
