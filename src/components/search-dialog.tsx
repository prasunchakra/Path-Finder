"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Briefcase } from "lucide-react";
import { getAllRoles, formatSalary } from "@/data/roadmaps";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const industryColors: Record<string, string> = {
  tech: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  finance: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  marketing: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const allRoles = useMemo(() => getAllRoles(), []);

  const filteredRoles = useMemo(() => {
    if (!query.trim()) return allRoles.slice(0, 8);
    const q = query.toLowerCase();
    return allRoles.filter(
      (role) =>
        role.title.toLowerCase().includes(q) ||
        role.requiredSkills.some((s) => s.toLowerCase().includes(q)) ||
        role.industryName.toLowerCase().includes(q) ||
        role.pathTitle.toLowerCase().includes(q)
    );
  }, [query, allRoles]);

  const handleSelect = useCallback(
    (role: (typeof allRoles)[0]) => {
      onOpenChange(false);
      setQuery("");
      router.push(
        `/roadmap/${role.industryId}?path=${role.pathId}&role=${role.id}`
      );
    },
    [onOpenChange, router]
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-[#141414] border-white/10 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Search Roles</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <Search className="w-4 h-4 text-white/40 shrink-0" />
          <Input
            placeholder="Search roles, skills, industries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent h-12 text-sm placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          <AnimatePresence mode="popLayout">
            {filteredRoles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-white/30"
              >
                <Briefcase className="w-8 h-8 mb-3" />
                <p className="text-sm">No roles found</p>
              </motion.div>
            ) : (
              filteredRoles.map((role, idx) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => handleSelect(role)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-white/90 truncate">
                        {role.title}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-4 shrink-0 ${
                          industryColors[role.industryId]
                        }`}
                      >
                        {role.industryName}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span>{role.pathTitle}</span>
                      <span>·</span>
                      <span>
                        {formatSalary(role.salaryRange.min)} –{" "}
                        {formatSalary(role.salaryRange.max)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
