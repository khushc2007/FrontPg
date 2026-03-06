"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import AnimatedCounter from "../animated-counter"

interface MetricCardProps {
  value: number
  suffix?: string
  label: string
  accentColor?: "cyan" | "emerald"
  className?: string
  delay?: number
}

export default function MetricCard({
  value,
  suffix = "",
  label,
  accentColor = "cyan",
  className,
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "wiq-metric-card",
        accentColor === "emerald" && "accent-green",
        className
      )}
    >
      <AnimatedCounter end={value} suffix={suffix} label={label} />
    </motion.div>
  )
}
