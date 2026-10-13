import { useEffect, useRef, type RefObject } from "react"

// Indique (via une ref, sans re-rendu) si l'élément est proche de l'écran.
// Les composants WebGL s'en servent pour arrêter de dessiner hors écran.
export function useOnScreenRef(target: RefObject<Element | null>, margin = "200px") {
    const visible = useRef(true)
    useEffect(() => {
        const el = target.current
        if (!el || typeof IntersectionObserver === "undefined") return
        const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting }, { rootMargin: margin })
        io.observe(el)
        return () => io.disconnect()
    }, [target, margin])
    return visible
}
