"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { SearchDialog } from "@/components/search-dialog";
import { IndustryCard } from "@/components/industry-card";
import { industries } from "@/data/roadmaps";
import { ArrowDown, Bot, Send, Loader2, Lock } from "lucide-react";

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "bot" | "user"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hey! I'm your AI Career Advisor. I can help you explore career paths, compare roles, and plan your next move. Ask me anything!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response — coming soon
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm still being trained on career data — full AI responses are coming soon! For now, explore the interactive roadmaps below to discover roles, skills, and salaries.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]"
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Title area */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-6 font-mono text-[13px] text-white/30"
            >
              <span className="text-cyan-500">~</span>
              <span className="text-white/15">/</span>
              <span className="text-white/50">pathfinder</span>
              <span className="text-white/15">$</span>
              <motion.span
                className="text-white/60"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ overflow: "hidden", display: "inline-block", whiteSpace: "nowrap" }}
              >
                ask career-advisor
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-cyan-400 font-normal"
              >
                _
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="text-white">The</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Career Advisor
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-white/40 max-w-lg mx-auto leading-relaxed"
            >
              Ask questions about career paths, salaries, and skills.
              Or explore the interactive roadmaps below.
            </motion.p>
          </div>

          {/* Chat Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl border border-white/[0.08] bg-[#111111]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#111111]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white/80">Pathfinder AI</div>
                <div className="text-[10px] text-emerald-400/70">Online</div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Lock className="w-2.5 h-2.5 text-amber-400" />
                <span className="text-[10px] font-medium text-amber-400">Coming Soon</span>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-[240px] overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
              <AnimatePresence mode="popLayout">
                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center shrink-0 mr-2.5 mt-1">
                        <Bot className="w-3 h-3 text-cyan-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-cyan-500/15 text-white/85 rounded-br-md"
                          : "bg-white/[0.04] text-white/60 rounded-bl-md border border-white/[0.05]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center shrink-0 mr-2.5 mt-1">
                    <Bot className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.05] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleChatSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] bg-white/[0.01]"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about a career path, role, or skill..."
                className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="w-8 h-8 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                {isTyping ? (
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </button>
            </form>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2 mt-10"
          >
            <span className="text-xs text-white/20">
              Or explore roadmaps manually
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-white/20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, idx) => (
              <IndustryCard key={industry.id} industry={industry} index={idx} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-20"
        >
          <p className="text-xs text-white/15">
            Built with Next.js, Framer Motion & Tailwind CSS
          </p>
        </motion.div>
      </section>
    </div>
  );
}
