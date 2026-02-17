"use client";

import { motion } from "framer-motion";
import { Monitor, TrendingUp, Megaphone, ArrowRight } from "lucide-react";
import type { Industry } from "@/data/roadmaps";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  TrendingUp,
  Megaphone,
};

const accentMap: Record<string, { border: string; glow: string; text: string; bg: string; gradient: string }> = {
  tech: {
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.3)]",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  finance: {
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.3)]",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  marketing: {
    border: "border-rose-500/30 hover:border-rose-400/50",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(244,63,94,0.3)]",
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
  },
};

interface IndustryCardProps {
  industry: Industry;
  index: number;
}

export function IndustryCard({ industry, index }: IndustryCardProps) {
  const Icon = iconMap[industry.icon] || Monitor;
  const accent = accentMap[industry.id] || accentMap.tech;

  const totalPaths = industry.paths.length;
  const totalRoles = industry.paths.reduce((acc, p) => acc + p.roles.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
    >
      <Link
        href={`/roadmap/${industry.id}?path=${industry.paths[0]?.id}`}
        className={`group relative block rounded-2xl border ${accent.border} ${accent.glow} bg-[#111111] overflow-hidden transition-all duration-500`}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative p-8 sm:p-10">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${accent.bg} mb-6`}
          >
            <Icon className={`w-7 h-7 ${accent.text}`} />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-semibold mb-3 text-white tracking-tight">
            {industry.name}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">
            {industry.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8">
            <div>
              <div className={`text-2xl font-bold ${accent.text}`}>{totalPaths}</div>
              <div className="text-xs text-white/40 mt-0.5">Career Paths</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className={`text-2xl font-bold ${accent.text}`}>{totalRoles}</div>
              <div className="text-xs text-white/40 mt-0.5">Roles</div>
            </div>
          </div>

          {/* Path previews */}
          <div className="flex flex-wrap gap-2 mb-6">
            {industry.paths.map((path) => (
              <span
                key={path.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 text-white/50 border border-white/5"
              >
                {path.title}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`inline-flex items-center gap-2 text-sm font-medium ${accent.text} group-hover:gap-3 transition-all`}
          >
            Explore paths
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
