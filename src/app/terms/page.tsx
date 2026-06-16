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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    className="mb-10"
  >
    <div
      className="flex items-center gap-4 mb-4 px-5 py-3 rounded-xl"
      style={{ background: "rgba(245,191,3,0.07)", border: "1px solid rgba(245,191,3,0.18)" }}
    >
      <h3 className="text-base md:text-lg font-black uppercase tracking-widest" style={{ color: GOLD }}>
        {title}
      </h3>
    </div>
    <div
      className="px-5 py-4 rounded-xl text-gray-300 text-sm leading-relaxed space-y-2"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {children}
    </div>
  </motion.div>
);

const Bullet = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
    <span>{text}</span>
  </li>
);

export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-yellow-500/15">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/">
            <span className="text-sm font-black tracking-[3px]" style={{ color: GOLD }}>HK MARKETING HOUSE</span>
          </Link>
          <Link href="/">
            <span className="text-xs uppercase tracking-widest text-gray-400 hover:text-yellow-400 transition">← Back Home</span>
          </Link>
        </div>
      </nav>

      <div className="pt-36 pb-16 px-6 text-center" style={{ borderBottom: "1px solid rgba(245,191,3,0.12)" }}>
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-xs uppercase tracking-[6px] mb-4 font-mono" style={{ color: GOLD }}>Legal Document</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Terms &amp; <span style={{ color: GOLD }}>Conditions</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm font-mono tracking-widest">Effective Date: June 2026</p>
        </motion.div>
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
          className="max-w-2xl mx-auto mt-8 px-6 py-4 rounded-2xl text-sm text-gray-300 leading-relaxed"
          style={{ background: "rgba(245,191,3,0.06)", border: "1px solid rgba(245,191,3,0.2)" }}
        >
          Welcome to HK Marketing House. By accessing and using our website and services, you agree to the following terms and conditions.
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <Section title="Services">
          <p>HK Marketing House provides digital marketing services including social media management, content creation, branding, advertising, website-related marketing solutions, and other digital marketing services.</p>
        </Section>

        <Section title="Client Responsibilities">
          <ul className="space-y-2">
            <Bullet text="Clients must provide accurate information and required materials on time." />
            <Bullet text="Clients are responsible for reviewing and approving content before publication." />
            <Bullet text="HK Marketing House is not responsible for delays caused by incomplete information from clients." />
          </ul>
        </Section>

        <Section title="Payments">
          <ul className="space-y-2">
            <Bullet text="Payments must be made according to the agreed terms." />
            <Bullet text="Late payments may result in service suspension." />
            <Bullet text="All fees paid are non-refundable unless otherwise agreed in writing." />
          </ul>
        </Section>

        <Section title="Intellectual Property">
          <ul className="space-y-2">
            <Bullet text="Content created by HK Marketing House remains our property until full payment is received." />
            <Bullet text="Upon full payment, ownership of approved content may be transferred to the client unless otherwise agreed." />
          </ul>
        </Section>

        <Section title="Limitation of Liability">
          <p>HK Marketing House shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
        </Section>

        <Section title="Changes to Services">
          <p>We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.</p>
        </Section>

        <Section title="Contact Us">
          <p>For any questions regarding these Terms &amp; Conditions, please contact us through our website or official business channels.</p>
        </Section>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center pt-14 border-t border-zinc-900 mt-10"
        >
          <p className="text-gray-600 text-xs tracking-widest uppercase font-mono">© 2026 HK Marketing House. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy-policy">
              <span className="text-xs text-gray-500 hover:text-yellow-400 transition tracking-widest uppercase">Privacy Policy →</span>
            </Link>
          </div>
          <Link href="/">
            <span className="inline-block mt-6 text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition duration-300" style={{ background: GOLD }}>
              Back to Home
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}