import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

const SERVICE_COLORS = {
  merchandising: "#23AA9E",
  brand_activation: "#EF4136",
  operation_auditing: "#4A90E2",
  events_management: "#F5A623",
};

const SERVICE_LABELS = {
  merchandising: { ar: "ميرشندايزنج", en: "Merchandising" },
  brand_activation: { ar: "تفعيل العلامة التجارية", en: "Brand Activation" },
  operation_auditing: { ar: "تدقيق العمليات", en: "Operation Auditing" },
  events_management: { ar: "إدارة الفعاليات", en: "Events Management" },
};

export default function PortfolioCard({ project, index }) {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [project.featuredImage, ...(project.images || [])];
  const currentImage = allImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const title = lang === "ar" ? project.titleAr : project.title;
  const description = lang === "ar" ? project.descriptionAr : project.description;
  const details = lang === "ar" ? project.detailsAr : project.details;
  const serviceLabel = SERVICE_LABELS[project.serviceType][lang];
  const serviceColor = SERVICE_COLORS[project.serviceType];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group"
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-gray-200">
            <img
              src={project.featuredImage}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Service Badge */}
            <div
              className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: serviceColor }}
            >
              {serviceLabel}
            </div>
            {/* Image Count */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                {currentImageIndex + 1}/{allImages.length}
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`p-6 ${isRtl ? "text-right" : "text-left"}`}>
            <h3 className="text-xl font-bold text-[#3a3a3a] mb-2 line-clamp-2">
              {title}
            </h3>

            <p className="text-[#6D6666] text-sm mb-4 line-clamp-2">
              {description}
            </p>

            {/* Info */}
            <div className={`flex flex-wrap gap-4 text-xs text-[#6D6666] mb-4 ${isRtl ? "justify-end" : ""}`}>
              {project.client && <span>{project.client}</span>}
              {project.year && <span>{project.year}</span>}
              {project.location && <span>{project.location}</span>}
            </div>

            {/* Button */}
            <button
              onClick={() => setShowModal(true)}
              className="text-[#23AA9E] font-semibold text-sm hover:text-[#1d9389] transition-colors inline-flex items-center gap-1"
            >
              {lang === "ar" ? "اعرض التفاصيل" : "View Details"}
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Image Gallery */}
            <div className="relative bg-black h-96">
              <img src={currentImage} alt={title} className="w-full h-full object-cover" />

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors"
                  >
                    {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors"
                  >
                    {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Details */}
            <div className={`p-8 ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-[#3a3a3a]">{title}</h2>
                <div style={{ backgroundColor: serviceColor }} className="text-white text-sm font-bold px-4 py-2 rounded-full">
                  {serviceLabel}
                </div>
              </div>

              <p className="text-[#6D6666] text-base mb-6">{description}</p>

              {/* Project Info */}
              <div className={`grid md:grid-cols-2 gap-6 mb-6 py-6 border-y border-gray-200 ${isRtl ? "text-right" : ""}`}>
                {project.client && (
                  <div>
                    <p className="text-sm text-[#6D6666] font-semibold mb-1">
                      {lang === "ar" ? "العميل" : "Client"}
                    </p>
                    <p className="text-[#3a3a3a] font-semibold">{project.client}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="text-sm text-[#6D6666] font-semibold mb-1">
                      {lang === "ar" ? "السنة" : "Year"}
                    </p>
                    <p className="text-[#3a3a3a] font-semibold">{project.year}</p>
                  </div>
                )}
                {project.location && (
                  <div>
                    <p className="text-sm text-[#6D6666] font-semibold mb-1">
                      {lang === "ar" ? "الموقع" : "Location"}
                    </p>
                    <p className="text-[#3a3a3a] font-semibold">{project.location}</p>
                  </div>
                )}
              </div>

              {/* Detailed Description */}
              {details && (
                <div>
                  <p className="text-sm text-[#6D6666] font-semibold mb-3">
                    {lang === "ar" ? "التفاصيل" : "Project Details"}
                  </p>
                  <p className="text-[#6D6666] leading-relaxed whitespace-pre-wrap">{details}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}