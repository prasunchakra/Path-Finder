"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SalaryInsight } from "@/components/salary-insight";
import type { Role, CareerPath, Industry } from "@/data/roadmaps";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ArrowRight,
  Crosshair,
  Layers,
  Heart,
  ListChecks,
  Sparkles,
  ChevronRight,
  Target,
} from "lucide-react";

interface RoleDetailSheetProps {
  role: Role | null;
  previousRole?: Role;
  industry: Industry;
  path: CareerPath;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateToRole: (roleId: string) => void;
  onSetCurrentRole?: (roleId: string) => void;
  currentRoleId?: string | null;
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

const accentClasses: Record<string, { text: string; bg: string; border: string; btnBg: string; btnHover: string }> = {
  "#06b6d4": {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    btnBg: "bg-cyan-500/15",
    btnHover: "hover:bg-cyan-500/25",
  },
  "#10b981": {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    btnBg: "bg-emerald-500/15",
    btnHover: "hover:bg-emerald-500/25",
  },
  "#f43f5e": {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    btnBg: "bg-rose-500/15",
    btnHover: "hover:bg-rose-500/25",
  },
};

const skillClusterConfig = [
  {
    key: "core" as const,
    label: "Core Skills",
    sublabel: "Required",
    icon: Crosshair,
    pillClass: "bg-white/[0.06] text-white/80 border-white/10",
    headerClass: "text-white/90",
  },
  {
    key: "secondary" as const,
    label: "Secondary",
    sublabel: "Bonus",
    icon: Layers,
    pillClass: "bg-white/[0.04] text-white/55 border-white/[0.06]",
    headerClass: "text-white/70",
  },
  {
    key: "softSkills" as const,
    label: "Soft Skills",
    sublabel: "Essential",
    icon: Heart,
    pillClass: "bg-white/[0.04] text-white/55 border-white/[0.06]",
    headerClass: "text-white/70",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function RoleDetailSheet({
  role,
  previousRole,
  industry,
  path,
  open,
  onOpenChange,
  onNavigateToRole,
  onSetCurrentRole,
  currentRoleId,
}: RoleDetailSheetProps) {
  if (!role) return null;

  const accent = accentClasses[industry.accentColor] || accentClasses["#06b6d4"];
  const isCurrentRole = currentRoleId === role.id;

  const nextRoles = role.nextRoles
    .map((id) => path.roles.find((r) => r.id === id))
    .filter(Boolean);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-[#0c0c0c] border-white/10 p-0">
        <ScrollArea className="h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-6"
            >
              {/* Header */}
              <SheetHeader className="text-left mb-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge variant="outline" className={levelColors[role.level]}>
                    {role.level}
                  </Badge>
                  <Badge variant="outline" className="text-white/40 border-white/10">
                    {role.yearsExperience} yrs
                  </Badge>
                  {isCurrentRole && (
                    <Badge className={`${accent.bg} ${accent.text} border ${accent.border} text-[10px]`}>
                      <Target className="w-3 h-3 mr-1" />
                      Current Position
                    </Badge>
                  )}
                </div>
                <SheetTitle className="text-xl font-semibold text-white tracking-tight">
                  {role.title}
                </SheetTitle>
                <p className="text-sm text-white/45 mt-2 leading-relaxed">
                  {role.description}
                </p>

                {/* Set as current role button */}
                {onSetCurrentRole && !isCurrentRole && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => onSetCurrentRole(role.id)}
                    className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors
                      ${accent.btnBg} ${accent.text} ${accent.btnHover} border ${accent.border}`}
                  >
                    <Target className="w-3.5 h-3.5" />
                    Set as my current role
                  </motion.button>
                )}
              </SheetHeader>

              <Separator className="bg-white/[0.06] my-6" />

              {/* ─── Salary Gauge ─── */}
              <SalaryInsight
                role={role}
                previousRole={previousRole}
                accentColor={industry.accentColor}
              />

              <Separator className="bg-white/[0.06] my-6" />

              {/* ─── Skill Clusters – Bento Box Layout ─── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: industry.accentColor }} />
                  <h4 className="text-sm font-medium text-white/80">
                    Skill Clusters
                  </h4>
                </div>

                <div className="space-y-3">
                  {skillClusterConfig.map((cluster) => {
                    const skills = role.skillClusters[cluster.key];
                    const Icon = cluster.icon;
                    return (
                      <motion.div
                        key={cluster.key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className={`w-3.5 h-3.5 ${cluster.headerClass}`} />
                          <span className={`text-xs font-medium ${cluster.headerClass}`}>
                            {cluster.label}
                          </span>
                          <span className="text-[9px] text-white/25 ml-auto uppercase tracking-wider">
                            {cluster.sublabel}
                          </span>
                        </div>
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex flex-wrap gap-1.5"
                        >
                          {skills.map((skill) => (
                            <motion.div key={skill} variants={itemVariants}>
                              <Badge
                                variant="outline"
                                className={`${cluster.pillClass} text-[11px] font-normal`}
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Separator className="bg-white/[0.06] my-6" />

              {/* ─── Experience ─── */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <Clock className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <div className="text-sm text-white/70 font-medium">
                    {role.yearsExperience} years
                  </div>
                  <div className="text-[11px] text-white/35">Typical experience</div>
                </div>
              </div>

              {/* ─── Next Step Requirements ─── */}
              {role.nextStepRequirements.length > 0 && (
                <>
                  <Separator className="bg-white/[0.06] my-6" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ListChecks
                        className="w-4 h-4"
                        style={{ color: industry.accentColor }}
                      />
                      <h4 className="text-sm font-medium text-white/80">
                        Next Step Requirements
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/30 -mt-1">
                      What you need to reach the next level
                    </p>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      {role.nextStepRequirements.map((req, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          className="flex items-start gap-3 px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] group"
                        >
                          <div
                            className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors
                              border-white/15 group-hover:border-white/30`}
                          >
                            <span className="text-[9px] text-white/25 font-mono font-bold">
                              {idx + 1}
                            </span>
                          </div>
                          <span className="text-[12px] text-white/60 leading-relaxed">
                            {req}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </>
              )}

              {/* ─── Next Roles ─── */}
              {nextRoles.length > 0 && (
                <>
                  <Separator className="bg-white/[0.06] my-6" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" style={{ color: industry.accentColor }} />
                      <h4 className="text-sm font-medium text-white/80">
                        Career Progression
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {nextRoles.map((nextRole) =>
                        nextRole ? (
                          <motion.button
                            key={nextRole.id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigateToRole(nextRole.id)}
                            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 transition-all group"
                          >
                            <div className="text-left">
                              <div className="text-sm font-medium text-white/85">
                                {nextRole.title}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-white/35 mt-0.5">
                                <span>{nextRole.level}</span>
                                <span className="text-white/15">·</span>
                                <span>{nextRole.yearsExperience} yrs</span>
                                <span className="text-white/15">·</span>
                                <span className={accent.text}>
                                  {formatSalary(nextRole.salaryRange.median)}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-white/50 transition-colors" />
                          </motion.button>
                        ) : null
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Bottom spacing */}
              <div className="h-8" />
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function formatSalary(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${(amount / 1000).toFixed(0)}K`;
}
