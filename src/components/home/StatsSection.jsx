import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Store, Clock, Users } from "lucide-react";
import { useLang, t } from "@/components/LanguageContext";

const statsMeta = [
  { icon: Store, value: 1200, suffix: "+", color: "#23AA9E" },
  { icon: MapPin, value: 87,   suffix: "%", color: "#EF4136" },
  { icon: Clock, value: 180,  suffix: "",  color: "#23AA9E" },
  { icon: Users, value: 10,   suffix: "+", color: "#6D6666" },
];

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (2000 / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) { setCount(value); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  const { lang } = useLang();
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsMeta.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${stat.color}10` }}>
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: stat.color, fontFamily: "'Montserrat', sans-serif" }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#6D6666] text-sm font-medium">{t.stats[index][lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}