import { useState } from 'react';
import { Plus, PanelLeft, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { SidebarButton } from './SideBarButton';
import Image from "next/image";

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full flex-col border-r border-[#27272a] bg-[#0A0A0A]",
        "transition-[width] duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col items-center justify-between">
        <div className="p-3 w-full">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Image src="/image.png" alt="123" height={28} width={28}></Image>
            </div>
            <div className={cn(
              "flex-1 overflow-hidden transition-[width,opacity] duration-300 ease-in-out",
              isExpanded ? "w-40 opacity-100" : "w-0 opacity-0"
            )}>
              <span className="text-white font-medium whitespace-nowrap">
                ARIA
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center gap-2 px-2">
          <SidebarButton
            icon={<Plus className="h-5 w-5" />}
            label="New Chat"
            isExpanded={isExpanded}
            className="w-full border border-[#27272a] hover:border-[#3f3f46]"
            onClick={onNewChat}
          />
        </div>

        <div className="p-2 w-full flex justify-center">
          <SidebarButton
            icon={<PanelLeft className="h-5 w-5" />}
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </aside>
  );
}