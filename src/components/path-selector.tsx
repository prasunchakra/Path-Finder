"use client";

import { motion } from "framer-motion";
import type { CareerPath, Industry } from "@/data/roadmaps";

interface PathSelectorProps {
  paths: CareerPath[];
  selectedPathId: string;
  onPathSelect: (pathId: string) => void;
  industry: Industry;
}

const accentStyles: Record<string, { active: string; hover: string; indicator: string }> = {
  "#06b6d4": {
    active: "text-cyan-400",
    hover: "hover:text-cyan-300",
    indicator: "bg-cyan-400",
  },
  "#10b981": {
    active: "text-emerald-400",
    hover: "hover:text-emerald-300",
    indicator: "bg-emerald-400",
  },
  "#f43f5e": {
    active: "text-rose-400",
    hover: "hover:text-rose-300",
    indicator: "bg-rose-400",
  },
};

export function PathSelector({ paths, selectedPathId, onPathSelect, industry }: PathSelectorProps) {
  const accent = accentStyles[industry.accentColor] || accentStyles["#06b6d4"];

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/5 overflow-x-auto">
      {paths.map((path) => {
        const isSelected = path.id === selectedPathId;
        return (
          <button
            key={path.id}
            onClick={() => onPathSelect(path.id)}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
              ${isSelected ? `${accent.active}` : `text-white/40 ${accent.hover}`}
            `}
          >
            {isSelected && (
              <motion.div
                layoutId={`path-indicator-${industry.id}`}
                className={`absolute inset-0 rounded-lg ${accent.indicator} opacity-10`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{path.title}</span>
          </button>
        );
      })}
    </div>
  );
}
