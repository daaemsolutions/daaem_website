import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const LogoMark = ({ size = 48 }) => (
  <img
    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/3c9ed671c_daaem_logo_transparent.png"
    alt="DAAEM Logo"
    width={size}
    height={size}
    style={{ width: size, height: size, objectFit: "contain" }}
  />
);

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home[lang],     href: "#" },
    { label: t.nav.about[lang],    href: "#about" },
    { label: t.nav.services[lang], href: "#services" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5" : "bg-transparent"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3">
              <LogoMark size={80} />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled ? "text-[#4a4a4a] hover:text-[#23AA9E]" : "text-[#4a4a4a]/80 hover:text-[#23AA9E]"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* Language Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setLang("ar")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    lang === "ar" ? "bg-[#23AA9E] text-white shadow-sm" : "text-[#6D6666] hover:text-[#4a4a4a]"
                  }`}
                >
                  عربي
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    lang === "en" ? "bg-[#23AA9E] text-white shadow-sm" : "text-[#6D6666] hover:text-[#4a4a4a]"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  EN
                </button>
              </div>

              <a
                href="#contact"
                className="bg-[#23AA9E] hover:bg-[#1d9389] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#23AA9E]/25"
              >
                {t.nav.contact[lang]}
              </a>
            </div>

            {/* Mobile: lang toggle + burger */}
            <div className="md:hidden flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                <button onClick={() => setLang("ar")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${lang === "ar" ? "bg-[#23AA9E] text-white" : "text-[#6D6666]"}`}>عربي</button>
                <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${lang === "en" ? "bg-[#23AA9E] text-white" : "text-[#6D6666]"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>EN</button>
              </div>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-[#4a4a4a]">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-semibold text-[#4a4a4a] hover:text-[#23AA9E] transition-colors py-3 border-b border-gray-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-[#23AA9E] text-white text-center px-8 py-4 rounded-xl font-semibold text-lg mt-4"
              >
                {t.nav.contact[lang]}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}