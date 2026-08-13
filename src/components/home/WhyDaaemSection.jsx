import React from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { TrendingDown, Users, ShieldCheck } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const WHY_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/4f23c994b_generated_image.png";
const pillarIcons = [TrendingDown, Users, ShieldCheck];
const pillarColors = ["#23AA9E", "#EF4136", "#6D6666"];

export default function WhyDaaemSection() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const wh = t.why;
  const { scrollY } = useViewportScroll();

  return (
    <section className="py-24 relative overflow-hidden" style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,255,254,0.5) 100%)",
      backdropFilter: "blur(10px)"
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#23AA9E] text-sm font-semibold tracking-wider uppercase">{wh.tag[lang]}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4a4a4a] mt-3 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {wh.title[lang]}
          </h2>
          <div className="w-16 h-1 bg-[#EF4136] mx-auto rounded-full" />
          <p className="text-[#6D6666] text-base mt-4 max-w-2xl mx-auto">{wh.sub[lang]}</p>
        </motion.div>

        {/* Banner with Parallax */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-14 rounded-3xl overflow-hidden h-52 md:h-64">
          <motion.img 
            src={WHY_IMAGE} 
            alt="team" 
            className="w-full h-full object-cover"
            style={{ y: useTransform(scrollY, [0, 800], [0, 80]) }}
          />
          <div className={`absolute inset-0 bg-gradient-to-l from-[#23AA9E]/70 to-[#23AA9E]/20 flex items-center ${isRtl ? "justify-end" : "justify-start"} px-12`}>
            <div className={isRtl ? "text-right" : "text-left"}>
              <p className="text-white text-3xl md:text-4xl font-bold" style={{ fontFamily: isRtl ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}>{wh.bannerLine1[lang]}</p>
              <p className="text-white text-3xl md:text-4xl font-bold">{wh.bannerLine2[lang]}<span className="text-[#EF4136]"> </span></p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {wh.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            const color = pillarColors[index];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
                className={`relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 group ${isRtl ? "text-right" : "text-left"}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-5xl font-bold opacity-10" style={{ color, fontFamily: "'Montserrat', sans-serif" }}>0{index + 1}</span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#4a4a4a] mb-6">{pillar.title[lang]}</h3>
                <ul className="space-y-4">
                  {pillar.items[lang].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-[#6D6666] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: color }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}