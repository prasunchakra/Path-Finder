"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CareerPath, Industry, Role } from "@/data/roadmaps";
import { RoleNode } from "@/components/role-node";

interface RoadmapViewProps {
  path: CareerPath;
  industry: Industry;
  onRoleSelect: (role: Role) => void;
  selectedRoleId?: string | null;
  highlightedRoleId?: string | null;
  currentRoleId?: string | null;
  completedRoleIds?: Set<string>;
}

interface NodePosition {
  x: number;
  y: number;
  role: Role;
}

const NODE_WIDTH = 250;
const NODE_HEIGHT = 105;
const V_GAP = 148;
const H_GAP = 320;

// ─── Layout Algorithm ─────────────────────────────────────────────

function computeLayout(roles: Role[]): NodePosition[] {
  const referencedIds = new Set(roles.flatMap((r) => r.nextRoles));
  const entryRoles = roles.filter((r) => !referencedIds.has(r.id));

  const levels: Role[][] = [];
  const visited = new Set<string>();
  let currentLevel = entryRoles.length > 0 ? entryRoles : [roles[0]];

  while (currentLevel.length > 0) {
    const levelRoles = currentLevel.filter((r) => !visited.has(r.id));
    if (levelRoles.length === 0) break;
    levels.push(levelRoles);
    levelRoles.forEach((r) => visited.add(r.id));

    const nextLevel: Role[] = [];
    for (const role of levelRoles) {
      for (const nextId of role.nextRoles) {
        const nextRole = roles.find((r) => r.id === nextId);
        if (nextRole && !visited.has(nextRole.id)) {
          nextLevel.push(nextRole);
        }
      }
    }
    currentLevel = nextLevel;
  }

  const unvisited = roles.filter((r) => !visited.has(r.id));
  if (unvisited.length > 0) levels.push(unvisited);

  const positions: NodePosition[] = [];
  const PADDING = 60;

  levels.forEach((levelRoles, colIdx) => {
    const totalHeight =
      levelRoles.length * NODE_HEIGHT +
      (levelRoles.length - 1) * (V_GAP - NODE_HEIGHT);
    const startY = Math.max(PADDING, (420 - totalHeight) / 2);

    levelRoles.forEach((role, rowIdx) => {
      positions.push({
        x: PADDING + colIdx * H_GAP,
        y: startY + rowIdx * V_GAP,
        role,
      });
    });
  });

  return positions;
}

// ─── Connection Helpers ───────────────────────────────────────────

function getConnectedRoles(roles: Role[], hoveredId: string): Set<string> {
  const connected = new Set<string>();
  connected.add(hoveredId);
  const role = roles.find((r) => r.id === hoveredId);
  if (role) {
    role.nextRoles.forEach((id) => connected.add(id));
  }
  roles.forEach((r) => {
    if (r.nextRoles.includes(hoveredId)) connected.add(r.id);
  });
  return connected;
}

/**
 * Generate circuit-board style path with clean 90° turns and rounded corners.
 */
