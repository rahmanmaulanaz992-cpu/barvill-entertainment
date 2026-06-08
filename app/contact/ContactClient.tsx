"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, type Variants } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: "easeOut" },
  },
};

const itemBlurFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1.8, ease: "easeOut" },
  },
};

export default function ContactClient() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxScrollY = useSpring(scrollY, { damping: 45, stiffness: 120, mass: 0.5 });
  
  const heroY = useTransform(parallaxScrollY, [0, 800], [0, 150]);
  const heroOpacity = useTransform(parallaxScrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(parallaxScrollY, [0, 500], [1, 0.95]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = new URLSearchParams();
    // TODO: Ensure the "entry.XXXXX" strings below match the latest IDs from your pre-filled link
    data.append("entry.1088551405", (formData.get("jenis-pengajuan") as string) || ""); // Submission Type
    data.append("entry.1761246371", (formData.get("nama-lengkap") as string) || "");    // Full Name
    data.append("entry.1839899694", (formData.get("email") as string) || "");           // Email
    data.append("entry.873588706", (formData.get("nama-artist") as string) || "");      // Artist Name
    data.append("entry.1296970371", (formData.get("instagram") as string) || "");       // Instagram
    data.append("entry.255034638", (formData.get("link-demo") as string) || "");        // Demo Link
    data.append("entry.1931810429", (formData.get("negara-domisili") as string) || ""); // Country / Domicile
    data.append("entry.802832388", (formData.get("pesan") as string) || "");            // Message

    try {
      // Display data to be sent in the browser console for easier debugging
      console.log("Sending data to Google Form:", Object.fromEntries(data.entries()));

      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSca4Rv0HmT3qEd4uF-TdrOvkHP7MKLWb10sRLzHFaODf9_Tgw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data.toString(),
        }
      );
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative w-full bg-black text-white flex flex-col overflow-x-hidden pt-24 md:pt-0">
      
      {/* FAKE WEBGL AMBIENT BACKGROUND */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 mix-blend-screen" aria-hidden="true">
        <motion.div
          animate={prefersReducedMotion ? { opacity: 0.03 } : { rotate: [0, 5, -5, 0], scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-[80px] md:blur-[150px] origin-center will-change-transform will-change-opacity"
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-6 z-10">
        <motion.div 
          style={{ y: prefersReducedMotion ? 0 : heroY, opacity: heroOpacity, scale: prefersReducedMotion ? 1 : heroScale }}
          className="relative flex flex-col items-center w-full max-w-4xl"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-center text-center"
          >
            <motion.div variants={itemFadeUpVariants} className="mb-6">
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block cursor-default">
                Transmission
              </span>
            </motion.div>

            <motion.h1
              variants={itemBlurFadeUpVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] uppercase leading-tight mb-12"
            >
              CONTACT
              <span className="block text-xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-[0.3em] mt-3 md:mt-5">
                BARVILL
              </span>
            </motion.h1>

            <motion.div variants={itemFadeUpVariants} className="space-y-8 text-white/60 font-light tracking-widest text-sm md:text-base">
              <p className="italic">&ldquo;We are always open to new frequencies.&rdquo;</p>
              
              <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 uppercase text-[10px] md:text-xs tracking-[0.3em] text-white/80">
                <li>Talent</li>
                <li className="w-1 h-1 bg-white/30 rounded-full" />
                <li>Collaborator</li>
                <li className="w-1 h-1 bg-white/30 rounded-full" />
                <li>Partner</li>
                <li className="w-1 h-1 bg-white/30 rounded-full" />
                <li>Listener</li>
              </ul>
              
              <p className="max-w-md mx-auto leading-relaxed text-xs md:text-sm text-white/50">
                If you have something to share,<br/>we are ready to listen.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* --- SCROLL CUE INDICATOR --- */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none"
        >
          <motion.span 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[8px] md:text-[9px] tracking-[0.5em] text-white/50 uppercase block"
          >
            Scroll
          </motion.span>
          <div className="w-px h-12 md:h-16 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-[50%] bg-linear-to-b from-transparent via-white/80 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-24 md:py-32 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-3xl flex flex-col gap-16 md:gap-24"
        >
          {/* Title & Desc */}
          <div className="text-center flex flex-col items-center gap-6">
            <motion.div variants={itemFadeUpVariants}>
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase block">
                Initiate
              </span>
            </motion.div>
            
            <TextReveal 
              text="START SUBMISSION" 
              as="h2" 
              className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.25em] uppercase" 
            />
            
            <motion.div variants={itemFadeUpVariants} className="w-12 md:w-20 h-px bg-white/30 my-4" />
            
            <motion.p variants={itemFadeUpVariants} className="text-sm md:text-base text-white/50 font-light tracking-wider max-w-lg leading-relaxed">
              Select submission type and tell us how Barvill can help you.
            </motion.p>
          </div>

          {/* Form */}
          <motion.form variants={itemFadeUpVariants} onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">
            
            {/* Row 1: Jenis Pengajuan */}
            <div className="flex flex-col gap-3 group">
              <label htmlFor="jenis-pengajuan" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                Submission Type
              </label>
              <div className="relative">
                <select 
                  id="jenis-pengajuan" 
                  name="jenis-pengajuan"
                  defaultValue=""
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 appearance-none rounded-none cursor-pointer"
                >
                  <option value="" disabled className="bg-neutral-900 text-white/50">Select submission type</option>
                  <option value="Calon Talent" className="bg-neutral-900">Prospective Talent</option>
                  <option value="Talent" className="bg-neutral-900">Talent</option>
                  <option value="Partnership" className="bg-neutral-900">Partnership</option>
                  <option value="Sponsor" className="bg-neutral-900">Sponsor</option>
                  <option value="Menjadi Staff" className="bg-neutral-900">Become a Staff</option>
                  <option value="Keluhan & Masukan" className="bg-neutral-900">Complaints & Feedback</option>
                  <option value="Lainnya" className="bg-neutral-900">Others</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pb-4 pointer-events-none text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 2: Nama Lengkap & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-3 group">
                <label htmlFor="nama-lengkap" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="nama-lengkap" 
                  name="nama-lengkap" 
                  required
                  placeholder="Enter your full name"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 rounded-none placeholder-white/20"
                />
              </div>

              <div className="flex flex-col gap-3 group">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder="alamat@email.com"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 rounded-none placeholder-white/20"
                />
              </div>
            </div>

            {/* Row 3: Nama Artist & Instagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-3 group">
                <label htmlFor="nama-artist" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                  Artist Name <span className="text-white/20 tracking-normal capitalize ml-1">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  id="nama-artist" 
                  name="nama-artist" 
                  placeholder="Stage name / moniker"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 rounded-none placeholder-white/20"
                />
              </div>

              <div className="flex flex-col gap-3 group">
                <label htmlFor="instagram" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                  Instagram <span className="text-white/20 tracking-normal capitalize ml-1">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  id="instagram" 
                  name="instagram" 
                  placeholder="@username"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 rounded-none placeholder-white/20"
                />
              </div>
            </div>

            {/* Row 4: Link Demo & Negara / Domisili */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-3 group">
                <label htmlFor="link-demo" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                  Demo Link <span className="text-white/20 tracking-normal capitalize ml-1">(Optional)</span>
                </label>
                <input 
                  type="url" 
                  id="link-demo" 
                  name="link-demo" 
                  placeholder="SoundCloud, Drive, YouTube, dll."
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 rounded-none placeholder-white/20"
                />
              </div>

              <div className="flex flex-col gap-3 group">
                <label htmlFor="negara-domisili" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                  Country / Domicile
                </label>
                <div className="relative">
                  <select 
                    id="negara-domisili" 
                    name="negara-domisili"
                    defaultValue=""
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 appearance-none rounded-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-neutral-900 text-white/50">Select country of domicile</option>
                    <option value="Indonesia" className="bg-neutral-900">Indonesia</option>
                    <option value="Malaysia" className="bg-neutral-900">Malaysia</option>
                    <option value="Singapura" className="bg-neutral-900">Singapore</option>
                    <option value="Brunei Darussalam" className="bg-neutral-900">Brunei Darussalam</option>
                    <option value="Filipina" className="bg-neutral-900">Philippines</option>
                    <option value="Thailand" className="bg-neutral-900">Thailand</option>
                    <option value="Vietnam" className="bg-neutral-900">Vietnam</option>
                    <option value="Lainnya" className="bg-neutral-900">Others</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pb-4 pointer-events-none text-white/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5: Pesan */}
            <div className="flex flex-col gap-3 group">
              <label htmlFor="pesan" className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-focus-within:text-white/80 transition-colors duration-500">
                Message
              </label>
              <textarea 
                id="pesan" 
                name="pesan" 
                required
                rows={4}
                placeholder="Write your message, questions, or submission details here..."
                className="w-full bg-transparent border-b border-white/20 pb-4 text-white text-sm md:text-base font-light focus:outline-none focus:border-white transition-colors duration-500 resize-none rounded-none placeholder-white/20 leading-relaxed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-12 flex flex-col items-center gap-6">
              <MagneticWrapper>
                <motion.button 
                  whileHover={isSubmitting ? {} : { 
                    scale: 1.02,
                    borderColor: "rgba(255,255,255,0.4)",
                    boxShadow: "0px 0px 40px rgba(255,255,255,0.15)"
                  }}
                  whileTap={isSubmitting ? {} : { scale: 0.95, opacity: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  type="submit" 
                  disabled={isSubmitting}
                  className={`group relative px-12 py-5 border border-white/20 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase overflow-hidden bg-white/5 backdrop-blur-md ${isSubmitting ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
                >
                  <span className={`relative z-10 transition-all duration-700 ease-in-out font-medium ${isSubmitting ? '' : 'group-hover:text-black group-hover:tracking-[0.4em]'}`}>
                    {isSubmitting ? "SENDING..." : "SEND SUBMISSION"}
                  </span>
                  {!isSubmitting && <div className="absolute inset-0 bg-white translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0" />}
                </motion.button>
              </MagneticWrapper>

              {isSuccess && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-xs text-green-400/80 font-light tracking-widest uppercase text-center"
                >
                  Your submission has been received.
                  The Barvill team will review the submitted information
                </motion.p>
              )}
            </div>

          </motion.form>
        </motion.div>
      </section>
    </main>
  );
}