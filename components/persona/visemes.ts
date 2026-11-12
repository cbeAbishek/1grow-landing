export interface VisemeCue {
  start: number;
  end: number;
  viseme: string;
}

export interface VisemeTiming {
  version?: string;
  cues: VisemeCue[];
}

// Rhubarb viseme → rough jaw-openness (0 rest … 1 fully open)
export const VISEME_OPENNESS: Record<string, number> = {
  X: 0.04,
  N: 0.08,
  B: 0.15,
  W: 0.25,
  R: 0.3,
  T: 0.3,
  K: 0.35,
  C: 0.45,
  H: 0.5,
  G: 0.5,
  F: 0.55,
  E: 0.6,
  U: 0.65,
  O: 0.75,
  A: 0.95,
};

export function visemeOpenness(viseme: string): number {
  return VISEME_OPENNESS[viseme] ?? 0.35;
}

const cache = new Map<string, Promise<VisemeTiming | null>>();

export function loadVisemeTimings(url: string): Promise<VisemeTiming | null> {
  let cached = cache.get(url);
  if (cached) return cached;

  cached = (async () => {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) return null;
      const raw = (await res.json()) as {
        version?: string;
        mouthCues?: Array<{ start?: number; end?: number; value?: string }>;
      };
      const cues: VisemeCue[] = (raw.mouthCues ?? [])
        .filter(
          (c) =>
            typeof c.start === "number" &&
            typeof c.end === "number" &&
            Number.isFinite(c.start) &&
            Number.isFinite(c.end) &&
            typeof c.value === "string"
        )
        .map((c) => ({ start: c.start as number, end: c.end as number, viseme: c.value as string }))
        .sort((a, b) => a.start - b.start);
      if (cues.length === 0) return null;
      return { version: raw.version, cues };
    } catch {
      return null;
    }
  })();

  cache.set(url, cached);
  return cached;
}

/** Find the cue active at time t (seconds). Optimised with a rolling index. */
export function cueAt(timing: VisemeTiming, t: number, fromIndex = 0): { cue: VisemeCue | null; index: number } {
  const cues = timing.cues;
  let i = fromIndex;
  while (i > 0 && cues[i].start > t) i--;
  while (i < cues.length - 1 && cues[i].end <= t) i++;
  const cue = cues[i];
  if (cue && cue.start <= t && t < cue.end) return { cue, index: i };
  // between cues → resting mouth
  return { cue: null, index: i };
}
