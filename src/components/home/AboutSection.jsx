import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, CheckCircle } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const ABOUT_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/a1eb6c751_generated_image.png";

export default function AboutSection() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const ab = t.about;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#23AA9E] text-sm font-semibold tracking-wider uppercase">{ab.tag[lang]}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4a4a4a] mt-3 mb-2" style={{ fontFamily: lang === "ar" ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}>
            {lang === "ar" ? "شركة داعم المطورة" : "DAAEM Al Motawerah CO"}
          </h2>
          <p className="text-[#6D6666] text-base mb-4">{ab.companyName[lang]}</p>
          <div className="w-16 h-1 bg-[#EF4136] mx-auto rounded-full" />
        </motion.div>

        {/* Image + text */}
        <div className={`grid lg:grid-cols-2 gap-14 items-center mb-20 ${isRtl ? "" : "direction-ltr"}`}>
          <motion.div initial={{ opacity: 0, x: isRtl ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-1 lg:order-none">
            <img src={ABOUT_IMAGE} alt="فريق داعم المطورة المتخصص في الميرشندايزنج والتفعيل / DAAEM Team specialized in merchandising and activation" loading="lazy" className="w-full h-80 object-cover rounded-3xl shadow-2xl" />
            <div className={`absolute -bottom-6 ${isRtl ? "-left-6" : "-right-6"} bg-[#23AA9E] text-white rounded-2xl p-5 shadow-xl`}>
              <p className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>+10</p>
              <p className="text-sm opacity-90">{ab.yearsLabel[lang]}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: isRtl ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={isRtl ? "text-right" : "text-left"}>
            <h3 className="text-2xl font-bold text-[#4a4a4a] mb-4">{ab.companyName[lang]}</h3>
            <p className="text-[#6D6666] leading-relaxed text-lg">{ab.body[lang]}</p>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {[
            { icon: Eye, title: ab.visionTitle[lang], body: ab.visionBody[lang], color: "#23AA9E" },
            { icon: Target, title: ab.missionTitle[lang], body: ab.missionBody[lang], color: "#EF4136" },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.8 }}
              className={`rounded-3xl p-14 relative overflow-hidden hover:shadow-3xl transition-all duration-700 border-2 ${isRtl ? "text-right" : "text-left"}`}
              style={{ borderColor: card.color, background: `linear-gradient(135deg, ${card.color}12, white)` }}
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-5" style={{ background: card.color }} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8" style={{ backgroundColor: card.color, color: "white" }}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-[#4a4a4a] mb-5">{card.title}</h3>
                <p className="text-[#6D6666] leading-relaxed text-lg">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy & Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[#4a4a4a] mb-4">{ab.philosophyTitle[lang]}</h3>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#23AA9E] to-[#EF4136] mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {ab.values.map((v, i) => {
            const colors = ["#23AA9E","#EF4136","#6D6666","#23AA9E"];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                className={`rounded-3xl p-10 border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 ${isRtl ? "text-right" : "text-center"}`}
                style={{ borderColor: colors[i], background: `linear-gradient(135deg, ${colors[i]}15, white)` }}
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ backgroundColor: colors[i], color: "white" }}>
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#4a4a4a] mb-4 text-xl">{v.title[lang]}</h4>
                <p className="text-[#6D6666] text-sm leading-relaxed">{v.desc[lang]}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}