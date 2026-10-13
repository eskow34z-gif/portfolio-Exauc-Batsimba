// OriginKit — Shine Card (shine-card)
// Adaptations : contenu (children) affiché par-dessus le champ de points,
// carte qui prend la largeur de son conteneur, couleurs du portfolio.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";

function clamp(n: unknown, min: number, max: number, fallback: number) {
  const v = typeof n === "number" ? n : parseFloat(String(n));
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

function parseColor01(input: unknown, fallback: [number, number, number]) {
  if (!input) return fallback;
  const s = String(input).trim();
  const hex = s.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hex) {
    const h = hex[1];
    const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [parseInt(f.slice(0, 2), 16) / 255, parseInt(f.slice(2, 4), 16) / 255, parseInt(f.slice(4, 6), 16) / 255] as [number, number, number];
  }
  return fallback;
}

function insetRadius(radius: string, by: number): string {
  return radius.split(/\s+/).map((corner) => `max(0px, calc(${corner} - ${by}px))`).join(" ");
}

const RENDER_SCALE = 2;
const DPR_LIMIT = 2;
const SHADOW_CSS = "0px 55px 47px -15px rgba(0, 0, 0, 0.35)";

export interface ShineCardProps {
  style?: CSSProperties;
  height?: number;
  cardColor?: string;
  borderColor?: string;
  radius?: string;
  density?: number;
  waveSpeed?: number;
  sparkle?: number;
  unlit?: string;
  highlight?: string;
  glow?: string;
  tiltAmount?: number;
  hoverScale?: number;
  children?: ReactNode;
}

