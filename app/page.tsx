"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [focused, setFocused] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const suggestions = [
    "Quantum Entanglement",
    "Keynesian Economics",
    "DNA Replication",
    "Bayes' Theorem",
  ];

  // Grain animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animId: number;
    const drawGrain = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };
    drawGrain();
    return () => cancelAnimationFrame(animId);
  }, []);

  // API call handler
  const handleExplain = async () => {
    if (!topic) {
      setExplanation("⚠️ Please enter a topic first.");
      return;
    }

    setLoading(true);
    setExplanation("⏳ Generating explanation...");

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (data.error) {
        setExplanation(`❌ ${data.error}`);
      } else {
        setExplanation(data.explanation);
      }
    } catch (err) {
      console.error(err);
      setExplanation("❌ Failed to fetch explanation. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0e0c; min-height: 100vh; }

        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
        .grain-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; mix-blend-mode: overlay; opacity: 0.4; }

        .glow-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
        .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #c8892240 0%, transparent 70%); top: -150px; left: -150px; }
        .orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #8b4a1220 0%, transparent 70%); bottom: -100px; right: -100px; }

        .card { position: relative; z-index: 2; width: 100%; max-width: 560px; opacity: 0; transform: translateY(24px); animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        .card-inner { background: linear-gradient(145deg, #1a1814 0%, #141210 100%); border: 1px solid #2e2a24; border-radius: 20px; padding: 3rem 2.8rem; box-shadow: 0 0 0 1px #ffffff06, 0 32px 80px #00000080, inset 0 1px 0 #ffffff08; }

        .eyebrow { font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c88922; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem; opacity: 0; animation: fadeUp 0.6s ease 0.3s forwards; }
        .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: #c88922; }

        h1 { font-family: 'Fraunces', serif; font-size: clamp(2.4rem, 6vw, 3.4rem); font-weight: 700; line-height: 1.05; color: #f0ebe2; margin-bottom: 0.4rem; opacity: 0; animation: fadeUp 0.7s ease 0.4s forwards; }

        .subtitle { font-family: 'Fraunces', serif; font-style: italic; font-size: 1rem; color: #6b6458; margin-bottom: 2.4rem; opacity: 0; animation: fadeUp 0.7s ease 0.5s forwards; }

        .input-group { position: relative; margin-bottom: 1rem; opacity: 0; animation: fadeUp 0.7s ease 0.6s forwards; }
        .input-label { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #4a4440; margin-bottom: 0.6rem; display: block; transition: color 0.3s; }
        .input-group.focused .input-label { color: #c88922; }

        input { width: 100%; background: #0a0908; border: 1px solid #2a2520; border-radius: 12px; padding: 1rem 1.2rem; font-family: 'DM Mono', monospace; font-size: 0.95rem; color: #f0ebe2; outline: none; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: inset 0 2px 8px #00000040; }
        input::placeholder { color: #3d3830; }
        input:focus { border-color: #c88922; box-shadow: 0 0 0 3px #c8892218, inset 0 2px 8px #00000040; }

        .suggestions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; opacity: 0; animation: fadeUp 0.7s ease 0.7s forwards; }
        .chip { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: #5a5248; background: #1a1814; border: 1px solid #2a2520; border-radius: 100px; padding: 0.35rem 0.9rem; cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
        .chip:hover { color: #c88922; border-color: #c8892250; background: #c8892210; }

        .btn { width: 100%; padding: 1.1rem; border-radius: 12px; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; position: relative; overflow: hidden; background: linear-gradient(135deg, #c88922 0%, #a06818 50%, #c88922 100%); background-size: 200% 200%; color: #0f0e0c; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 4px 24px #c8892230; opacity: 0; animation: fadeUp 0.7s ease 0.8s forwards; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px #c8892240; background-position: right center; }
        .btn:active { transform: translateY(0); }
        .btn::after { content: '→'; margin-left: 0.6rem; transition: transform 0.2s; display: inline-block; }
        .btn:hover::after { transform: translateX(4px); }

        .divider { height: 1px; background: linear-gradient(to right, transparent, #2a2520, transparent); margin: 2rem 0; opacity: 0; animation: fadeUp 0.7s ease 0.75s forwards; }

        .footer-note { font-family: 'DM Mono', monospace; font-size: 0.62rem; color: #3a3530; text-align: center; letter-spacing: 0.08em; opacity: 0; animation: fadeUp 0.7s ease 0.9s forwards; margin-top: 1.5rem; }

        .explanation { font-family: 'DM Mono', monospace; font-size: 0.95rem; color: #f0ebe2; background: #141210; border: 1px solid #2a2520; border-radius: 12px; padding: 1rem; margin-top: 1.5rem; white-space: pre-wrap; opacity: 0; animation: fadeUp 0.7s ease forwards; }
      `}</style>

      <canvas ref={canvasRef} className="grain-canvas" />
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      <div className="page">
        <div className="card">
          <div className="card-inner">
            <p className="eyebrow">Study Tool</p>
            <h1>Understand<br />Anything.</h1>
            <p className="subtitle">Powered by AI — explained for you.</p>

            <div className={`input-group ${focused ? "focused" : ""}`}>
              <label className="input-label">Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="e.g. The French Revolution..."
              />
            </div>

            <div className="suggestions">
              {suggestions.map((s) => (
                <button key={s} className="chip" onClick={() => setTopic(s)}>
                  {s}
                </button>
              ))}
            </div>

            <button className="btn" onClick={handleExplain}>
              {loading ? "Generating..." : "Explain Topic"}
            </button>

            {explanation && (
              <div className="explanation">{explanation}</div>
            )}

            <div className="divider" />
            <p className="footer-note">
              Clear explanations · Any complexity · Any subject
            </p>
          </div>
        </div>
      </div>
    </>
  );
}