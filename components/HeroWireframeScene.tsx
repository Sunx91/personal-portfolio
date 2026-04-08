"use client";

import { useEffect, useRef, type RefObject } from "react";

type Vec3 = [number, number, number];

const LINE_FRONT = "165, 180, 252";
const LINE_BACK = "99, 102, 241";
const NODE = "196, 181, 253";

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

function buildIcosphere(subdivisions: number): {
  vertices: Vec3[];
  edges: [number, number][];
} {
  const X = 0.525731112119133696;
  const Z = 0.850650808352039932;

  let vertices: Vec3[] = [
    [-X, 0, Z],
    [X, 0, Z],
    [-X, 0, -Z],
    [X, 0, -Z],
    [0, Z, X],
    [0, Z, -X],
    [0, -Z, X],
    [0, -Z, -X],
    [Z, X, 0],
    [-Z, X, 0],
    [Z, -X, 0],
    [-Z, -X, 0],
  ].map((v) => normalize(v as Vec3));

  let faces: number[][] = [
    [0, 4, 1],
    [0, 9, 4],
    [9, 5, 4],
    [4, 5, 8],
    [4, 8, 1],
    [8, 10, 1],
    [8, 3, 10],
    [5, 3, 8],
    [5, 2, 3],
    [2, 7, 3],
    [7, 10, 3],
    [7, 6, 10],
    [7, 11, 6],
    [11, 0, 6],
    [0, 1, 6],
    [6, 1, 10],
    [9, 0, 11],
    [9, 11, 2],
    [9, 2, 5],
    [7, 2, 11],
  ];

  const midpointCache = new Map<string, number>();

  function mid(ai: number, bi: number): number {
    const key = ai < bi ? `${ai}_${bi}` : `${bi}_${ai}`;
    const hit = midpointCache.get(key);
    if (hit !== undefined) return hit;
    const a = vertices[ai];
    const b = vertices[bi];
    const m = normalize([
      (a[0] + b[0]) / 2,
      (a[1] + b[1]) / 2,
      (a[2] + b[2]) / 2,
    ]);
    const idx = vertices.length;
    vertices.push(m);
    midpointCache.set(key, idx);
    return idx;
  }

  for (let s = 0; s < subdivisions; s++) {
    midpointCache.clear();
    const next: number[][] = [];
    for (const face of faces) {
      const [a, b, c] = face;
      const ab = mid(a, b);
      const bc = mid(b, c);
      const ca = mid(c, a);
      next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = next;
  }

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (const face of faces) {
    const pairs: [number, number][] = [
      [face[0], face[1]],
      [face[1], face[2]],
      [face[2], face[0]],
    ];
    for (const [i, j] of pairs) {
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([a, b]);
      }
    }
  }

  return { vertices, edges };
}

function rotateY(v: Vec3, ang: number): Vec3 {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function rotateX(v: Vec3, ang: number): Vec3 {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function HeroWireframeScene({ sectionRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const { vertices: baseVerts, edges } = buildIcosphere(1);

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      const c = canvasRef.current;
      const sec = sectionRef.current;
      if (!c || !sec) return;
      const r = sec.getBoundingClientRect();
      width = Math.max(1, Math.floor(r.width));
      height = Math.max(1, Math.floor(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.floor(width * dpr);
      c.height = Math.floor(height * dpr);
      c.style.width = `${width}px`;
      c.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const mouse = { nx: 0, ny: 0, active: false };

    function onMove(e: MouseEvent) {
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      mouse.nx = (e.clientX - r.left) / r.width - 0.5;
      mouse.ny = (e.clientY - r.top) / r.height - 0.5;
      mouse.active = true;
    }

    function onLeave() {
      mouse.active = false;
      mouse.nx = 0;
      mouse.ny = 0;
    }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const t0 = performance.now();
    let rx = 0.25;
    let ry = 0.4;

    function sphereParams() {
      const mobile = width < 768;
      const cx = mobile ? width * 0.5 : width * 0.66;
      const cy = mobile ? height * 0.62 : height * 0.48;
      const scale = Math.min(width, height) * (mobile ? 0.32 : 0.42);
      return { cx, cy, scale, mobile };
    }

    function project(
      v: Vec3,
      cx: number,
      cy: number,
      scale: number,
    ): { x: number; y: number; z: number; ok: boolean } {
      const persp = 2.8;
      const zClamped = Math.max(-0.92, Math.min(0.98, v[2]));
      const f = persp / (persp + zClamped);
      return {
        x: cx + v[0] * scale * f,
        y: cy + v[1] * scale * f,
        z: zClamped,
        ok: zClamped > -0.88,
      };
    }

    function paintSphere(
      ryAng: number,
      rxAng: number,
      mobile: boolean,
      cx: number,
      cy: number,
      scale: number,
    ) {
      const transformed: Vec3[] = baseVerts.map((v) => {
        let p: Vec3 = [...v];
        p = rotateY(p, ryAng);
        p = rotateX(p, rxAng);
        return p;
      });
      const projected = transformed.map((v) => project(v, cx, cy, scale));
      ctx.lineCap = "round";
      for (const [ia, ib] of edges) {
        const pa = projected[ia];
        const pb = projected[ib];
        if (!pa.ok && !pb.ok) continue;
        const za = (pa.z + 1) * 0.5;
        const zb = (pb.z + 1) * 0.5;
        const depth = Math.max(0, Math.min(1, (za + zb) * 0.5));
        const alpha = 0.08 + depth * 0.42;
        ctx.strokeStyle = `rgba(${depth > 0.35 ? LINE_FRONT : LINE_BACK}, ${alpha})`;
        ctx.lineWidth = mobile ? 0.65 : 0.85;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (!p.ok) continue;
        const depth = Math.max(0, Math.min(1, (p.z + 1) * 0.5));
        const alpha = 0.12 + depth * 0.55;
        ctx.fillStyle = `rgba(${NODE}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, mobile ? 1 : 1.25, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function paintFrame(ryAng: number, rxAng: number) {
      if (width < 2 || height < 2) return;
      ctx.clearRect(0, 0, width, height);
      const { cx, cy, scale, mobile } = sphereParams();
      paintSphere(ryAng, rxAng, mobile, cx, cy, scale);
    }

    function tick(now: number) {
      const t = (now - t0) * 0.001;
      const autoRy = t * 0.22;
      const autoRx = 0.2 + Math.sin(t * 0.15) * 0.08;
      const targetRy = autoRy + (mouse.active ? mouse.nx * 0.85 : 0);
      const targetRx = autoRx + (mouse.active ? mouse.ny * 0.55 : 0);
      ry += (targetRy - ry) * 0.06;
      rx += (targetRx - rx) * 0.06;
      paintFrame(ry, rx);
      raf = requestAnimationFrame(tick);
    }

    function paintStatic() {
      paintFrame(0.52, 0.28);
    }

    function resizeAndMaybeStatic() {
      resize();
      if (reduceMotion) paintStatic();
    }

    const ro = new ResizeObserver(resizeAndMaybeStatic);
    ro.observe(section);
    resizeAndMaybeStatic();

    if (reduceMotion) {
      return () => {
        ro.disconnect();
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
      };
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full max-h-full w-full max-w-full"
    />
  );
}
