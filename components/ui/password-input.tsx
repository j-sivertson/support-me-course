"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { EyeIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { EyeOffIcon } from "lucide-react"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className={cn("relative", className)}>
        <Input
          type={showPassword ? "text" : "password"}
          {...props}
          placeholder={props.placeholder ?? "••••••••"}
          ref={ref}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none">
        {showPassword ? (
            <EyeIcon className="h-6 w-6" onClick={() => setShowPassword(false)}/>
        ) : (
            <EyeOffIcon className="h-6 w-6" onClick={() => setShowPassword(true)}/>
        )}
        </span>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