function generateCircuitPath(
  from: NodePosition,
  to: NodePosition
): string {
  const startX = from.x + NODE_WIDTH;
  const startY = from.y + NODE_HEIGHT / 2;
  const endX = to.x;
  const endY = to.y + NODE_HEIGHT / 2;

  const midX = (startX + endX) / 2;
  const r = 14; // corner radius

  if (Math.abs(startY - endY) < 2) {
    // Straight line
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  const goingDown = endY > startY;
  const dy = endY - startY;
  const absDy = Math.abs(dy);
  const clampedR = Math.min(r, absDy / 2, (endX - startX) / 4);

  if (goingDown) {
    return [
      `M ${startX} ${startY}`,
      `L ${midX - clampedR} ${startY}`,
      `Q ${midX} ${startY} ${midX} ${startY + clampedR}`,
      `L ${midX} ${endY - clampedR}`,
      `Q ${midX} ${endY} ${midX + clampedR} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(" ");
  } else {
    return [
      `M ${startX} ${startY}`,
      `L ${midX - clampedR} ${startY}`,
      `Q ${midX} ${startY} ${midX} ${startY - clampedR}`,
      `L ${midX} ${endY + clampedR}`,
      `Q ${midX} ${endY} ${midX + clampedR} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(" ");
  }
}

// ─── Accent Styles ────────────────────────────────────────────────

const accentCfg: Record<string, { rgb: string; rgbaGlow: string }> = {
  "#06b6d4": { rgb: "6,182,212", rgbaGlow: "rgba(6,182,212,0.4)" },
  "#10b981": { rgb: "16,185,129", rgbaGlow: "rgba(16,185,129,0.4)" },
  "#f43f5e": { rgb: "244,63,94", rgbaGlow: "rgba(244,63,94,0.4)" },
};

// ─── Component ────────────────────────────────────────────────────

export function RoadmapView({
  path,
  industry,
  onRoleSelect,
  selectedRoleId,
  highlightedRoleId,
  currentRoleId,
  completedRoleIds,
}: RoadmapViewProps) {
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cfg = accentCfg[industry.accentColor] || accentCfg["#06b6d4"];

  const positions = useMemo(() => computeLayout(path.roles), [path.roles]);

  const connectedRoles = useMemo(() => {
    const id = hoveredRoleId || highlightedRoleId;
    if (!id) return null;
    return getConnectedRoles(path.roles, id);
  }, [hoveredRoleId, highlightedRoleId, path.roles]);

  const svgWidth = useMemo(() => {
    const maxX = Math.max(...positions.map((p) => p.x));
    return maxX + NODE_WIDTH + 80;
  }, [positions]);

  const svgHeight = useMemo(() => {
    const maxY = Math.max(...positions.map((p) => p.y));
    return maxY + NODE_HEIGHT + 80;
  }, [positions]);

  const connections = useMemo(() => {
    const conns: {
      from: NodePosition;
      to: NodePosition;
      fromId: string;
      toId: string;
    }[] = [];
    for (const pos of positions) {
      for (const nextId of pos.role.nextRoles) {
        const targetPos = positions.find((p) => p.role.id === nextId);
        if (targetPos) {
          conns.push({
            from: pos,
            to: targetPos,
            fromId: pos.role.id,
            toId: nextId,
          });
        }
      }
    }
    return conns;
  }, [positions]);

  // Auto-scroll to highlighted role
  useEffect(() => {
    if (highlightedRoleId && containerRef.current) {
      const pos = positions.find((p) => p.role.id === highlightedRoleId);
      if (pos) {
        containerRef.current.scrollTo({
          left: Math.max(0, pos.x - 200),
          top: Math.max(0, pos.y - 200),
          behavior: "smooth",
        });
      }
    }
  }, [highlightedRoleId, positions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-auto rounded-2xl border border-white/[0.06] bg-[#080808]"
      style={{ minHeight: "520px" }}
    >
      {/* Circuit-board background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <svg
        width={svgWidth}
        height={svgHeight}
        className="relative z-10"
        style={{ minWidth: svgWidth, minHeight: svgHeight }}
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id={`arrow-active-${path.id}`}
            viewBox="0 0 12 8"
            refX="11"
            refY="4"
            markerWidth="10"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 0 L 12 4 L 0 8 z"
              fill={industry.accentColor}
            />
          </marker>
          <marker
            id={`arrow-completed-${path.id}`}
            viewBox="0 0 12 8"
            refX="11"
            refY="4"
            markerWidth="10"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 0 L 12 4 L 0 8 z"
              fill={industry.accentColor}
              opacity={0.7}
            />
          </marker>
          <marker
            id={`arrow-dim-${path.id}`}
            viewBox="0 0 12 8"
            refX="11"
            refY="4"
            markerWidth="10"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 0 L 12 4 L 0 8 z"
              fill="rgba(255,255,255,0.12)"
            />
          </marker>

          {/* Glow filter */}
          <filter id={`glow-${path.id}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Motion blur filter for arrows */}
          <filter id={`motionblur-${path.id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2 0" />
          </filter>
        </defs>

        {/* ─── Connections ─── */}
        {connections.map((conn, idx) => {
          const pathD = generateCircuitPath(conn.from, conn.to);
          const isHighlighted =
            connectedRoles &&
            connectedRoles.has(conn.fromId) &&
            connectedRoles.has(conn.toId);
          const bothCompleted =
            completedRoleIds?.has(conn.fromId) &&
            (completedRoleIds?.has(conn.toId) || currentRoleId === conn.toId);
          const isCompletedPath = bothCompleted && !connectedRoles;
          const isActivePath = !connectedRoles || isHighlighted;

          // Determine visual state
          let strokeColor = `rgba(255,255,255,0.06)`;
          let strokeWidth = 1.5;
          let strokeOpacity = 1;
          let markerEnd = `url(#arrow-dim-${path.id})`;

          if (isHighlighted) {
            strokeColor = industry.accentColor;
            strokeWidth = 2.5;
            strokeOpacity = 0.9;
            markerEnd = `url(#arrow-active-${path.id})`;
          } else if (isCompletedPath) {
            strokeColor = industry.accentColor;
            strokeWidth = 2;
            strokeOpacity = 0.5;
            markerEnd = `url(#arrow-completed-${path.id})`;
          } else if (isActivePath && !connectedRoles) {
            strokeColor = industry.accentColor;
            strokeWidth = 1.5;
            strokeOpacity = 0.2;
            markerEnd = `url(#arrow-active-${path.id})`;
          }

          return (
            <g key={`${conn.fromId}-${conn.toId}`}>
              {/* Glow backdrop for highlighted paths */}
              {isHighlighted && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={industry.accentColor}
                  strokeWidth={6}
                  strokeOpacity={0.12}
                  filter={`url(#glow-${path.id})`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}

              {/* Completed fill animation – path "fills up" */}
              {isCompletedPath && !connectedRoles && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={industry.accentColor}
                  strokeWidth={3}
                  strokeOpacity={0.15}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                />
              )}

              {/* Main path */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd={markerEnd}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.9,
                  delay: idx * 0.08,
                  ease: "easeInOut",
                }}
              />

              {/* Animated flow particle on highlighted paths */}
              {isHighlighted && (
                <circle r={3.5} fill={industry.accentColor} filter={`url(#motionblur-${path.id})`}>
                  <animateMotion
                    dur="1.8s"
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>
              )}

              {/* Subtle dashed overlay for non-completed future paths */}
              {!isHighlighted && !isCompletedPath && !connectedRoles && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth={1}
                  strokeDasharray="4 8"
                />
              )}
            </g>
          );
        })}

        {/* ─── Role Nodes ─── */}
        {positions.map((pos, idx) => {
          const isSelected = selectedRoleId === pos.role.id;
          const isHighlighted2 = highlightedRoleId === pos.role.id;
          const isHovered = hoveredRoleId === pos.role.id;
          const isConnected = connectedRoles?.has(pos.role.id);
          const isDimmed = !!(connectedRoles && !isConnected);
          const isActive = currentRoleId === pos.role.id;
          const isCompleted = !!completedRoleIds?.has(pos.role.id);

          return (
            <foreignObject
              key={pos.role.id}
              x={pos.x}
              y={pos.y}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              className="overflow-visible"
            >
              <RoleNode
                roleData={pos.role}
                isActive={isActive || isSelected || isHighlighted2}
                isCompleted={isCompleted}
                isHovered={isHovered}
                isDimmed={isDimmed}
                accentColor={industry.accentColor}
                index={idx}
                onClick={() => onRoleSelect(pos.role)}
                onMouseEnter={() => setHoveredRoleId(pos.role.id)}
                onMouseLeave={() => setHoveredRoleId(null)}
              />
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}
