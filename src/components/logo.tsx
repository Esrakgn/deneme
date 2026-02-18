import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-xl border border-border/60 bg-card/70 px-2.5 text-foreground shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/60",
        "transition-all duration-200 hover:border-primary/40 hover:shadow-md",
        className
      )}
      {...props}
    >
      {/* Icon-only view for collapsed sidebar: crops left side of the full logo */}
      <div className="relative hidden h-8 w-8 overflow-hidden rounded-md border border-primary/25 bg-white/95 group-data-[collapsible=icon]:block">
        <Image
          src="/logoo.png"
          alt="VetAI"
          fill
          sizes="32px"
          className="object-contain object-left p-1"
          priority
        />
      </div>

      {/* Full logo for normal/expanded states */}
      <div className="relative h-8 w-[146px] shrink-0 group-data-[collapsible=icon]:hidden">
        <Image
          src="/logoo.png"
          alt="VetAI"
          fill
          sizes="146px"
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}
