"use client"

import * as React from "react"
// import * as LabelPrimitive from "@radix-ui/react-label" // Avoid radix dependency if not installed
import { cn } from "@/lib/utils"

// Simple Label component without Radix for now to avoid extra dependency issues
const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
))
Label.displayName = "Label"

export { Label }
