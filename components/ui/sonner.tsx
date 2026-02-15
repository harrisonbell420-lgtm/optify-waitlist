"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-950/95 group-[.toaster]:text-zinc-100 group-[.toaster]:border-zinc-800 group-[.toaster]:border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:backdrop-blur-md",
          description: "group-[.toast]:text-zinc-400",
          success: "group-[.toast]:text-[#10B519]",
          error: "group-[.toast]:text-rose-400",
          loading: "group-[.toast]:text-zinc-400",
          actionButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-100 group-[.toast]:hover:bg-zinc-700",
          cancelButton: "group-[.toast]:bg-transparent group-[.toast]:text-zinc-500 group-[.toast]:border-zinc-700",
          closeButton: "group-[.toast]:text-zinc-500 group-[.toast]:hover:text-zinc-300",
        },
        style: {
          padding: "14px 20px",
          fontSize: "14px",
          fontWeight: 500,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
