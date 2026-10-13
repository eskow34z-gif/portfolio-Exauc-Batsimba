// 21st.dev — Cybernetic Bento Grid (dhileepkumargm) : cellule avec halo et
// bordure lumineuse qui suivent la souris. Styles dans index.css (.bento-item).
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BentoItem({ className, children }: { className?: string; children: ReactNode }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    item.addEventListener("mousemove", handleMouseMove);
    return () => item.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={itemRef} className={cn("bento-item", className)}>
      {children}
    </div>
  );
}
