"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return (
    <div className="w-16 h-8 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
  )

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-16 h-9 flex items-center rounded-full px-1 transition-colors duration-200 shadow-inner group focus:outline-none ring-offset-2 focus:ring-2 ring-cyan-500",
        isDark ? "bg-slate-900 border border-slate-800" : "bg-cyan-100 border border-cyan-200"
      )}
      aria-label="Toggle Dark Mode"
    >
      {/* Background Decor (Stars/Dots) */}
      <div className="absolute inset-0 flex justify-around items-center px-4 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
         <div className="w-0.5 h-0.5 rounded-full bg-slate-400" />
         <div className="w-1 h-1 rounded-full bg-slate-400" />
         <div className="w-0.5 h-0.5 rounded-full bg-slate-400" />
      </div>

      {/* The Sliding Knob */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 25
        }}
        animate={{
          x: isDark ? 28 : 0,
        }}
        className={cn(
          "z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-lg",
          isDark 
            ? "bg-slate-800 text-yellow-400" 
            : "bg-white text-cyan-600"
        )}
      >
        {isDark ? (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Moon size={16} fill="currentColor" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Sun size={16} fill="currentColor" />
          </motion.div>
        )}
      </motion.div>

      {/* Background Icons (Opposite state) */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5">
          <Sun size={14} className={cn("transition-opacity duration-300", isDark ? "opacity-40 text-slate-500" : "opacity-0")} />
          <Moon size={14} className={cn("transition-opacity duration-300", isDark ? "opacity-0" : "opacity-40 text-cyan-400")} />
      </div>
    </button>
  )
}
