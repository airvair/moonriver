"use client";

import React, { useEffect, useRef } from "react";

// - Full‑screen GPU shader (WebGL1) with animated volumetric‑looking clouds
// - Soft neon palette, vignette, and subtle grain
// - No external deps; just drop <Background /> as the first child of your app
// - Tailwind optional; classes used are harmless if Tailwind isn't present

export default function Background({ speed = 0.12, intensity = 0.9, grain = 0.07 }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef(0);
    const startRef = useRef(performance.now());
    const glRef = useRef<WebGLRenderingContext | null>(null);

    // Vertex shader (pass-through)
    const VERT = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
  `;

    // Fragment shader
    // Inspired by multi-octave simplex/fBM with domain warping for thick, dimensional clouds
    const FRAG = `
  precision highp float;
  uniform vec2  iResolution;
  uniform float iTime;
  uniform float uSpeed;
  uniform float uIntensity;

  // Hash / noise utils
  float hash(vec2 p) {
    p = fract(p*vec2(123.34, 345.45));
    p += dot(p, p+34.345);
    return fract(p.x*p.y);
  }

  // 2D value noise
  float vnoise(in vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    // Quintic smooth
    vec2 u = f*f*(3.0-2.0*f);
    float a = hash(i + vec2(0.0,0.0));
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }

  // Fractional Brownian Motion
  float fbm(vec2 p){
    float s = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6,1.2,-1.2,1.6);
    for(int i=0;i<6;i++){
      s += a * vnoise(p);
      p = m * p;
      a *= 0.5;
    }
    return s;
  }

  // Domain warp
  float dfbm(vec2 p, float t){
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - vec2(t*0.25)));
    vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7,9.2)), fbm(p + 4.0*q + vec2(8.3,2.8)));
    return fbm(p + 4.0*r);
  }


  // Palette
  vec3 palette(float x){
    // Custom palette: indigo -> magenta -> white
    vec3 a = vec3(0.227, 0.227, 0.557); // #3A3A8E - indigo
    vec3 b = vec3(0.890, 0.063, 0.337); // #E31056 - bright magenta
    vec3 c = vec3(1.000, 1.000, 1.000); // #FFFFFF - white

    vec3 col = mix(a, b, smoothstep(0.15, 0.60, x));
    col = mix(col, c, smoothstep(0.55, 0.95, x));
    return col;
  }


  void main(){
    vec2 uv = (gl_FragCoord.xy / iResolution.xy);
    vec2 p = (uv - 0.5);
    p.x *= iResolution.x / iResolution.y; // aspect

    // Subtle camera drift
    float t = iTime * uSpeed;
    vec2 drift = vec2(sin(t*0.27), cos(t*0.19)) * 0.35;

    // Distance-based depth/scale (gives sense of volume)
    float r = length(p);
    float depth = mix(0.9, 2.2, smoothstep(0.0, 0.9, r));

    // Warped noise field
    float n = dfbm(p * depth * 1.8 + drift, t);

    // Contrast + intensity shaping
    n = pow(smoothstep(0.15, 0.95, n), mix(1.1, 1.8, uIntensity));

    // Colorize
    vec3 col = palette(n);

    // Edge vignette to focus center
    float vig = smoothstep(0.95, 0.35, r);
    col *= mix(0.65, 1.0, vig);

    // Subtle filmic curve
    col = pow(col, vec3(0.9));

    // Gentle bloom-ish lift where noise is bright
    col += 0.08 * smoothstep(0.8, 1.0, n);

    // Final
    gl_FragColor = vec4(col, 1.0);
  }
  `;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", { antialias: false, depth: false, stencil: false, premultipliedAlpha: true });
        if (!gl) {
            console.warn("WebGL not available; falling back gradient.");
            return;
        }
        glRef.current = gl;

        // Build program
        const vs = gl.createShader(gl.VERTEX_SHADER);
        if (!vs) return;
        gl.shaderSource(vs, VERT);
        gl.compileShader(vs);

        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        if (!fs) return;
        gl.shaderSource(fs, FRAG);
        gl.compileShader(fs);

        const log = (type: string, sh: WebGLShader) => {
            const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
            if (!ok) console.error(type, gl.getShaderInfoLog(sh));
        };
        log("VERTEX", vs);
        log("FRAGMENT", fs);

        const prog = gl.createProgram();
        if (!prog) return;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.bindAttribLocation(prog, 0, "position");
        gl.linkProgram(prog);

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("LINK", gl.getProgramInfoLog(prog));
            return;
        }

        gl.useProgram(prog);

        // Fullscreen triangle (better than quad)
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        const tri = new Float32Array([
            -1, -1,
            3, -1,
            -1,  3,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, tri, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, "iResolution");
        const uTime = gl.getUniformLocation(prog, "iTime");
        const uSpeed = gl.getUniformLocation(prog, "uSpeed");
        const uIntensity = gl.getUniformLocation(prog, "uIntensity");

        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            const w = Math.floor(canvas.clientWidth * dpr);
            const h = Math.floor(canvas.clientHeight * dpr);
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w; canvas.height = h;
                gl.viewport(0, 0, w, h);
            }
            gl.uniform2f(uRes, canvas.width, canvas.height);
        };

        const onResize = () => resize();
        const onVisibility = () => { if (document.hidden) cancelAnimationFrame(rafRef.current); else loop(); };

        const loop = () => {
            const now = performance.now();
            const t = (now - startRef.current) / 1000;
            gl.uniform1f(uTime, t);
            gl.uniform1f(uSpeed, speed);
            gl.uniform1f(uIntensity, intensity);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            rafRef.current = requestAnimationFrame(loop);
        };

        // Prepare sizing
        resize();
        loop();
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
            gl.deleteBuffer(buf);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, [speed, intensity]);

    return (
        <div className="fixed inset-0 -z-10">
            {/* Canvas layer */}
            <canvas ref={canvasRef} className="w-full h-full block"/>

            {/* Overlay: radial glow + vignette + subtle grain */}
            <div className="pointer-events-none absolute inset-0" style={{
                background: `radial-gradient(60% 55% at 50% 45%, rgba(255,255,255,0.12), rgba(0,0,0,0) 60%),
                     radial-gradient(120% 90% at 50% 120%, rgba(0,0,0,0.55), rgba(0,0,0,0.0) 45%),
                     radial-gradient(120% 90% at 50% -20%, rgba(35,0,60,0.25), rgba(0,0,0,0) 40%)`
            }} />
            <Noise grain={grain} />
        </div>
    );
}

function Noise({ grain = 0.07 }){
    // CSS generated grain layer (fast, no extra draws)
    const s = 100 * (grain ?? 0.07);
    return (
        <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
            style={{
                backgroundImage:
                    `repeating-conic-gradient(from 0deg, rgba(255,255,255,${s/8000}), rgba(0,0,0,${s/12000}) 0.5deg)`,
                filter: "contrast(120%) brightness(95%)",
            }}
        />
    );
}
