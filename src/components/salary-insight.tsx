"use client";

import { motion } from "framer-motion";
import { formatSalary, formatSalaryFull, type Role } from "@/data/roadmaps";
import { TrendingUp, DollarSign } from "lucide-react";

interface SalaryInsightProps {
  role: Role;
  previousRole?: Role;
  accentColor: string;
}

const colorConfig: Record<string, {
  gradient: string;
  gradientFull: string;
  text: string;
  bg: string;
  marker: string;
  trackGlow: string;
}> = {
  "#06b6d4": {
    gradient: "from-cyan-600 via-cyan-400 to-cyan-300",
    gradientFull: "linear-gradient(90deg, #0e7490, #06b6d4, #22d3ee, #67e8f9)",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    marker: "bg-cyan-400",
    trackGlow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]",
  },
  "#10b981": {
    gradient: "from-emerald-600 via-emerald-400 to-emerald-300",
    gradientFull: "linear-gradient(90deg, #047857, #10b981, #34d399, #6ee7b7)",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    marker: "bg-emerald-400",
    trackGlow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
  },
  "#f43f5e": {
    gradient: "from-rose-600 via-rose-400 to-rose-300",
    gradientFull: "linear-gradient(90deg, #be123c, #f43f5e, #fb7185, #fda4af)",
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    marker: "bg-rose-400",
    trackGlow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  },
};

const percentileLabels = [
  { key: "p10" as const, label: "10th" },
  { key: "p25" as const, label: "25th" },
  { key: "p50" as const, label: "Median" },
  { key: "p75" as const, label: "75th" },
  { key: "p90" as const, label: "90th" },
];

export function SalaryInsight({ role, previousRole, accentColor }: SalaryInsightProps) {
  const colors = colorConfig[accentColor] || colorConfig["#06b6d4"];
  const { salaryPercentiles: p } = role;

  const gaugeMin = p.p10;
  const gaugeMax = p.p90;
  const gaugeRange = gaugeMax - gaugeMin;

  const salaryJump = previousRole
    ? Math.round(
        ((role.salaryRange.median - previousRole.salaryRange.median) /
          previousRole.salaryRange.median) *
          100
      )
    : null;

  const getPercent = (value: number) =>
    Math.max(0, Math.min(100, ((value - gaugeMin) / gaugeRange) * 100));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <DollarSign className={`w-4 h-4 ${colors.text}`} />
        <h4 className="text-sm font-medium text-white/80">Salary Gauge</h4>
      </div>

      {/* Main Gradient Gauge – p10 to p90 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-white/35 font-mono">
          <span>{formatSalary(p.p10)}</span>
          <span>{formatSalary(p.p90)}</span>
        </div>

        <div className={`relative h-5 rounded-full bg-white/5 overflow-hidden ${colors.trackGlow}`}>
          {/* Full gradient fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full"
            style={{ background: colors.gradientFull }}
          />

          {/* Percentile markers */}
          {percentileLabels.map((item, idx) => {
            const val = p[item.key];
            const percent = getPercent(val);
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="absolute top-0 h-full flex flex-col items-center"
                style={{ left: `${percent}%` }}
              >
                <div
                  className={`w-0.5 h-full ${
                    item.key === "p50" ? "bg-white/90" : "bg-black/30"
                  }`}
                />
              </motion.div>
            );
          })}

          {/* Median diamond marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${getPercent(p.p50)}%` }}
          >
            <div className="w-3.5 h-3.5 rotate-45 bg-white border-2 border-black/40 shadow-lg -ml-[7px]" />
          </motion.div>
        </div>

        {/* Percentile value labels */}
        <div className="grid grid-cols-5 gap-1">
          {percentileLabels.map((item, idx) => {
            const val = p[item.key];
            const isMedian = item.key === "p50";
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.08 }}
                className="text-center"
              >
                <div
                  className={`text-[10px] font-mono font-medium ${
                    isMedian ? "text-white" : "text-white/50"
                  }`}
                >
                  {formatSalary(val)}
                </div>
                <div
                  className={`text-[9px] mt-0.5 ${
                    isMedian ? colors.text : "text-white/30"
                  }`}
                >
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Range summary card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { label: "Entry", value: p.p25, sub: "25th pctl" },
          { label: "Median", value: p.p50, sub: "50th pctl" },
          { label: "Top", value: p.p75, sub: "75th pctl" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-white/[0.03] border border-white/5 p-3 text-center"
          >
            <div className="text-[10px] text-white/40 mb-1">{item.label}</div>
            <div className={`text-sm font-mono font-semibold ${colors.text}`}>
              {formatSalary(item.value)}
            </div>
            <div className="text-[9px] text-white/25 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Salary jump indicator */}
      {salaryJump !== null && salaryJump > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl ${colors.bg} border border-white/5`}
        >
          <TrendingUp className={`w-4 h-4 ${colors.text} shrink-0`} />
          <div className="text-xs text-white/70">
            <span className={`font-bold ${colors.text}`}>+{salaryJump}%</span>{" "}
            median increase from{" "}
            <span className="text-white/50">{previousRole?.title}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
