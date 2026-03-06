"use client"

import { motion } from "framer-motion"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface SensorPanelProps {
  label: string
  value: number | string
  unit?: string
  icon: LucideIcon
  color?: string
  trend?: "up" | "down" | "stable"
  active?: boolean
  className?: string
}

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus }
const trendColors = { up: "#00FFB2", down: "#FF4D4D", stable: "#6B8AAE" }

export default function SensorPanel({
  label,
  value,
  unit = "",
  icon: Icon,
  color = "#00D4FF",
  trend = "stable",
  active = false,
  className,
}: SensorPanelProps) {
  const TrendIcon = trendIcons[trend]

  return (
    <div className={cn("wiq-sensor-panel", active && "active sensor-pulse", className)}>
      {/* Scan line effect */}
      {active && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-30">
          <div
            className="scan-line absolute left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" style={{ color }} />
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</span>
        </div>
        <div className="flex items-center gap-1" style={{ color: trendColors[trend] }}>
          <TrendIcon className="h-3 w-3" />
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <motion.span
          key={String(value)}
          initial={{ opacity: 0.5, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-mono text-xl font-black"
          style={{ color }}
        >
          {value}
        </motion.span>
        {unit && <span className="text-xs text-white/35">{unit}</span>}
      </div>

      {/* Active indicator dot */}
      {active && (
        <motion.div
          className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </div>
  )
}