export default function ShineCard(props: ShineCardProps) {
  const {
    style,
    height = 420,
    cardColor = "#0d0b1a",
    borderColor = "rgba(167,139,250,0.35)",
    radius = "28px",
    unlit = "#000000",
    highlight = "#a78bfa",
    glow = "#8b5cf6",
    children,
  } = props;
  const S = {
    waveSpeed: (clamp(props.waveSpeed, 0, 100, 44) / 100) * 1.5,
    sparkle: (clamp(props.sparkle, 0, 100, 100) / 100) * 8,
    density: clamp(props.density, 6, 80, 46),
    unlit,
    highlight,
    tiltAmount: clamp(props.tiltAmount, 0, 30, 8),
    hoverScale: clamp(props.hoverScale, 100, 120, 102) / 100,
  };

  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowTopRef = useRef<HTMLDivElement | null>(null);
  const glowBottomRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef({ tx: 0, ty: 0, x: 0, y: 0, scale: 1, target: 1 });
  const liveRef = useRef(S);
  liveRef.current = S;

  useEffect(() => {
    const card = cardRef.current;
    const root = rootRef.current;
    if (!card || !root) return;
    let raf = 0;
    let settled = false;
    function frame() {
      const t = tiltRef.current;
      t.x += (t.tx - t.x) * 0.12;
      t.y += (t.ty - t.y) * 0.12;
      t.scale += (t.target - t.scale) * 0.12;
      card!.style.transform = `rotateX(${t.x}deg) rotateY(${t.y}deg) scale(${t.scale})`;
      const top = Math.min(1, Math.max(0, -t.x / 8));
      const bottom = Math.min(1, Math.max(0, t.x / 8));
      if (glowTopRef.current) glowTopRef.current.style.opacity = `${top * 0.6}`;
      if (glowBottomRef.current) glowBottomRef.current.style.opacity = `${bottom * 0.6}`;
      const still = Math.abs(t.tx - t.x) < 0.01 && Math.abs(t.ty - t.y) < 0.01 && Math.abs(t.target - t.scale) < 0.001;
      if (still && settled) {
        raf = 0;
        return;
      }
      settled = still;
      raf = requestAnimationFrame(frame);
    }
    function wake() {
      settled = false;
      if (!raf) raf = requestAnimationFrame(frame);
    }
    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const L = liveRef.current;
      const rect = root!.getBoundingClientRect();
      const nx = Math.min(1, Math.max(-1, (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
      const ny = Math.min(1, Math.max(-1, (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
      const t = tiltRef.current;
      t.tx = -ny * L.tiltAmount * 0.67;
      t.ty = nx * L.tiltAmount;
      t.target = L.hoverScale;
      wake();
    }
    function onLeave() {
      const t = tiltRef.current;
      t.tx = 0;
      t.ty = 0;
      t.target = 1;
      wake();
    }
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    wake();
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const glowLayer = (ref: RefObject<HTMLDivElement | null>, from: "top" | "bottom") => (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: radius,
        background: `linear-gradient(to ${from === "top" ? "bottom" : "top"}, ${glow} 0%, rgba(255,255,255,0) 70%)`,
        opacity: 0,
        mixBlendMode: "overlay",
      }}
    />
  );

  return (
    <div ref={rootRef} style={{ ...style, position: "relative", width: "100%", perspective: 1400 }}>
      <div ref={cardRef} style={{ position: "relative", width: "100%", height, transformStyle: "preserve-3d", willChange: "transform" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: cardColor,
            borderRadius: radius,
            boxShadow: SHADOW_CSS,
            overflow: "hidden",
            border: `1px solid ${borderColor}`,
          }}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 4, border: "1.5px solid #fff", borderRadius: insetRadius(radius, 4), filter: "blur(1px)", opacity: 0.5, WebkitMaskImage: "radial-gradient(34% 2% at 20% 0%, #000 0%, transparent 100%)", maskImage: "radial-gradient(34% 2% at 20% 0%, #000 0%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 1, borderRadius: insetRadius(radius, 1), boxShadow: "inset 0px 0px 7px 0.75px #fff", opacity: 0.12, WebkitMaskImage: "linear-gradient(0deg, transparent 0%, #000 100%)", maskImage: "linear-gradient(0deg, transparent 0%, #000 100%)" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, WebkitMaskImage: "linear-gradient(200deg, transparent 15%, #000 85%)", maskImage: "linear-gradient(200deg, transparent 15%, #000 85%)" }}>
            <WaveyDots settings={S} />
          </div>
          <div style={{ position: "relative", height: "100%", zIndex: 1 }}>{children}</div>
        </div>
        {glowLayer(glowTopRef, "top")}
        {glowLayer(glowBottomRef, "bottom")}
      </div>
    </div>
  );
}

type Settings = { waveSpeed: number; sparkle: number; density: number; unlit: string; highlight: string };

function WaveyDots({ settings: S }: { settings: Settings }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveRef = useRef(S);
  liveRef.current = S;
  const [, force] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, preserveDrawingBuffer: false });
    if (!gl) return;
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(program, n);
    const uni = { time: u("u_time"), res: u("u_res"), waveSpeed: u("u_waveSpeed"), sparkle: u("u_sparkle"), mouse: u("u_mouse"), density: u("u_density"), theme: u("u_theme"), dark: u("u_dark") };

    const mouse = { x: -1, y: -1 };
    let needsResize = true;
    function resizeIfNeeded() {
      if (!needsResize) return;
      needsResize = false;
      const dpr = Math.min((window.devicePixelRatio || 1) * RENDER_SCALE, DPR_LIMIT);
      const w = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
        gl!.uniform2f(uni.res, w, h);
      }
    }

    let inView = true;
    const reduced = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.05 });
    io.observe(container);
    const ro = new ResizeObserver(() => (needsResize = true));
    ro.observe(container);

    const card = container.parentElement?.parentElement ?? container;
    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    }
    const onOut = () => {
      mouse.x = -1;
      mouse.y = -1;
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onOut);

    function draw(nowMs: number) {
      const L = liveRef.current;
      resizeIfNeeded();
      gl!.uniform1f(uni.time, reduced ? 0 : nowMs * 0.001);
      gl!.uniform1f(uni.waveSpeed, L.waveSpeed);
      gl!.uniform1f(uni.sparkle, L.sparkle);
      gl!.uniform1f(uni.density, L.density);
      const theme = parseColor01(L.highlight, [1, 1, 1]);
      gl!.uniform3f(uni.theme, theme[0], theme[1], theme[2]);
      const dark = parseColor01(L.unlit, [0.08, 0.08, 0.08]);
      gl!.uniform3f(uni.dark, dark[0], dark[1], dark[2]);
      if (mouse.x >= 0) gl!.uniform2f(uni.mouse, mouse.x * canvas!.width, mouse.y * canvas!.height);
      else gl!.uniform2f(uni.mouse, -1, -1);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let raf = 0;
    function tick(now: number) {
      if (inView && !document.hidden) draw(now);
      raf = requestAnimationFrame(tick);
    }
    draw(0);
    raf = requestAnimationFrame(tick);
    force(1);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onOut);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} aria-hidden="true" />
    </div>
  );
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;
uniform float u_sparkle;
uniform vec2 u_mouse;
uniform float u_density;
uniform vec3 u_theme;
uniform vec3 u_dark;

#define PI 3.14159265359
#define TAU 6.28318530718
#define SQRT3 1.7320508

float hash21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p + 23.45);
    return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
    float n = hash21(p);
    return vec2(n, hash21(p + n * 47.0));
}

vec4 hexTile(vec2 p, float scale) {
    p *= scale;
    vec2 s = vec2(1.0, SQRT3);
    vec2 halfS = s * 0.5;
    vec2 aBase = floor(p / s);
    vec2 aLocal = mod(p, s) - halfS;
    vec2 pOff = p - halfS;
    vec2 bBase = floor(pOff / s);
    vec2 bLocal = mod(pOff, s) - halfS;
    float dA = dot(aLocal, aLocal);
    float dB = dot(bLocal, bLocal);
    float pick = step(dA, dB);
    vec2 localCoord = mix(bLocal, aLocal, pick);
    vec2 cellId = mix(bBase + vec2(0.5), aBase, pick);
    return vec4(localCoord, cellId);
}

