import { ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  isExpanded: boolean;
}

export function SidebarButton({ 
  icon, 
  label, 
  isExpanded, 
  className, 
  ...props 
}: SidebarButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "relative h-10 flex items-center text-white hover:bg-white/10",
        "transition-all duration-300 ease-in-out",
        isExpanded ? "w-full px-3 justify-start" : "w-10 justify-center",
        className
      )}
      {...props}
    >
      <span className="shrink-0">{icon}</span>
      {label && (
        <div className={cn(
          "overflow-hidden transition-[width,opacity] duration-300 ease-in-out ml-2",
          isExpanded ? "w-32 opacity-100" : "w-0 opacity-0"
        )}>
          <span className="whitespace-nowrap">{label}</span>
        </div>
      )}
    </Button>
  )
}