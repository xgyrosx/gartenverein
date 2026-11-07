import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Schaltflächen gemäss DESIGN.md 5: Pille, Tippfläche mindestens 44 px
const buttonVariants = cva(
  "inline-flex shrink-0 min-h-11 items-center justify-center gap-2 rounded-full text-base font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primär: Terrakotta, weisser Text
        default: "bg-primary text-primary-foreground hover:bg-accent-dark",
        // Sekundär: Rahmen und Text in forest
        outline: "border-2 border-forest bg-transparent text-forest hover:bg-sage-100",
        // Invers (auf dunklem Grund): weisser Grund, forest-Text
        secondary: "bg-white text-forest hover:bg-sage-100",
        // Invers, Variante mit weissem Rahmen
        inverseOutline: "border-2 border-white bg-transparent text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        ghost: "text-forest hover:bg-sage-100",
        link: "min-h-0 rounded-none text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "px-7 py-[13px]",
        xs: "min-h-9 px-3 py-1 text-sm",
        sm: "px-5 py-2.5 text-sm",
        lg: "px-8 py-4",
        icon: "size-11 p-0",
        "icon-xs": "size-9 p-0",
        "icon-sm": "size-11 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
