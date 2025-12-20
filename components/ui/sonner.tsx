"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900 group-[.toaster]:text-white group-[.toaster]:border-green-500/20 group-[.toaster]:border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:backdrop-blur-sm",
          description: "group-[.toast]:text-zinc-300 group-[.toast]:text-center",
          actionButton:
            "group-[.toast]:bg-green-500 group-[.toast]:text-white group-[.toast]:hover:bg-green-600",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-300",
          success: "group-[.toast]:text-green-400",
          error: "group-[.toast]:text-red-400",
          info: "group-[.toast]:text-blue-400",
          loading: "group-[.toast]:text-zinc-300",
        },
        style: {
          textAlign: 'center',
          padding: '16px 24px',
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
