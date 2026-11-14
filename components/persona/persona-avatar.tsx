import { personaFaces } from "@/data/persona-face";
import { cn } from "@/lib/utils";

export interface PersonaAvatarProps {
  planId: string;
  className?: string;
}

/**
 * Static raster persona portrait: one <img> carries the portrait.
 */
export function PersonaAvatar({ planId, className }: PersonaAvatarProps) {
  const face = personaFaces[planId] ?? personaFaces.solo;

  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: `${face.width}/${face.height}` }}
    >
      <img
        src={face.image}
        alt={face.alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain drop-shadow-xl"
      />
    </div>
  );
}
