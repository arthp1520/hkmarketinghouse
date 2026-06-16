"use client";
import { useState, useRef, useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import { Camera, Video, Film } from "lucide-react";

/* ─── animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
  }),
};
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const GOLD = "#F5BF03";

const scrollingWords = ["Stories", "Brands", "Moments", "Shots", "Stories"];

const filmStripItems = [
  "BRAND SHOOT", "ADVERTISEMENT", "WEDDING FILMS", "REEL EDITING",
  "COMMERCIAL", "PRODUCTION", "CINEMATICS", "VISUAL STORIES",
  "BRAND SHOOT", "ADVERTISEMENT", "WEDDING FILMS", "REEL EDITING",
];

const clients = [
  { name: "Shalimar Dhaba",                  industry: "Dhaba"         },
  { name: "Shasha Constructions",             industry: "Constructions" },
  { name: "Roshni Driving & Training School", industry: "Driving"       },
  { name: "Shiv Sagar Food Court",            industry: "Food"          },
  { name: "FS Mobile",                        industry: "Tech"          },
  { name: "Swagat Hotels inn",                    industry: "Hotels"        },
];

const portfolioVideos = [
  { src: "https://res.cloudinary.com/ddq38edzp/video/upload/q_auto/f_auto/v1781598409/lv_0_20260425133458_qi0sbf.mp4", poster: "https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781595806/shalimar_xhzrcc.jpg",   title: "Brand Campaign",     sub: "Premium commercial visuals", tag: "SCENE 01" },
  { src: "https://res.cloudinary.com/ddq38edzp/video/upload/q_auto/f_auto/v1781597732/Swagat_inn_olinle.mp4", poster: "https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781596089/Swaggat_n6t5qu.jpg",   title: "Food and Chill",     sub: "Post & Video Edit", tag: "SCENE 02" },
  { src: "https://res.cloudinary.com/ddq38edzp/video/upload/q_auto/f_auto/v1781596211/Cinematic_Video_Roshni_Driving_School__y5qbpn.mp4",         poster: "https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781596106/repair_rncnzu.jpg", title: "Driving",            sub: "Emotional storytelling",     tag: "SCENE 03" },
  { src: "https://res.cloudinary.com/ddq38edzp/video/upload/q_auto/f_auto/v1781598934/shiv-sagar_j6nsji.mp4",          poster: "https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781595807/shiv_aehsoo.jpg",         title: "Advertisement Film", sub: "Creative ad production",     tag: "SCENE 04" },
];

const stats = [
  { num: "60k+", label: "Followers"        },
  { num: "10M+", label: "Impressions"      },
  { num: "5+",   label: "Years Experience" },
  { num: "4K",   label: "Cinematic Quality"},
];

const services = [
  {
    label: "Short Form Video (Reels, Youtube Shorts, Post Edit)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="14" height="12" rx="3" />
        <path d="M16 10l5-3v10l-5-3V10z" />
      </svg>
    ),
  },
  {
    label: "Long Form Video (Youtube, Instagram and Facebook Edit)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="3" />
        <path d="M8 21h8M12 17v4" />
        <path d="M10 10l5-3v6l-5-3z" fill={GOLD} />
      </svg>
    ),
  },
  {
    label: "Graphical Post (Instagram Post, Youtube Thumbnails)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8.5" cy="8.5" r="1.5" fill={GOLD} />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    label: "Social Media Marketing (YT, INSTA, FB)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
      </svg>
    ),
  },
  {
    label: "AI Videos",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4v4a4 4 0 01-8 0V6a4 4 0 014-4z" />
        <path d="M6 10a6 6 0 0012 0" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const heroRef  = useRef<HTMLElement>(null);
  const [shutterDone, setShutterDone] = useState(false);

  const { scrollY } = useScroll();
  const heroParallax     = useTransform(scrollY, [0, 600], [0, -100]);
  const lensFlareOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setShutterDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width:768px)").matches;
    if (isMobile) return;
    const lenis = new Lenis({ duration: 1.8, smoothWheel: true });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.querySelector(id) as HTMLElement | null;
    if (!target) return;
    if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -80, duration: 2 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const text = await res.text();
      let data: any = null;
      if (text) { try { data = JSON.parse(text); } catch { /* non-JSON */ } }
      if (res.ok) {
        alert("Booking Submitted Successfully!");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        const msg = data?.detail || data?.message || data?.error || `Server error (${res.status})`;
        alert(`Submission failed: ${msg}`);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Could not reach the server. Please check your connection and try again.");
    }
  };

  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">

      {/* ══════ GLOBAL STYLES ══════ */}
      <style>{`
        :root { --gold: ${GOLD}; }

        @keyframes slideWords {
          0%,15%  { transform: translateY(0) }
          25%,40% { transform: translateY(-1.15em) }
          50%,65% { transform: translateY(-2.30em) }
          75%,90% { transform: translateY(-3.45em) }
          100%    { transform: translateY(-4.60em) }
        }
        @keyframes grain {
          0%,100% { transform: translate(0,0) }
          10%  { transform: translate(-2%,-3%) }
          20%  { transform: translate(3%,2%) }
          30%  { transform: translate(-1%,4%) }
          40%  { transform: translate(4%,-1%) }
          50%  { transform: translate(-3%,3%) }
          60%  { transform: translate(2%,-4%) }
          70%  { transform: translate(-4%,1%) }
          80%  { transform: translate(1%,-2%) }
          90%  { transform: translate(3%,4%) }
        }
        @keyframes filmScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes focusRing {
          0%,100% { transform: translate(-50%,-50%) scale(.88); opacity: .7 }
          50%     { transform: translate(-50%,-50%) scale(1);   opacity: 1  }
        }
        @keyframes scanDrift  { from { background-position: 0 0 } to { background-position: 0 100% } }
        @keyframes flareDrift {
          0%,100% { transform: translate(0,0) scale(1);          opacity: .25 }
          50%     { transform: translate(20px,-15px) scale(1.12); opacity: .32 }
        }
        @keyframes shutterTopOpen { from { transform: scaleY(1) } to { transform: scaleY(0) } }
        @keyframes shutterBotOpen { from { transform: scaleY(1) } to { transform: scaleY(0) } }
        @keyframes flicker {
          0%,100% { opacity: 1 } 92% { opacity: 1 } 93% { opacity: .85 }
          94% { opacity: 1 } 97% { opacity: .9 } 98% { opacity: 1 }
        }
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        .film-grain::after {
          content: ''; position: fixed; inset: -50%; width: 200%; height: 200%;
          pointer-events: none; z-index: 9999; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px; animation: grain .4s steps(1) infinite;
        }
        .film-flicker { animation: flicker 6s infinite }
        .timecode { font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 2px; color: rgba(245,191,3,.6) }
        .letterbox-top, .letterbox-bot { position: absolute; left: 0; right: 0; height: 50px; background: #000; z-index: 20 }
        .letterbox-top { top: 0 } .letterbox-bot { bottom: 0 }
        .focus-ring {
          position: absolute; top: 50%; left: 50%; width: 220px; height: 220px;
          border: 1px solid rgba(245,191,3,.22); border-radius: 50%;
          animation: focusRing 3s ease-in-out infinite; pointer-events: none;
        }
        .focus-ring::before {
          content: ''; position: absolute; inset: 12px;
          border: .5px solid rgba(245,191,3,.12); border-radius: 50%;
        }
        @media(max-width:640px) { .focus-ring { width: 150px; height: 150px } }
        .corner { position: absolute; width: 16px; height: 16px; opacity: .45 }
        .corner-tl { top: 58px;  left: 14px;  border-top: 1px solid ${GOLD}; border-left:  1px solid ${GOLD} }
        .corner-tr { top: 58px;  right: 14px; border-top: 1px solid ${GOLD}; border-right: 1px solid ${GOLD} }
        .corner-bl { bottom: 58px; left: 14px;  border-bottom: 1px solid ${GOLD}; border-left:  1px solid ${GOLD} }
        .corner-br { bottom: 58px; right: 14px; border-bottom: 1px solid ${GOLD}; border-right: 1px solid ${GOLD} }
        .vignette  { position: absolute; inset: 0; background: radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,.86) 100%); pointer-events: none; z-index: 5 }
        .scanlines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.07) 2px,rgba(0,0,0,.07) 4px); animation: scanDrift 8s linear infinite; pointer-events: none; z-index: 6 }
        .lens-flare { position: absolute; top: 28%; left: 60%; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle,rgba(245,191,3,.28) 0%,rgba(234,100,0,.1) 40%,transparent 70%); filter: blur(28px); animation: flareDrift 7s ease-in-out infinite; pointer-events: none; z-index: 4 }
        .lens-flare-streak { position: absolute; top: 33%; left: 55%; width: 440px; height: 2px; background: linear-gradient(90deg,transparent,rgba(245,191,3,.12),rgba(255,255,255,.06),transparent); transform: rotate(-15deg); animation: flareDrift 7s ease-in-out infinite reverse; pointer-events: none; z-index: 4 }
        .shutter-top { position: fixed; top: 0; left: 0; right: 0; height: 50vh; background: #000; z-index: 100000; transform-origin: top;    animation: shutterTopOpen .9s cubic-bezier(.76,0,.24,1) .4s forwards }
        .shutter-bot { position: fixed; bottom: 0; left: 0; right: 0; height: 50vh; background: #000; z-index: 100000; transform-origin: bottom; animation: shutterBotOpen .9s cubic-bezier(.76,0,.24,1) .4s forwards }
        .film-strip { background: #0a0a0a; border-top: 1px solid rgba(245,191,3,.12); border-bottom: 1px solid rgba(245,191,3,.12); overflow: hidden }
        .film-strip-track { display: flex; width: max-content; animation: filmScroll 18s linear infinite }
        .film-strip-item { padding: 12px 34px; font-size: 10px; letter-spacing: 5px; color: rgba(245,191,3,.5); white-space: nowrap; border-right: 1px solid rgba(245,191,3,.08); font-family: 'Courier New', monospace }
        .film-strip-hole { width: 8px; height: 8px; border-radius: 2px; background: rgba(245,191,3,.07); border: 1px solid rgba(245,191,3,.13); display: inline-block; margin: 0 12px; vertical-align: middle }
        .reel-divider { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 18px 0 }
        .reel-hole { width: 7px; height: 7px; border-radius: 1px; border: 1px solid rgba(245,191,3,.18) }
        .reel-line  { flex: 1; max-width: 90px; height: 1px; background: linear-gradient(90deg,transparent,rgba(245,191,3,.18),transparent) }
        .card-shimmer { position: relative; overflow: hidden }
        .card-shimmer::before { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg,transparent,rgba(245,191,3,.04),transparent); transition: left .6s ease; z-index: 1 }
        .card-shimmer:hover::before { left: 150% }
        .vid-card { position: relative; overflow: hidden; border-radius: 24px; cursor: default }
        .vid-card video { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s ease }
        .vid-card:hover video { transform: scale(1.05) }
        .vid-overlay { position: absolute; inset: 0; background: linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.18) 55%,rgba(0,0,0,.26) 100%); pointer-events: none }
        .play-ring {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 52px; height: 52px; border-radius: 50%;
          border: 1.5px solid rgba(245,191,3,.65);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); background: rgba(0,0,0,.3);
        }
        .client-ticker { overflow: hidden; border-top: 1px solid rgba(245,191,3,.1); border-bottom: 1px solid rgba(245,191,3,.1) }
        .client-track  { display: inline-flex; animation: ticker 28s linear infinite }
        .client-track:hover { animation-play-state: paused }
        .client-chip { display: inline-flex; flex-direction: column; gap: 3px; padding: 22px 44px; border-right: 1px solid rgba(245,191,3,.08); white-space: nowrap; flex-shrink: 0 }
        .client-name { font-size: 14px; font-weight: 700; letter-spacing: .5px; color: #fff }
        .client-ind  { font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 3px; color: rgba(245,191,3,.5) }
        @media(max-width:640px) {
          .hide-sm { display: none !important }
          .letterbox-top, .letterbox-bot { height: 40px }
          .corner-tl, .corner-tr { top: 46px }
          .corner-bl, .corner-br { bottom: 46px }
        }
      `}</style>

      <div className="film-grain film-flicker" />
      <AnimatePresence>
        {!shutterDone && (
          <>
            <div className="shutter-top" />
            <div className="shutter-bot" />
          </>
        )}
      </AnimatePresence>

      {/* ══════ NAVBAR ══════ */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-yellow-500/15">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <img
              src="https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781596103/logo_drpkpt.jpg"
              alt="HK Marketing House Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <h1 className="text-lg md:text-xl font-bold tracking-[3px]" style={{ color: GOLD }}>
              HK MARKETING HOUSE
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="hidden md:flex gap-8 text-xs uppercase tracking-[4px]"
          >
            {["Home", "Services", "Portfolio", "Clients", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === "Home" ? "body" : `#${item.toLowerCase()}`)}
                className="hover:text-yellow-400 transition duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </motion.div>

          <button
            onClick={() => scrollToSection("#contact")}
            className="md:hidden text-black text-xs font-bold px-4 py-2 rounded-full"
            style={{ background: GOLD }}
          >
            Book
          </button>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center text-center px-4 md:px-6 overflow-hidden">
        <div className="letterbox-top z-20 flex items-center justify-between px-4 md:px-6">
          <span className="timecode hide-sm">HK MARKETING HOUSE © 2026</span>
          <span className="timecode">00:00:00:00</span>
          <span className="timecode hide-sm">4K • 24FPS • REC</span>
        </div>
        <div className="letterbox-bot z-20 flex items-center justify-between px-4 md:px-6">
          <span className="timecode">SCENE 001 • TAKE 01</span>
          <span className="timecode hide-sm">ISO 3200 • f/1.8 • 1/50s</span>
        </div>

        <motion.div style={{ y: heroParallax }} className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-25">
            <source src="https://res.cloudinary.com/ddq38edzp/video/upload/q_auto/f_auto/v1781596105/hero_ri8q7n.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-black/65" />
        <div className="vignette" />
        <div className="scanlines" />

        <motion.div style={{ opacity: lensFlareOpacity }}>
          <div className="lens-flare" />
          <div className="lens-flare-streak" />
        </motion.div>

        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
        <div className="focus-ring z-10" />

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 1.2 }}
          className="absolute w-[480px] h-[480px] blur-[120px] rounded-full pointer-events-none"
          style={{ background: "rgba(245,191,3,0.09)" }}
        />

        <div className="relative z-10 max-w-5xl w-full">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1.4}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-px w-10" style={{ background: "rgba(245,191,3,.5)" }} />
            <p className="uppercase tracking-[6px] text-xs" style={{ color: GOLD }}>Creative Production House</p>
            <div className="h-px w-10" style={{ background: "rgba(245,191,3,.5)" }} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.6}
            className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            We Create
            <div className="flex items-center justify-center gap-3 mt-1 flex-wrap">
              <span className="text-white">Cinematic</span>
              <div style={{ height: "1.15em", overflow: "hidden", display: "inline-block" }}>
                <div style={{ display: "flex", flexDirection: "column", animation: "slideWords 5s cubic-bezier(.4,0,.2,1) infinite" }}>
                  {scrollingWords.map((w, i) => (
                    <span key={i} style={{ height: "1.15em", display: "flex", alignItems: "center", color: GOLD }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1.9}
            className="mt-6 text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Brand Shoots&nbsp;•&nbsp;Advertisement Films&nbsp;•&nbsp;Social Media Manage&nbsp;•&nbsp;Commercial Productions
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.1}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection("#contact")}
              className="group relative text-black px-7 py-4 rounded-full font-bold overflow-hidden hover:scale-105 active:scale-95 transition duration-300 text-sm md:text-base"
              style={{ background: GOLD }}
            >
              <span className="relative z-10">Book Now</span>
              <div
                className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                style={{ background: "#f5d000" }}
              />
            </button>
            <button
              onClick={() => scrollToSection("#clients")}
              className="border px-7 py-4 rounded-full hover:text-black active:scale-95 transition duration-300 tracking-wide text-sm"
              style={{ borderColor: "rgba(245,191,3,.6)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              Our Clients
            </button>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2.4}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-red-500"
            />
            <span className="timecode text-red-400/70">REC</span>
          </motion.div>
        </div>
      </section>

      {/* ── Film Strip ── */}
      <FilmStrip items={filmStripItems} reverse={false} />

      {/* ══════ WHAT WE PROVIDE ══════ */}
      <section id="what-we-provide" className="py-20 md:py-28 px-4 md:px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — logo image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full blur-[80px] opacity-20"
                style={{ background: "radial-gradient(circle, #F5BF03 0%, #ea6400 50%, transparent 80%)" }}
              />
              <img
                src="https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781596096/WhatsApp_Image_2026-06-04_at_10.21.15_hqj0tx.jpg"
                alt="HK Marketing House Services"
                className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(245,191,3,0.45)]"
              />
            </div>
          </motion.div>

          {/* Right — services list */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.1}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs" style={{ color: GOLD }}>What We Offer</p>
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-8">
              What We <span style={{ color: GOLD }}>Provide</span>
            </h2>

            <ul className="space-y-3 mb-10">
              {services.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={i * 0.08}
                  whileHover={{ x: 6 }}
                  onClick={() => scrollToSection("#contact")}
                  className="group flex items-center gap-4 text-sm md:text-base text-gray-300 cursor-pointer relative px-4 py-3 rounded-xl transition-all duration-300"
                  style={{ background: "transparent", border: "1px solid transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(245,191,3,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,191,3,0.25)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(245,191,3,0.12), inset 0 0 18px rgba(245,191,3,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(245,191,3,0.08)",
                      border: "1px solid rgba(245,191,3,0.2)",
                      boxShadow: "0 0 10px rgba(245,191,3,0.08)",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span
                    className="transition-all duration-300 group-hover:text-yellow-300"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(245,191,3,0.6)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
                  >
                    {item.label}
                  </span>

                  {/* Arrow */}
                  <span className="ml-auto text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                    {"->"}
                  </span>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("#services")}
              className="group inline-flex items-center gap-3 text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:scale-105 active:scale-95 transition duration-300"
              style={{ background: GOLD }}
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section id="services" className="py-20 md:py-28 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-4"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs" style={{ color: GOLD }}>Our Services</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-6xl font-bold">Premium Visual Production</h2>
          </motion.div>

          <div className="reel-divider mb-12">
            {[...Array(5)].map((_, i) => <span key={i} className="reel-hole" />)}
            <div className="reel-line" />
            {[...Array(5)].map((_, i) => <span key={i} className="reel-hole" />)}
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Camera, title: "Brand Shoot",              desc: "Premium cinematic branding visuals designed for modern businesses.", delay: 0    },
              { icon: Video,  title: "Advertisement Films",       desc: "Creative commercial productions that capture attention instantly.",  delay: 0.12 },
              { icon: Film,   title: "Social Media Management",   desc: "Emotional storytelling through luxury wedding filmmaking.",         delay: 0.24 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={delay}
                whileHover={{ y: -8 }}
                className="card-shimmer bg-zinc-900/80 border border-yellow-500/15 rounded-3xl p-8 md:p-10 hover:border-yellow-400/50 transition duration-300 relative"
              >
                <span className="timecode absolute top-5 right-5 opacity-35">
                  #{String(Math.floor(delay * 100 + 1)).padStart(3, "0")}
                </span>
                <Icon className="w-10 h-10 mb-5" strokeWidth={1.2} style={{ color: GOLD }} />
                <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Film Strip reverse ── */}
      <FilmStrip items={[...filmStripItems].reverse()} reverse={true} />

      {/* ══════ PORTFOLIO ══════ */}
      <section id="portfolio" className="py-20 md:py-28 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs" style={{ color: GOLD }}>Our Portfolio</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-6xl font-bold">
              Featured <span style={{ color: GOLD }}>Films</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {portfolioVideos.map(({ src, poster, title, sub, tag }, idx) => (
              <motion.div
                key={title}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={idx * 0.12}
                whileHover={{ scale: 1.02 }}
              >
                <VideoCard src={src} poster={poster} title={title} sub={sub} tag={tag} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ OUR CLIENTS ══════ */}
      <section id="clients" className="py-20 md:py-28 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs" style={{ color: GOLD }}>Our Clients</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-6xl font-bold">Brands We&apos;ve Worked With</h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base max-w-xl mx-auto">
              Trusted by leading brands across industries to deliver cinematic quality.
            </p>
          </motion.div>
        </div>

        <div className="client-ticker mb-3">
          <div className="client-track">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="client-chip">
                <span className="client-name">{c.name}</span>
                <span className="client-ind">{c.industry}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="client-ticker">
          <div className="client-track" style={{ animationDirection: "reverse" }}>
            {[...clients, ...clients].reverse().map((c, i) => (
              <div key={i} className="client-chip" style={{ opacity: 0.65 }}>
                <span className="client-name">{c.name}</span>
                <span className="client-ind">{c.industry}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-14">
            {stats.map(({ num, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-zinc-900/60 border border-yellow-500/12 rounded-2xl p-5 md:p-6 text-center"
              >
                <p className="text-2xl md:text-4xl font-black" style={{ color: GOLD }}>{num}</p>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section id="contact" className="py-20 md:py-28 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs" style={{ color: GOLD }}>Contact Us</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Let&apos;s Create Something <span style={{ color: GOLD }}>Cinematic</span>
            </h2>
            <p className="text-gray-500 mt-5 text-sm md:text-base leading-relaxed">
              We help brands grow through commercial shoots, video editing,Social media management, and creative content solutions
            </p>
            <div className="mt-8 space-y-5 info">
              {[
                { label: "Email",     value: "hkproduction736@gmail.com" },
                { label: "Phone",     value: "+91 8849770932"       },
                { label: "Instagram", value: "@hk_production_house"    },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: GOLD }} />
                  <div>
                    <p className="uppercase text-xs tracking-widest mb-0.5" style={{ color: GOLD }}>{label}</p>
                    <p className="text-gray-300 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.15}
            className="relative bg-zinc-900/80 border border-yellow-500/15 rounded-3xl p-7 md:p-10"
          >
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l"     style={{ borderColor: "rgba(245,191,3,.2)" }} />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r"    style={{ borderColor: "rgba(245,191,3,.2)" }} />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l"  style={{ borderColor: "rgba(245,191,3,.2)" }} />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r" style={{ borderColor: "rgba(245,191,3,.2)" }} />

            <h3 className="text-xl md:text-2xl font-bold mb-6 tracking-wide">Book a Shoot</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { type: "text",  name: "name",  placeholder: "Your Name"     },
                { type: "email", name: "email", placeholder: "Email Address" },
                { type: "text",  name: "phone", placeholder: "Phone Number"  },
              ].map(({ type, name, placeholder }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full bg-black/60 border border-zinc-800 rounded-xl p-4 outline-none transition text-sm placeholder-zinc-600"
                  onFocus={(e) => { e.target.style.borderColor = "rgba(245,191,3,.6)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = ""; }}
                />
              ))}

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-black/60 border border-zinc-800 rounded-xl p-4 outline-none transition text-sm text-zinc-400"
              >
                <option value="">Choose Service</option>
                <option>Brand Shoot</option>
                <option>Advertisement Shoot</option>
                <option>Wedding Shoot</option>
                <option>Film Production</option>
                <option>Video Editing</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full bg-black/60 border border-zinc-800 rounded-xl p-4 outline-none transition text-sm placeholder-zinc-600 resize-none"
              />

              <button
                type="submit"
                className="w-full text-black py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition duration-300 tracking-wide text-sm md:text-base"
                style={{ background: GOLD }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f5d000"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; }}
              >
                Submit Booking
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-zinc-950 border-t border-yellow-500/10 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src="https://res.cloudinary.com/ddq38edzp/image/upload/q_auto/f_auto/v1781596103/logo_drpkpt.jpg"
                alt="HK Marketing House Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <h2 className="text-lg md:text-xl font-black tracking-[4px]" style={{ color: GOLD }}>
                HK MARKETING HOUSE
              </h2>
            </div>
            <p className="text-gray-500 mt-3 leading-relaxed text-sm">
              Let's Create Something impactful together. <br />feel free to reach out anytime --We are ready to bring your ideas to life.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-5 tracking-[3px] uppercase text-gray-400">Quick Links</h3>
            <div className="space-y-3 text-gray-500 text-sm">
              {["Home", "Services", "Portfolio", "Clients", "Contact"].map((item) => (
                <p
                  key={item}
                  onClick={() =>
                    item === "Home"
                      ? window.scrollTo({ top: 0, behavior: "smooth" })
                      : scrollToSection(`#${item.toLowerCase()}`)
                  }
                  className="hover:text-yellow-400 transition flex items-center gap-2 group cursor-pointer"
                >
                  <span className="w-3 h-px bg-yellow-400/0 group-hover:bg-yellow-400/60 transition-all duration-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold mb-5 tracking-[3px] uppercase text-gray-400">Social Media</h3>
            <div className="space-y-3 text-gray-500 text-sm">
              {[
                { label: "Instagram", href: "https://www.instagram.com/hussain_khan_25/" },
                { label: "YouTube",   href: "https://www.youtube.com/c/KaifKhanHKTV"     },
                { label: "WhatsApp",  href: "https://wa.me/8849770932"                   },
              ].map(({ label, href }) => (
                <a key={label} href={href}>
                  <p className="hover:text-yellow-400 transition flex items-center gap-2 group mb-3">
                    <span className="w-3 h-px bg-yellow-400/0 group-hover:bg-yellow-400/60 transition-all duration-300" />
                    {label}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 mt-10 pt-7 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-gray-600 text-xs">© 2026 HK Marketing House. All rights reserved.</span>
          <div className="flex gap-5 text-xs text-gray-600">
            <a href="/about"          className="hover:text-yellow-400 transition">About Us</a>
            <a href="/terms"          className="hover:text-yellow-400 transition">Terms &amp; Conditions</a>
            <a href="/privacy-policy" className="hover:text-yellow-400 transition">Privacy Policy</a>
          </div>
          <span className="timecode opacity-20 hide-sm">HK MARKETING HOUSE • SURAT</span>
        </div>
      </footer>

      {/* ── WhatsApp float ── */}
      <motion.a
        href="https://wa.me/8849770932"
        target="_blank"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 text-black px-5 py-3 rounded-full font-bold shadow-2xl text-xs md:text-sm tracking-wide"
        style={{ background: GOLD, boxShadow: "0 8px 32px rgba(245,191,3,.25)" }}
      >
        WhatsApp
      </motion.a>
    </main>
  );
}

/* ══════════════════════════════════════════
   VIDEO CARD
══════════════════════════════════════════ */
function VideoCard({ src, poster, title, sub, tag }: {
  src: string; poster: string; title: string; sub: string; tag: string;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnter = () => {
    const v = vidRef.current;
    if (!v) return;
    v.src = src;
    v.load();
    v.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleLeave = () => {
    const v = vidRef.current;
    if (!v) return;
    setIsPlaying(false);
    v.pause();
    v.src = "";
  };

  const handleTouch = () => { isPlaying ? handleLeave() : handleEnter(); };

  return (
    <div
      className="vid-card h-[280px] md:h-[420px]"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouch}
    >
      <video ref={vidRef} poster={poster} muted loop playsInline preload="none" className="w-full h-full" />
      <div className="vid-overlay" />

      <div
        className="play-ring"
        style={{
          opacity: isPlaying ? 0 : 1,
          transform: isPlaying ? "translate(-50%,-50%) scale(1.2)" : "translate(-50%,-50%) scale(1)",
          transition: "opacity .3s, transform .3s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M6 4l10 6-10 6V4z" fill={GOLD} />
        </svg>
      </div>

      <div
        className="play-ring"
        style={{ opacity: isPlaying ? 1 : 0, transform: "translate(-50%,-50%)", transition: "opacity .3s" }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <rect x="4"  y="3" width="4" height="14" rx="1" fill={GOLD} />
          <rect x="12" y="3" width="4" height="14" rx="1" fill={GOLD} />
        </svg>
      </div>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 timecode opacity-35 pointer-events-none">{tag}</div>
      <div className="absolute bottom-0 p-5 md:p-6 pointer-events-none">
        <p className="timecode opacity-55 mb-1">{sub}</p>
        <h3 className="text-lg md:text-2xl font-bold">{title}</h3>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FILM STRIP
══════════════════════════════════════════ */
function FilmStrip({ items, reverse }: { items: string[]; reverse: boolean }) {
  return (
    <div className="film-strip py-1" style={{ background: reverse ? "#050505" : "#0a0a0a" }}>
      <div className="film-strip-track" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {items.map((item, i) => (
          <span key={i} className="film-strip-item">
            <span className="film-strip-hole" />{item}<span className="film-strip-hole" />
          </span>
        ))}
      </div>
    </div>
  );
}
