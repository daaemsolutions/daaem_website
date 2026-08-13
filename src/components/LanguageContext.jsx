import React, { createContext, useContext, useState } from "react";

export const LanguageContext = createContext({ lang: "ar", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// All site copy
export const t = {
  nav: {
    home:     { ar: "الرئيسية",   en: "Home" },
    about:    { ar: "من نحن",      en: "About Us" },
    services: { ar: "خدماتنا",    en: "Services" },
    contact:  { ar: "تواصل معنا", en: "Contact" },
  },
  hero: {
    badge:    { ar: "شريكك في النجاح منذ 2015", en: "Your Trusted Partner Since 2015" },
    title:    { ar: "شريكك الموثوق لنمو أعمالك", en: "Your Trusted Business Growth Partner." },
    subtitle: { ar: "نقدم خدمات ميرشندايزنج وتفعيل العلامات التجارية بأعلى معايير الجودة والاحترافية في جميع أنحاء المملكة العربية السعودية.", en: "Exceptional merchandising & brand activation services delivered across the Kingdom of Saudi Arabia with world-class quality." },
    cta1:     { ar: "اكتشف خدماتنا", en: "Our Services" },
    cta2:     { ar: "تواصل معنا",    en: "Contact Us" },
  },
  stats: [
    { ar: "نقطة بيع",            en: "Points of Sale" },
    { ar: "تغطية السوق السعودي", en: "KSA Market Coverage" },
    { ar: "دقيقة للاستجابة",     en: "Minutes Response Time" },
    { ar: "سنوات خبرة",          en: "Years of Excellence" },
  ],
  about: {
    tag:           { ar: "من نحن",              en: "About Us" },
    companyName:   { ar: "شركة داعم المطورة",   en: "DAAEM Al Motawerah CO" },
    body:          { ar: "شركة سعودية سريعة النمو تأسست في 2015 على يد مهندسين سعوديين شباب، متخصصة في تقديم خدمات الميرشندايزنج وتفعيل العلامات التجارية بأعلى معايير الجودة.", en: "A rapidly growing Saudi company established in June 2015 by young Saudi engineers. Our expertise in the business field coupled with our youthful enthusiasm is the core of our strength." },
    yearsLabel:    { ar: "سنوات تميز",           en: "Years of Excellence" },
    visionTitle:   { ar: "رؤيتنا",               en: "Our Vision" },
    visionBody:    { ar: "أن نصبح الشريك المفضل في خدمات الميرشندايزنج وتفعيل العلامات التجارية للشركات التي تسعى للتميز والنمو.", en: "To become the go-to merchandising and brand activations partner for businesses who seek brand excellence and growth." },
    missionTitle:  { ar: "مهمتنا",               en: "Our Mission" },
    missionBody:   { ar: "تقديم خدمات ميرشندايزنج وتفعيل علامة تجارية عالية الجودة من التخطيط والتنفيذ وحتى إعداد التقارير من خلال التقنية المخصصة والفرق المحترفة.", en: "To provide high-quality merchandising and brand activations services from planning, execution to reporting through customized technology, professional teams, and excellent customer relations." },
    philosophyTitle: { ar: "فلسفتنا", en: "Our Philosophy" },
    values: [
      { title: { ar: "الدقة",              en: "Accuracy" },        desc: { ar: "نعتمد على البيانات في التخطيط والتنفيذ",       en: "Data-driven planning and execution" } },
      { title: { ar: "النزاهة",            en: "Integrity" },       desc: { ar: "نعمل بمبادئ تجارية صلبة وبصدق وإخلاص",        en: "Solid business principles, honesty and sincerity" } },
      { title: { ar: "الشفافية",           en: "Transparency" },    desc: { ar: "نعتبر عملاءنا شركاء ونشارك جميع البيانات",     en: "We consider clients as partners and share all data" } },
      { title: { ar: "التركيز على العميل", en: "Customer Centric" }, desc: { ar: "نخصص الحلول وفقاً لاحتياجات كل عميل",          en: "Customized packages and services per client needs" } },
    ],
  },
  services: {
    tag:   { ar: "ما نقدمه",           en: "What We Do" },
    title: { ar: "خدماتنا المتكاملة",  en: "Our Integrated Services" },
    list: [
      {
        title:    { ar: "الميرشندايزنج",          en: "Merchandising" },
        desc:     { ar: "فريق محترف ومدرب يقدم خدمات ميرشندايزنج شاملة تشمل الترتيب والتنظيم وإعادة التعبئة ومتابعة الأسعار والمخزون.", en: "A skilled & prompt team delivering 360° merchandising — from planogram execution to stock replenishment." },
        features: { ar: ["فريق ماهر ومدرب", "استجابة سريعة", "تطبيق Digital Eye", "تقارير يومية"], en: ["Skilled Team", "Prompt Action", "Digital Eye App", "Daily Reports"] },
      },
      {
        title:    { ar: "تدقيق العمليات",          en: "Operation Auditing" },
        desc:     { ar: "متابعة يومية ومؤشرات أداء مخصصة وفقاً لأهداف العميل التجارية لضمان أعلى مستويات التنفيذ.", en: "Daily tracking & KPIs tailored to your business objectives with full transparency and live data sharing." },
        features: { ar: ["متابعة يومية", "مؤشرات أداء حسب العميل", "تقارير أسبوعية وشهرية", "لوحة تحكم مباشرة"], en: ["Daily Tracking", "Custom KPIs", "Weekly Reports", "Live Dashboard"] },
      },
      {
        title:    { ar: "تفعيل العلامة التجارية",  en: "Brand Activation" },
        desc:     { ar: "نبني علاقات مستدامة مع المستهلكين من خلال تجارب تفاعلية وحملات تذوق وأخذ عينات احترافية.", en: "We craft immersive brand experiences — sampling, tasting, and consumer engagement that converts." },
        features: { ar: ["حملات تفاعلية", "أخذ عينات وتذوق", "تقارير مبيعات", "تعزيز العلامة التجارية"], en: ["Brand Engagement", "Sampling & Tasting", "Sales Reports", "Consumer Data"] },
      },
      {
        title:    { ar: "إدارة الفعاليات",          en: "Events Management" },
        desc:     { ar: "تركيب العلامة التجارية في مواقع الفعاليات وتصنيع وتركيب المنصات والشاشات وتنظيم العروض.", en: "Full-service event branding — from venue setup and stage manufacturing to screens and live shows." },
        features: { ar: ["تنظيم شامل", "تصنيع المنصات", "شاشات وعروض", "إدارة ميدانية"], en: ["Venue Branding", "Stage Setup", "Screen & Shows", "End-to-End"] },
      },
    ],
  },
  why: {
    tag:         { ar: "المزايا",      en: "Why Choose Us" },
    title:       { ar: "لماذا DAAEM؟", en: "Why DAAEM?" },
    sub:         { ar: "نقوم بكل شيء. بفريقنا المحترف ندعمك لتحقيق التميز التشغيلي بأقل تكلفة.", en: "We do it all. With our professional team, we help you attain Operational Excellence at lower cost." },
    bannerLine1: { ar: "نجاحك",        en: "Your Success," },
    bannerLine2: { ar: "هو مهمتنا",    en: "Our Mission." },
    pillars: [
      { title: { ar: "نختصر عليك", en: "We Reduce" },  items: { ar: ["عمليات التوظيف", "شؤون الموظفين والنقل", "إدارة الفرق", "الالتزامات الحكومية والسعودة"], en: ["Recruitment transactions", "Employee relations & transport", "Team management", "Governmental obligations (Saudization)"] } },
      { title: { ar: "نوفر لك",    en: "We Provide" }, items: { ar: ["فريق محترف ومدرب", "إدارة متكاملة للفرق", "خدمة عالية الجودة", "تقنية مخصصة"], en: ["Professional trained team", "Integrated team management", "High quality service", "Customized technology"] } },
      { title: { ar: "نضمن لك",    en: "We Ensure" },  items: { ar: ["علاقات إنسانية مميزة", "تفاعل المستهلكين", "رضا العملاء", "شفافية وبيانات مباشرة"], en: ["Human relations", "Consumer engagement", "Customer satisfaction", "Transparency & live data sharing"] } },
    ],
  },
  tech: {
    tag:   { ar: "Digital Eye - DE",    en: "Digital Eye - DE" },
    title: { ar: "تقنيتنا المتقدمة",    en: "Our Advanced Technology" },
    sub:   { ar: "الحل الأمثل لمتابعة أعمالك وتنفيذ عمليات التجزئة في الميدان.", en: "The best solution to track your business & retail execution in the field." },
    items: [
      { title: { ar: "تطبيق الجوال",         en: "Mobile App" },       desc: { ar: "جمع البيانات من الميدان في الوقت الفعلي وإنشاء تقارير PDF يومية لكل نقطة بيع.", en: "Collect data from the field in real time and generate daily PDF reports for each point of sale." } },
      { title: { ar: "لوحة التحكم",           en: "Web Dashboard" },    desc: { ar: "لوحة تحكم متكاملة تشمل التقارير الشاملة وإدارة مهام الفريق ومتابعة الأداء.", en: "Integrated dashboard covering comprehensive reports, team task management and performance tracking." } },
      { title: { ar: "التقارير الإلكترونية", en: "E-Reports" },         desc: { ar: "تقارير يومية وأسبوعية وشهرية شاملة تساعدك في اتخاذ القرارات الصحيحة.", en: "Daily, weekly and monthly comprehensive reports to help you make the right decisions." } },
    ],
  },
  contact: {
    tag:   { ar: "تواصل معنا",            en: "Contact Us" },
    title: { ar: "لنتحدث عن نجاح أعمالك", en: "Let's Talk About Your Success" },
    cards: [
      { title: { ar: "اتصل بنا", en: "Call Us" } },
      { title: { ar: "راسلنا",   en: "Email Us" } },
      { title: { ar: "زرنا",     en: "Visit Us" } },
    ],
  },
  footer: {
    tagline: { ar: "ادعم أعمالك", en: "Support Your Business" },
    rights:  { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
    links: [
      { ar: "من نحن",      en: "About Us", href: "#about" },
      { ar: "خدماتنا",    en: "Services", href: "#services" },
      { ar: "تواصل معنا", en: "Contact",  href: "#contact" },
    ],
  },
};