import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLang } from '@/components/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SERVICE_ORDER = [
  'merchandising',
  'operation_auditing',
  'brand_activation',
  'events_management',
];

const SERVICE_LABELS = {
  merchandising: { ar: 'الميرشندايزنج', en: 'Merchandising' },
  brand_activation: { ar: 'تفعيل العلامة التجارية', en: 'Brand Activation' },
  operation_auditing: { ar: 'تدقيق العمليات', en: 'Operation Auditing' },
  events_management: { ar: 'إدارة الفعاليات', en: 'Events Management' },
};

const SERVICE_COLORS = {
  merchandising: '#23AA9E',
  brand_activation: '#EF4136',
  operation_auditing: '#4A90E2',
  events_management: '#F5A623',
};
// mock data instead of base44
const MOCK_PROJECTS = [
  {
    id: 1,
    serviceType: 'merchandising',
    published: true,
    title: 'Retail Shelf Management',
    titleAr: 'إدارة أرفف المتاجر',
    description:
      'We improved shelf visibility, planogram compliance, and product availability across multiple retail stores.',
    descriptionAr:
      'قمنا بتحسين ظهور المنتجات على الأرفف والالتزام بالمخطط وتوفر المنتجات في عدة متاجر.',
    featuredImage: 'images/2.png',
    images: ['images/3.png', 'images/4.png', 'images/14.png', 'images/16.png'],
  },
  {
    id: 2,
    serviceType: 'operation_auditing',
    published: true,
    title: 'Store Operations Audit',
    titleAr: 'تدقيق عمليات المتاجر',
    description:
      'Our auditing team monitored operational standards, compliance, and execution quality in the field.',
    descriptionAr:
      'قام فريق التدقيق بمتابعة معايير التشغيل والالتزام وجودة التنفيذ في الميدان.',
    featuredImage: 'images/8.png',
    images: ['images/9.png', 'images/11.png', 'images/15.png'],
  },
  {
    id: 3,
    serviceType: 'brand_activation',
    published: true,
    title: 'In-Store Brand Activation',
    titleAr: 'تفعيل العلامة التجارية داخل المتاجر',
    description:
      'We executed brand activation campaigns that increased engagement and customer interaction.',
    descriptionAr:
      'نفذنا حملات لتفعيل العلامة التجارية أدت إلى زيادة التفاعل واهتمام العملاء.',
    featuredImage: 'images/1.png',
    images: ['images/5.png', 'images/6.png', 'images/7.png', 'images/12.png'],
  },
  {
    id: 4,
    serviceType: 'events_management',
    published: true,
    title: 'Corporate Event Execution',
    titleAr: 'تنفيذ الفعاليات المؤسسية',
    description:
      'From planning to on-ground management, we delivered smooth and memorable event experiences.',
    descriptionAr:
      'من التخطيط إلى الإدارة الميدانية قدمنا تجارب فعاليات سلسة ومميزة.',
    featuredImage: 'images/21.png',
    images: ['images/17.png', 'images/18.png', 'images/19.png'],
  },
];

function ServiceSlider({ project, lang }) {
  const [current, setCurrent] = useState(0);
  const allImages = [project.featuredImage, ...(project.images || [])];
  const color = SERVICE_COLORS[project.serviceType];
  const title = lang === 'ar' ? project.titleAr : project.title;
  const description =
    lang === 'ar' ? project.descriptionAr : project.description;
  const isRtl = lang === 'ar';

  const next = () => setCurrent((p) => (p + 1) % allImages.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + allImages.length) % allImages.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Slider */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={allImages[current]}
            alt={title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Service badge */}
        <div
          className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: color }}
        >
          {SERVICE_LABELS[project.serviceType][lang]}
        </div>

        {/* Nav arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2' : 'w-2 h-2 bg-white/50'}`}
                style={
                  i === current ? { backgroundColor: color, height: 8 } : {}
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <h3 className="text-xl font-bold text-[#3a3a3a] mb-2">{title}</h3>
        <p className="text-[#6D6666] text-sm leading-relaxed">{description}</p>
        {project.location && (
          <p className="text-xs text-[#23AA9E] font-semibold mt-3">
            📍 {project.location}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioGallery() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  const projects = MOCK_PROJECTS;
  const sorted = SERVICE_ORDER.map((type) =>
    projects.find((p) => p.serviceType === type),
  ).filter(Boolean);

  return (
    <section
      className={`py-20 px-6 md:px-12 bg-white relative overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#23AA9E] text-sm font-semibold tracking-wider uppercase">
            {lang === 'ar' ? 'معرض أعمالنا' : 'Our Portfolio'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#3a3a3a] mt-3 mb-4"
            style={{
              fontFamily: isRtl
                ? "'Tajawal', sans-serif"
                : "'Montserrat', sans-serif",
            }}
          >
            {lang === 'ar' ? 'مشاريع ناجحة' : 'Successful Projects'}
          </h2>
          <div className="w-16 h-1 bg-[#EF4136] mx-auto rounded-full" />
        </motion.div>

        {/* 4 Sliders Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {sorted.map((project) => (
            <ServiceSlider key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
