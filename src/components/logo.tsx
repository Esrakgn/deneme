import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-2xl",
        "bg-white/10 backdrop-blur-md border border-white/20 shadow-sm",
        "hover:shadow-md transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Logo Container */}
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-md">
        <Image
          src="/logoo.png"
          alt="VetAI Logo"
          width={50}
          height={50}
          className="object-contain drop-shadow-md"
          priority
        />
      </div>

      {/* Brand Text */}
      <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
        VetAI
      </span>
    </div>
  );
}