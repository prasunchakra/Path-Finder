"use client";

import { Compass, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavbarProps {
  onSearchOpen?: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Compass className="w-6 h-6 text-cyan-400 transition-transform duration-300 group-hover:rotate-45" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Pathfinder
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/roadmap/tech?path=frontend"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Explore
            </Link>
          </nav>

          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/50 hover:text-white/80"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search roles...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/40 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
