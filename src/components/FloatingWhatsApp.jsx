import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/components/LanguageContext";

export default function FloatingWhatsApp() {
  const { lang } = useLang();
  const isRtl = lang === "ar";

  const whatsappNumber = "966112229220"; // +966 11 222 9220
  const whatsappMessage = isRtl
    ? "مرحباً، أود الاستفسار عن خدماتكم"
    : "Hello, I would like to know more about your services";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-6 ${isRtl ? "left-6" : "right-6"} z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl cursor-pointer group`}
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)"
      }}
    >
      {/* Pulse animation ring */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(37, 211, 102, 0.2)",
          border: "2px solid rgba(37, 211, 102, 0.3)"
        }}
      />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute ${isRtl ? "left-16" : "right-16"} bg-gray-800 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none shadow-lg`}
      >
        {isRtl ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
      </motion.div>
    </motion.a>
  );
}
