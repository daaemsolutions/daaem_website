import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Monitor, FileText } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const icons = [Smartphone, Monitor, FileText];

export default function TechnologySection() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const tc = t.tech;

  return (
    <section className="py-40 md:py-48 relative overflow-hidden" id="technology" style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,250,248,0.5) 100%)",
      backdropFilter: "blur(10px)"
    }}>
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-[#23AA9E] text-xs font-bold tracking-widest uppercase">{tc.tag[lang]}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#4a4a4a] mt-4 mb-6" style={{ fontFamily: isRtl ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}>
            {tc.title[lang]}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#23AA9E] to-[#EF4136] mx-auto rounded-full" />
          <p className="text-[#6D6666] text-lg mt-8 max-w-2xl mx-auto leading-relaxed">{tc.sub[lang]}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {tc.items.map((item, index) => {
            const Icon = icons[index];
            const colors = ["#23AA9E", "#EF4136", "#6D6666"];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`relative group rounded-3xl p-10 md:p-12 transition-all duration-700 hover:shadow-2xl border-2 ${isRtl ? "text-right" : "text-left"}`}
                style={{ borderColor: `${colors[index]}30`, background: `linear-gradient(135deg, ${colors[index]}15, white)` }}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-700" style={{ background: colors[index] }} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: `${colors[index]}25`, color: colors[index] }}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#4a4a4a] mb-5">{item.title[lang]}</h3>
                  <p className="text-[#6D6666] leading-relaxed text-base">{item.desc[lang]}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}