import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary text-primary-foreground rounded-lg group-hover:bg-primary/90 transition-colors">
        <Sparkles className="w-5 h-5" />
      </div>
      <span className="font-headline text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors">
        Strapy Africa
      </span>
    </Link>
  );
}
