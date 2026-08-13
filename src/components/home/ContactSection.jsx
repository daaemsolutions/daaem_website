import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const cardIcons = [Phone, Mail, MapPin];
const cardColors = ["#23AA9E", "#EF4136", "#6D6666"];
const cardLines = [
  ["+966 11 222 9220", "+966 59 685 8281"],
  ["info@daaem.com.sa"],
  ["Prince Mohammed Ibn Salman Rd", "Ar Rabi, Office #12", "Riyadh, KSA 11564"],
];

export default function ContactSection() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const ct = t.contact;

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#23AA9E] text-sm font-semibold tracking-wider uppercase">{ct.tag[lang]}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4a4a4a] mt-3 mb-5" style={{ fontFamily: isRtl ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}>
            {ct.title[lang]}
          </h2>
          <div className="w-16 h-1 bg-[#EF4136] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {ct.cards.map((card, index) => {
            const Icon = cardIcons[index];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 text-center hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${cardColors[index]}10` }}>
                  <Icon className="w-7 h-7" style={{ color: cardColors[index] }} />
                </div>
                <h3 className="text-lg font-bold text-[#4a4a4a] mb-4">{card.title[lang]}</h3>
                {cardLines[index].map((line, li) => (
                  <p key={li} className="text-[#6D6666] leading-relaxed" dir="ltr">{line}</p>
                ))}
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}