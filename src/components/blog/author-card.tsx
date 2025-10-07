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
          className="rounded-full w-10 h-10 border-2 border-[#AE8625]/30 object-cover"
        />
      ) : (
        <div className="rounded-full w-10 h-10 border-2 border-[#AE8625]/30 bg-gradient-to-br from-[#AE8625]/20 to-[#D2AC47]/20 flex items-center justify-center">
          <User className="h-5 w-5 text-[#926F34]" />
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-sm tracking-tight text-balance font-semibold">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground text-balance">
          {position}
        </p>
      </div>
    </div>
  );
}