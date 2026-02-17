"use client";

import { motion } from "framer-motion";
import type { CareerPath, Industry, Role } from "@/data/roadmaps";
import { formatSalary } from "@/data/roadmaps";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Check, Target } from "lucide-react";

interface MobileStepperProps {
  path: CareerPath;
  industry: Industry;
  onRoleSelect: (role: Role) => void;
  selectedRoleId?: string | null;
  currentRoleId?: string | null;
  completedRoleIds?: Set<string>;
}

const accentStyles: Record<
  string,
  { dot: string; dotCompleted: string; line: string; lineCompleted: string; text: string; bg: string; border: string }
> = {
  "#06b6d4": {
    dot: "bg-white/20 border-cyan-500/40",
    dotCompleted: "bg-cyan-400 border-cyan-400",
    line: "bg-white/8",
    lineCompleted: "bg-cyan-400/40",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
  },
  "#10b981": {
    dot: "bg-white/20 border-emerald-500/40",
    dotCompleted: "bg-emerald-400 border-emerald-400",
    line: "bg-white/8",
    lineCompleted: "bg-emerald-400/40",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
  },
  "#f43f5e": {
    dot: "bg-white/20 border-rose-500/40",
    dotCompleted: "bg-rose-400 border-rose-400",
    line: "bg-white/8",
    lineCompleted: "bg-rose-400/40",
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30 hover:border-rose-400/50",
  },
};

const levelColors: Record<string, string> = {
  Junior: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Mid: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Senior: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Lead: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Director: "bg-red-500/20 text-red-300 border-red-500/30",
  VP: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "C-Suite": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

function linearizeRoles(roles: Role[]): Role[] {
  const referencedIds = new Set(roles.flatMap((r) => r.nextRoles));
  const entryRoles = roles.filter((r) => !referencedIds.has(r.id));
  const ordered: Role[] = [];
  const visited = new Set<string>();
  const queue = entryRoles.length > 0 ? [...entryRoles] : [roles[0]];

  while (queue.length > 0) {
    const role = queue.shift()!;
    if (visited.has(role.id)) continue;
    visited.add(role.id);
    ordered.push(role);
    for (const nextId of role.nextRoles) {
      const next = roles.find((r) => r.id === nextId);
      if (next && !visited.has(next.id)) queue.push(next);
    }
  }
  roles.forEach((r) => {
    if (!visited.has(r.id)) ordered.push(r);
  });
  return ordered;
}

export function MobileStepper({
  path,
  industry,
  onRoleSelect,
  selectedRoleId,
  currentRoleId,
  completedRoleIds,
}: MobileStepperProps) {
  const accent = accentStyles[industry.accentColor] || accentStyles["#06b6d4"];
  const orderedRoles = linearizeRoles(path.roles);

  return (
    <div className="relative">
      {orderedRoles.map((role, idx) => {
        const isSelected = selectedRoleId === role.id;
        const isCurrent = currentRoleId === role.id;
        const isCompleted = !!completedRoleIds?.has(role.id);
        const isLast = idx === orderedRoles.length - 1;

        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.4 }}
            className="relative flex gap-4"
          >
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.06 + 0.1, type: "spring", stiffness: 300 }}
                className={`w-4 h-4 rounded-full border-2 ring-4 ring-[#0a0a0a] z-10 shrink-0 mt-5 flex items-center justify-center
                  ${isCompleted || isCurrent ? accent.dotCompleted : accent.dot}
                `}
              >
                {isCompleted && <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />}
                {isCurrent && !isCompleted && (
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                )}
              </motion.div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-[20px] ${
                    isCompleted ? accent.lineCompleted : accent.line
                  }`}
                />
              )}
            </div>

            {/* Card */}
            <motion.button
              onClick={() => onRoleSelect(role)}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 text-left rounded-xl border p-4 mb-4 transition-all duration-300
                ${isCompleted ? "bg-white/[0.03]" : "bg-[#111111]/90"}
                ${isSelected || isCurrent ? `${accent.border} ring-1 ring-white/10` : accent.border}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[9px] px-1.5 py-0 h-4 ${levelColors[role.level]}`}
                  >
                    {role.level}
                  </Badge>
                  <span className="text-[10px] text-white/30 font-mono">
                    {role.yearsExperience} yrs
                  </span>
                  {isCurrent && (
                    <Badge className={`${accent.bg} ${accent.text} text-[9px] px-1.5 py-0 h-4 border border-transparent`}>
                      <Target className="w-2.5 h-2.5 mr-0.5" />
                      Current
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </div>
              <h4 className="text-sm font-medium text-white/90 mb-1">
                {role.title}
              </h4>
              <p className={`text-[11px] font-mono ${accent.text} opacity-70`}>
                {formatSalary(role.salaryRange.min)} –{" "}
                {formatSalary(role.salaryRange.max)}
              </p>

              {/* Mini skill tags (core only) */}
              <div className="flex flex-wrap gap-1 mt-2">
                {role.skillClusters.core.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/40"
                  >
                    {skill}
                  </span>
                ))}
                {role.skillClusters.core.length > 3 && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">
                    +{role.skillClusters.core.length - 3}
                  </span>
                )}
              </div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}
