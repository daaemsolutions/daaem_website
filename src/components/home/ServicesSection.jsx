import React, { useState } from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { ShoppingCart, ClipboardCheck, Megaphone, CalendarDays } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const icons = [ShoppingCart, ClipboardCheck, Megaphone, CalendarDays];
const colors = ["#23AA9E", "#EF4136", "#23AA9E", "#6D6666"];
const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/dbc9fa3ee_generated_image.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/ba6901ce0_generated_image.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/8573d5437_generated_image.png",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ad2589ec8eb2a3eb57d0dc/345bf4130_generated_image.png",
];

export default function ServicesSection() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const sv = t.services;
  const { scrollY } = useViewportScroll();

  return (
    <section id="services" className="py-24 relative overflow-hidden" style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,255,253,0.5) 100%)",
      backdropFilter: "blur(10px)"
    }}>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#23AA9E] text-sm font-semibold tracking-wider uppercase">{sv.tag[lang]}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4a4a4a] mt-3 mb-5" style={{ fontFamily: isRtl ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}>
            {sv.title[lang]}
          </h2>
          <div className="w-16 h-1 bg-[#EF4136] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sv.list.map((service, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}
                className="bg-white rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group overflow-hidden"
              >
                {/* Image with Parallax */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img 
                    src={images[index]} 
                    alt={service.title[lang]} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
                  <div className="absolute top-4 right-4 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}DD` }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className={`p-8 ${isRtl ? "text-right" : "text-left"}`}>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>{service.title.en}</span>
                  <h3 className="text-xl font-bold text-[#4a4a4a] mt-1 mb-3">{service.title[lang]}</h3>
                  <p className="text-[#6D6666] leading-relaxed mb-5">{service.desc[lang]}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features[lang].map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-[#6D6666]">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}