float waveField(vec2 cellPos, float t) {
    float w = 0.0;
    w += sin(dot(cellPos, vec2(0.7, 0.5)) * 3.5 - t * 2.8) * 0.35;
    w += sin(cellPos.x * 4.2 + t * 1.9) * 0.25;
    float r1 = length(cellPos - vec2(-0.3, 0.2));
    w += sin(r1 * 6.0 - t * 3.2) * 0.2 * smoothstep(1.2, 0.0, r1);
    w += sin(dot(cellPos, vec2(-0.4, 0.8)) * 2.8 - t * 1.5) * 0.2;
    float r2 = length(cellPos - vec2(0.4, -0.3));
    w += sin(r2 * 5.0 - t * 2.4) * 0.15 * smoothstep(1.0, 0.0, r2);
    return w;
}

float dotSpecular(float tiltAngle, float tiltDir, vec2 uv) {
    float ct = cos(tiltAngle);
    float st = sin(tiltAngle);
    float cd = cos(tiltDir);
    float sd = sin(tiltDir);
    vec3 N = vec3(st * cd, st * sd, ct);
    vec3 L = normalize(vec3(0.4, 0.6, 0.9));
    vec3 V = vec3(0.0, 0.0, 1.0);
    vec3 R = reflect(-L, N);
    float spec = max(dot(R, V), 0.0);
    spec = pow(spec, 48.0);
    float sheen = pow(max(dot(R, V), 0.0), 8.0) * 0.15;
    return spec + sheen;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
    float t = u_time * u_waveSpeed;

    float dotScale = max(6.0, u_density);
    vec4 hex = hexTile(uv, dotScale);
    vec2 localPos = hex.xy;
    vec2 cellId = hex.zw;

    vec2 rnd = hash22(cellId);
    float sizeVar = 0.85 + rnd.x * 0.3;
    float baseTilt = (rnd.y - 0.5) * 0.15;
    float reflVar = 0.7 + rnd.x * 0.3;
    float phaseOff = rnd.y * TAU;

    float discRadius = 0.42 * sizeVar;
    float dist = length(localPos);
    float disc = smoothstep(discRadius, discRadius - 0.06, dist);

    float bevel = smoothstep(discRadius, discRadius - 0.04, dist)
                - smoothstep(discRadius - 0.04, discRadius - 0.08, dist);

    vec2 worldPos = cellId / dotScale;

    float wave = waveField(worldPos, t);
    float shimmer = sin(t * 3.0 + phaseOff) * 0.04;
    float tiltAngle = wave * 0.85 + baseTilt + shimmer;

    float waveH = waveField(worldPos + vec2(0.01, 0.0), t);
    float waveV = waveField(worldPos + vec2(0.0, 0.01), t);
    float tiltDir = atan(waveV - wave, waveH - wave);

    float mouseSpec = 0.0;
    if (u_mouse.x >= 0.0) {
        vec2 mUV = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);
        float mDist = length(uv - mUV);
        float mInfluence = exp(-mDist * mDist * 10.0);
        vec3 mLightDir = normalize(vec3(mUV.x - uv.x, mUV.y - uv.y, 0.5));
        float ct = cos(tiltAngle);
        float st2 = sin(tiltAngle);
        float cd = cos(tiltDir);
        float sd = sin(tiltDir);
        vec3 mN = vec3(st2 * cd, st2 * sd, ct);
        vec3 mR = reflect(-mLightDir, mN);
        float mS = pow(max(dot(mR, vec3(0.0, 0.0, 1.0)), 0.0), 32.0);
        mouseSpec = mS * mInfluence * 1.5;
    }

    float spec = dotSpecular(tiltAngle, tiltDir, uv);
    spec *= reflVar * u_sparkle;
    spec += mouseSpec * reflVar;

    vec3 darkDot = clamp(u_dark, 0.0, 1.0);
    vec3 hotGold = clamp(u_theme, 0.0, 1.0);
    vec3 amberFlash = mix(hotGold, vec3(1.0), 0.12);
    vec3 sheenBase = clamp(hotGold * 0.63 + 0.10, 0.0, 1.0);
    vec3 copperMid = mix(sheenBase, hotGold, 0.55);

    float facing = clamp(cos(tiltAngle) * 0.5 + 0.5, 0.0, 1.0);
    vec3 ambient = mix(darkDot, vec3(0.05), facing * 0.6);
    vec3 dotColor = ambient;

    float sheenAmount = pow(max(facing, 0.0), 3.0) * 0.2 * reflVar;
    dotColor += copperMid * sheenAmount;

    float flashLow = smoothstep(0.0, 0.3, spec);
    float flashHigh = smoothstep(0.3, 0.8, spec);
    float flashPeak = smoothstep(0.7, 1.0, spec);
    dotColor += copperMid * flashLow * 0.5;
    dotColor += amberFlash * flashHigh * 0.8;
    dotColor += hotGold * flashPeak * 1.2;
    dotColor += copperMid * bevel * facing * 0.3;

    vec3 col = dotColor * disc;
    vec2 uvSafe = uv + vec2(0.0001);
    float globalLight = 0.85 + 0.15 * dot(normalize(uvSafe), vec2(0.4, 0.6));
    col *= globalLight;
    float vig = 1.0 - smoothstep(0.4, 1.3, length(uv));
    col *= 0.6 + 0.4 * vig;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), disc);
}
`;
