"use client";

import { motion } from "framer-motion";
import type { Role } from "@/data/roadmaps";
import { formatSalary } from "@/data/roadmaps";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export interface RoleNodeProps {
  roleData: Role;
  isActive: boolean;
  isCompleted: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  accentColor: string;
  index: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const levelColors: Record<string, string> = {
  Junior: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Mid: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Senior: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Lead: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Director: "bg-red-500/20 text-red-300 border-red-500/30",
  VP: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "C-Suite": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const accentClasses: Record<string, { node: string; nodeActive: string; nodeCompleted: string; text: string; glow: string; completedBg: string }> = {
  "#06b6d4": {
    node: "border-cyan-500/30",
    nodeActive: "border-cyan-400 shadow-[0_0_35px_-5px_rgba(6,182,212,0.5)] ring-1 ring-cyan-400/30",
    nodeCompleted: "border-cyan-500/50",
    text: "text-cyan-400",
    glow: "bg-cyan-400",
    completedBg: "bg-cyan-500/8",
  },
  "#10b981": {
    node: "border-emerald-500/30",
    nodeActive: "border-emerald-400 shadow-[0_0_35px_-5px_rgba(16,185,129,0.5)] ring-1 ring-emerald-400/30",
    nodeCompleted: "border-emerald-500/50",
    text: "text-emerald-400",
    glow: "bg-emerald-400",
    completedBg: "bg-emerald-500/8",
  },
  "#f43f5e": {
    node: "border-rose-500/30",
    nodeActive: "border-rose-400 shadow-[0_0_35px_-5px_rgba(244,63,94,0.5)] ring-1 ring-rose-400/30",
    nodeCompleted: "border-rose-500/50",
    text: "text-rose-400",
    glow: "bg-rose-400",
    completedBg: "bg-rose-500/8",
  },
};

export function RoleNode({
  roleData,
  isActive,
  isCompleted,
  isHovered,
  isDimmed,
  accentColor,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RoleNodeProps) {
  const accent = accentClasses[accentColor] || accentClasses["#06b6d4"];

  const borderClass = isActive
    ? accent.nodeActive
    : isCompleted
      ? accent.nodeCompleted
      : isHovered
        ? accent.nodeActive
        : accent.node;

  const bgClass = isCompleted ? accent.completedBg : "bg-[#111111]/90";

  return (
    <motion.div
      layoutId={`role-node-${roleData.id}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
        layout: { type: "spring", stiffness: 350, damping: 30 },
      }}
      whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`
        w-full h-full rounded-xl border cursor-pointer
        transition-colors duration-300 p-4 flex flex-col justify-center
        backdrop-blur-sm relative overflow-hidden
        ${bgClass} ${borderClass}
      `}
    >
      {/* Completion indicator */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2.5 right-2.5"
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${accent.glow}`}
          >
            <Check className="w-3 h-3 text-black" strokeWidth={3} />
          </div>
        </motion.div>
      )}

      {/* Active glow pulse */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 rounded-xl ${accent.glow} opacity-[0.04]`}
          animate={{ opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge
            variant="outline"
            className={`text-[9px] px-1.5 py-0 h-4 ${levelColors[roleData.level]}`}
          >
            {roleData.level}
          </Badge>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] font-medium px-1.5 py-0 rounded-full bg-white/10 text-white/60"
            >
              Current
            </motion.span>
          )}
        </div>
        <h4 className="text-sm font-medium text-white/90 leading-tight truncate">
          {roleData.title}
        </h4>
        <p className={`text-[11px] mt-1 font-mono ${accent.text} opacity-70`}>
          {formatSalary(roleData.salaryRange.min)} –{" "}
          {formatSalary(roleData.salaryRange.max)}
        </p>
      </div>
    </motion.div>
  );
}
