"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const GOLD = "#F5BF03";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { num: "60K+", label: "Followers"  },
  { num: "10M+", label: "Impressions" },
  { num: "5+",   label: "Years Experience" },
];

const services = [
  "Short Form Video (Reels, Youtube Shorts, TikTok Edit)",
  "Long Form Video (Youtube, Instagram and Facebook Edit)",
  "Graphical Post (Instagram Post, Youtube Thumbnails)",
  "Social Media Marketing (YT, INSTA, FB)",
  "AI Videos",
];

const clients = [
  { name: "Shiv Sagar Food Court",            industry: "Food"         },
  { name: "Roshni Driving Training School",   industry: "Driving"      },
  { name: "Shalimar Dhaba",                   industry: "Dhaba"        },
  { name: "Shasha Construction",              industry: "Construction" },
  { name: "FS Mobile",                        industry: "Tech"         },
  { name: "Swagat Hotel",                     industry: "Hotels"       },
];

const contacts = [
  { label: "Email",        value: "hkproduction736@gmail.com",          href: "mailto:hkproduction736@gmail.com" },
  { label: "Phone",        value: "9727562785",                          href: "https://wa.me/9727562785"                   },
  { label: "Social Media", value: "@hk_production_house",               href: "https://www.instagram.com/hk_production_house" },
  { label: "YouTube",      value: "youtube.com/c/KaifKhanHKTV",         href: "https://www.youtube.com/c/KaifKhanHKTV" },
];

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">

      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .about-ticker { overflow: hidden; border-top: 1px solid rgba(245,191,3,0.1); border-bottom: 1px solid rgba(245,191,3,0.1); background: #0a0a0a }
        .about-track  { display: inline-flex; animation: ticker 24s linear infinite; white-space: nowrap }
        .about-chip   { padding: 14px 40px; font-size: 11px; letter-spacing: 5px; color: rgba(245,191,3,0.55); border-right: 1px solid rgba(245,191,3,0.08); font-family: 'Courier New', monospace; flex-shrink: 0 }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-yellow-500/15">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/">
            <span className="text-sm font-black tracking-[3px]" style={{ color: GOLD }}>
              HK MARKETING HOUSE
            </span>
          </Link>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[4px]">
            {[
              { label: "Home",    href: "/"        },
              { label: "About",   href: "/about"   },
              { label: "Contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <Link key={label} href={href}>
                <span className="hover:text-yellow-400 transition duration-300 relative group">
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/#contact">
            <span
              className="text-black text-xs font-bold px-5 py-2 rounded-full hover:scale-105 transition duration-300"
              style={{ background: GOLD }}
            >
              Book Now
            </span>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden" style={{ borderBottom: "1px solid rgba(245,191,3,0.12)" }}>
        {/* glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(245,191,3,0.07)" }}
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-xs uppercase tracking-[6px] mb-4 font-mono" style={{ color: GOLD }}>
            Creative Production House
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight">
            HK Marketing <span style={{ color: GOLD }}>House</span>
          </h1>
          <p className="text-lg md:text-2xl font-mono tracking-widest mt-3" style={{ color: "rgba(245,191,3,0.6)" }}>
            WHERE CREATIVITY BREATHS
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
          className="flex flex-wrap justify-center gap-6 mt-14"
        >
          {stats.map(({ num, label }) => (
            <div
              key={label}
              className="px-8 py-5 rounded-2xl text-center"
              style={{ background: "rgba(245,191,3,0.07)", border: "1px solid rgba(245,191,3,0.2)" }}
            >
              <p className="text-3xl md:text-4xl font-black" style={{ color: GOLD }}>{num}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1 font-mono">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Ticker ── */}
      <div className="about-ticker py-1">
        <div className="about-track">
          {[...Array(2)].flatMap((_, arrIdx) =>
            ["BRAND SHOOTS", "VIDEO EDITING", "SOCIAL MEDIA", "AI VIDEOS", "CONTENT CREATION", "COMMERCIAL FILMS"].map((w, i) => (
              <span key={`${arrIdx}-${i}-${w}`} className="about-chip">◆ {w}</span>
            ))
          )}
        </div>
      </div>

      {/* ── Who We Are ── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* Logo */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full blur-[80px] opacity-25"
                style={{ background: "radial-gradient(circle, #F5BF03 0%, #ea6400 50%, transparent 80%)" }}
              />
              <img
                src="/logo.png"
                alt="HK Marketing House"
                className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(245,191,3,0.5)]"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs font-mono" style={{ color: GOLD }}>Who We Are</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6">
              Welcome to <span style={{ color: GOLD }}>HK Marketing House</span>
            </h2>
            <div
              className="text-gray-300 text-sm md:text-base leading-relaxed px-5 py-4 rounded-2xl"
              style={{ background: "rgba(245,191,3,0.05)", border: "1px solid rgba(245,191,3,0.15)" }}
            >
              HK Marketing House empowers businesses with creative branding, social media management,
              content creation, and digital marketing strategies designed to boost visibility, engagement,
              and growth.
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-5">
              Looking to promote your business and build a strong online presence? We help brands grow
              through commercial shoots, video editing, social media management, and creative content solutions.
            </p>
            <Link href="/#contact">
              <span
                className="inline-flex items-center gap-2 mt-8 text-black px-8 py-4 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition duration-300"
                style={{ background: GOLD }}
              >
                Get In Touch
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What We Provide ── */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs font-mono" style={{ color: GOLD }}>Services</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase">
              What We <span style={{ color: GOLD }}>Provide</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {services.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.08}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group cursor-default"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(245,191,3,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,191,3,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded shrink-0"
                  style={{ color: "#000", background: GOLD }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition">{item}</span>
                <span className="ml-auto text-yellow-400 opacity-0 group-hover:opacity-100 transition shrink-0">→</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Clients ── */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs font-mono" style={{ color: GOLD }}>Clients</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase">
              Our <span style={{ color: GOLD }}>Clients</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">Trusted by leading brands across industries.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clients.map(({ name, industry }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.08}
                whileHover={{ y: -4 }}
                className="px-5 py-5 rounded-2xl text-center transition-all duration-300"
                style={{ background: "rgba(245,191,3,0.05)", border: "1px solid rgba(245,191,3,0.15)" }}
              >
                <p className="font-bold text-sm md:text-base text-white">{name}</p>
                <p className="text-xs font-mono tracking-widest mt-1" style={{ color: "rgba(245,191,3,0.55)" }}>
                  {industry.toUpperCase()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Project ── */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs font-mono" style={{ color: GOLD }}>Portfolio</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">
              Our <span style={{ color: GOLD }}>Project</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              View our complete portfolio of brand shoots, commercial films, reels, and social media content.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1DtDVaEhLY6XHCoSdCtu0h4y_tHEuslqQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="inline-flex items-center gap-3 text-black px-8 py-4 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition duration-300"
                style={{ background: GOLD }}
              >
                View Full Portfolio
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Get In Touch ── */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
              <p className="uppercase tracking-[6px] text-xs font-mono" style={{ color: GOLD }}>Contact</p>
              <div className="h-px w-8" style={{ background: "rgba(245,191,3,.4)" }} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase">
              Get In <span style={{ color: GOLD }}>Touch</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map(({ label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.1}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 px-5 py-5 rounded-2xl transition-all duration-300 group"
                style={{ background: "rgba(245,191,3,0.05)", border: "1px solid rgba(245,191,3,0.15)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: GOLD }}
                >
                  {label === "Email"        && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
                  {label === "Phone"        && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12c-.96-2.71-1.43-5.58-1.08-8.63A2 2 0 0 1 6.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L10.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                  {label === "Social Media" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#000"/></svg>}
                  {label === "YouTube"      && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000" stroke="none"/></svg>}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono mb-0.5" style={{ color: GOLD }}>{label}</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thank You ── */}
      <section className="py-24 px-6 bg-zinc-950 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(245,191,3,0.06) 0%, transparent 70%)" }}
        />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10">
          <h2
            className="text-6xl md:text-9xl font-black uppercase leading-none mb-8"
            style={{ WebkitTextStroke: "1px rgba(245,191,3,0.3)", color: "transparent" }}
          >
            THANK YOU
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Thank you for your time and consideration.<br />
            Let&apos;s create something impactful together.<br />
            <span style={{ color: GOLD }}>Feel free to reach out anytime — we are ready to bring your ideas to life.</span>
          </p>
          <Link href="/#contact">
            <span
              className="inline-flex items-center gap-2 mt-10 text-black px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition duration-300"
              style={{ background: GOLD }}
            >
              Start a Project →
            </span>
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black border-t border-yellow-500/10 py-8 px-6 text-center">
        <p className="text-gray-600 text-xs tracking-widest uppercase font-mono">
          © 2026 HK Marketing House. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-3 text-xs text-gray-600">
          <Link href="/terms"><span className="hover:text-yellow-400 transition">Terms &amp; Conditions</span></Link>
          <Link href="/privacy-policy"><span className="hover:text-yellow-400 transition">Privacy Policy</span></Link>
        </div>
      </footer>

    </main>
  );
}