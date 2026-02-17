"use client";

import { useState, useEffect, useMemo, useCallback, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { SearchDialog } from "@/components/search-dialog";
import { PathSelector } from "@/components/path-selector";
import { RoadmapView } from "@/components/roadmap-view";
import { MobileStepper } from "@/components/mobile-stepper";
import { RoleDetailSheet } from "@/components/role-detail-sheet";
import { getIndustry, getAncestorRoleIds, type Role } from "@/data/roadmaps";
import { ArrowLeft, Map, Target } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ industry: string }>;
}

export default function RoadmapPage({ params }: PageProps) {
  const { industry: industryId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [highlightedRoleId, setHighlightedRoleId] = useState<string | null>(null);
  const [currentRoleId, setCurrentRoleId] = useState<string | null>(null);

  const industry = useMemo(() => getIndustry(industryId), [industryId]);

  const pathId = searchParams.get("path") || industry?.paths[0]?.id || "";
  const roleParam = searchParams.get("role");

  const currentPath = useMemo(
    () => industry?.paths.find((p) => p.id === pathId) || industry?.paths[0],
    [industry, pathId]
  );

  // Compute completed role IDs based on current role
  const completedRoleIds = useMemo(() => {
    if (!currentRoleId || !currentPath) return new Set<string>();
    return getAncestorRoleIds(currentPath.roles, currentRoleId);
  }, [currentRoleId, currentPath]);

  // Handle role param from URL (e.g., from search)
  useEffect(() => {
    if (roleParam && currentPath) {
      const role = currentPath.roles.find((r) => r.id === roleParam);
      if (role) {
        setSelectedRole(role);
        setSheetOpen(true);
        setHighlightedRoleId(role.id);
      }
    }
  }, [roleParam, currentPath]);

  // Keyboard shortcut
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

  const handlePathSelect = useCallback(
    (newPathId: string) => {
      router.push(`/roadmap/${industryId}?path=${newPathId}`, { scroll: false });
      setSelectedRole(null);
      setSheetOpen(false);
      setHighlightedRoleId(null);
      setCurrentRoleId(null);
    },
    [router, industryId]
  );

  const handleRoleSelect = useCallback((role: Role) => {
    setSelectedRole(role);
    setSheetOpen(true);
    setHighlightedRoleId(role.id);
  }, []);

  const handleNavigateToRole = useCallback(
    (roleId: string) => {
      if (currentPath) {
        const role = currentPath.roles.find((r) => r.id === roleId);
        if (role) {
          setSelectedRole(role);
          setHighlightedRoleId(role.id);
        }
      }
    },
    [currentPath]
  );

  const handleSetCurrentRole = useCallback((roleId: string) => {
    setCurrentRoleId(roleId);
  }, []);

  const previousRole = useMemo(() => {
    if (!selectedRole || !currentPath) return undefined;
    return currentPath.roles.find((r) => r.nextRoles.includes(selectedRole.id));
  }, [selectedRole, currentPath]);

  if (!industry || !currentPath) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Industry not found
          </h1>
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                All Industries
              </Link>

              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Map
                      className="w-5 h-5"
                      style={{ color: industry.accentColor }}
                    />
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                      {industry.name}
                    </h1>
                  </div>
                  <p className="text-sm text-white/40 max-w-xl">
                    {currentPath.description}
                  </p>
                </div>

                {/* Current role indicator */}
                {currentRoleId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03]"
                  >
                    <Target className="w-3.5 h-3.5" style={{ color: industry.accentColor }} />
                    <span className="text-xs text-white/50">Current:</span>
                    <span className="text-xs text-white/80 font-medium">
                      {currentPath.roles.find((r) => r.id === currentRoleId)?.title}
                    </span>
                    <button
                      onClick={() => setCurrentRoleId(null)}
                      className="text-[10px] text-white/30 hover:text-white/60 transition-colors ml-1"
                    >
                      Clear
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Path Selector */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <PathSelector
                paths={industry.paths}
                selectedPathId={currentPath.id}
                onPathSelect={handlePathSelect}
                industry={industry}
              />
            </motion.div>

            {/* Roadmap */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Desktop SVG Roadmap */}
                <div className="hidden md:block">
                  <RoadmapView
                    path={currentPath}
                    industry={industry}
                    onRoleSelect={handleRoleSelect}
                    selectedRoleId={selectedRole?.id}
                    highlightedRoleId={highlightedRoleId}
                    currentRoleId={currentRoleId}
                    completedRoleIds={completedRoleIds}
                  />
                </div>

                {/* Mobile Stepper */}
                <div className="block md:hidden">
                  <MobileStepper
                    path={currentPath}
                    industry={industry}
                    onRoleSelect={handleRoleSelect}
                    selectedRoleId={selectedRole?.id}
                    currentRoleId={currentRoleId}
                    completedRoleIds={completedRoleIds}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-6 text-[11px] text-white/20 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-px"
                  style={{ backgroundColor: industry.accentColor, opacity: 0.5 }}
                />
                <span>Career progression</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: industry.accentColor }}
                />
                <span>Hover to highlight connections</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Click a role for Deep Dive</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-3 h-3" />
                <span>Set &quot;current role&quot; to track progress</span>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Role Detail Sheet (Deep Dive) */}
        <RoleDetailSheet
          role={selectedRole}
          previousRole={previousRole}
          industry={industry}
          path={currentPath}
          open={sheetOpen}
          onOpenChange={(open) => {
            setSheetOpen(open);
            if (!open) setHighlightedRoleId(null);
          }}
          onNavigateToRole={handleNavigateToRole}
          onSetCurrentRole={handleSetCurrentRole}
          currentRoleId={currentRoleId}
        />
      </div>
    </LayoutGroup>
  );
}
