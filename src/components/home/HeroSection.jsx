import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const SLIDES = [
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/f603bc613_generated_image.png",
    label: { ar: "ميرشندايزنج", en: "Merchandising" },
    alt: { ar: "فريق احترافي يقدم خدمات الميرشندايزنج في المتاجر", en: "Professional merchandising team organizing retail displays" },
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/ba6901ce0_generated_image.png",
    label: { ar: "تدقيق العمليات", en: "Operation Auditing" },
    alt: { ar: "متابعة جودة العمليات وتقارير الأداء اليومية", en: "Quality audit and daily performance reporting" },
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/8573d5437_generated_image.png",
    label: { ar: "تفعيل العلامة التجارية", en: "Brand Activation" },
    alt: { ar: "حملات تفاعلية وأخذ عينات من المنتجات", en: "Interactive brand activation and product sampling campaigns" },
  },
  {
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/345bf4130_generated_image.png",
    label: { ar: "إدارة الفعاليات", en: "Events Management" },
    alt: { ar: "تنظيم فعاليات ومنصات علامة تجارية احترافية", en: "Professional event setup and brand activation stages" },
  },
];

const LOGO_IMG = (
  <img
    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/a4ac24c3a_daaem_logo.png"
    alt="DAAEM Logo"
    className="w-full h-full object-contain"
  />
);

export default function HeroSection() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => setCurrent(i);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].alt[lang]}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* gradient overlay */}
          <div className={`absolute inset-0 ${isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-white via-white/70 to-white/10`} />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide label badge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
        >
          <span className="bg-[#23AA9E]/90 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full shadow-lg">
            {SLIDES[current].label[lang]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-7 h-2.5 bg-[#23AA9E]" : "w-2.5 h-2.5 bg-[#23AA9E]/30 hover:bg-[#23AA9E]/60"
            }`}
          />
        ))}
      </div>

      {/* Decorative rings */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full border border-[#23AA9E]/10 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full border border-[#EF4136]/8 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 w-full">
        <div className="flex justify-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`max-w-2xl ${isRtl ? "text-right" : "text-left"}`}
          >


            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] leading-tight mb-6"
              style={{ fontFamily: isRtl ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {lang === "ar" ? (
                <>شريكك الموثوق <span className="text-[#23AA9E]">لنمو أعمالك</span><span className="text-[#EF4136]">.</span></>
              ) : (
                <>Your Trusted <span className="text-[#23AA9E]">Business Growth</span><span className="text-[#EF4136]"> Partner.</span></>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-[#6D6666] text-base md:text-lg leading-relaxed mb-10 max-w-lg"
            >
              {t.hero.subtitle[lang]}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4">
              <a href="#services" className="group bg-[#23AA9E] hover:bg-[#1d9389] text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#23AA9E]/30 flex items-center gap-2">
                {t.hero.cta1[lang]}
                <ChevronIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border-2 border-[#23AA9E]/30 hover:border-[#23AA9E] text-[#4a4a4a] px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-[#23AA9E]/5 bg-white/70 backdrop-blur-sm">
                {t.hero.cta2[lang]}
              </a>
            </motion.div>
          </motion.div>


        </div>

        {/* Scroll arrow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="w-5 h-5 text-[#23AA9E]/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}