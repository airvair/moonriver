/* eslint-disable @next/next/no-img-element */
import { type Author } from "@/lib/authors";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AuthorCardProps {
  author: Author | { displayName: string; url?: string; image?: { url: string } };
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  // Handle both Author type and Blogger author type
  const isAuthorType = 'name' in author;
  const name = isAuthorType ? author.name : author.displayName;
  const position = isAuthorType ? author.position : 'Contributor';
  const avatar = isAuthorType ? author.avatar : author.image?.url;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="rounded-full w-12 h-12 border-2 border-[#D2AC47]/50 object-contain bg-[#fdfbf7] p-1"
        />
      ) : (
        <div className="rounded-full w-12 h-12 border-2 border-[#D2AC47]/50 bg-gradient-to-br from-[#D2AC47]/30 to-[#F7EF8A]/20 flex items-center justify-center">
          <User className="h-6 w-6 text-[#F7EF8A]" />
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-sm tracking-tight text-balance font-bold text-[#faf6f0]">
          {name}
        </h3>
        <p className="text-xs text-[#d4c9b8] text-balance">
          {position}
        </p>
      </div>
    </div>
  );
}