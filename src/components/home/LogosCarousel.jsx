import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useLang } from "@/components/LanguageContext";

export default function LogosCarousel() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [displayedLogos, setDisplayedLogos] = useState([]);

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => base44.entities.Client.filter({ published: true }, "order", 100),
    initialData: [],
  });

  // Duplicate logos for seamless carousel
  useEffect(() => {
    if (clients.length > 0) {
      setDisplayedLogos([...clients, ...clients]);
    }
  }, [clients]);

  const duration = displayedLogos.length * 3;

  return (
    <section className={`py-16 bg-gradient-to-r from-gray-50 to-white overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#23AA9E] text-sm font-semibold tracking-wider uppercase">
            {lang === "ar" ? "شركاؤنا" : "Our Partners"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3a3a3a] mt-3">
            {lang === "ar"
              ? "نثق بنا أفضل الشركات والعلامات التجارية"
              : "Trusted by Leading Brands & Companies"}
          </h2>
        </motion.div>

        {/* Carousel */}
        {displayedLogos.length > 0 ? (
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{
                x: isRtl ? [0, -(displayedLogos.length * 180)] : [-(displayedLogos.length * 180), 0],
              }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {displayedLogos.map((client, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 w-40 h-32 flex items-center justify-center bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className="max-w-[90%] max-h-[90%] object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient overlays */}
            <div className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-32 h-full bg-gradient-to-r ${isRtl ? "from-white" : "to-white"} pointer-events-none`} />
            <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} w-32 h-full bg-gradient-to-l ${isRtl ? "to-white" : "from-white"} pointer-events-none`} />
          </div>
        ) : (
          <div className="text-center py-12 text-[#6D6666]">
            {lang === "ar" ? "لا توجد عملاء معروضة حالياً" : "No clients to display"}
          </div>
        )}
      </div>
    </section>
  );
}