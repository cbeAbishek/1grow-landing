export interface EyePlacement {
  cx: number;
  w: number;
}

export interface PersonaFaceConfig {
  id: string;
  image: string;
  alt: string;
  /** Intrinsic image dimensions (px) — container keeps this ratio */
  width: number;
  height: number;
  eyeL: EyePlacement;
  eyeR: EyePlacement;
  /** Lid band: vertical top as a fraction of height */
  eyeTop: number;
  /** Lid band height as a fraction of height */
  eyeHeight: number;
  lidColor: string;
}

export const personaFaces: Record<string, PersonaFaceConfig> = {
  solo: {
    id: "solo",
    image: "/assert/solo.png",
    alt: "Karthik Sundaram, Solo Academy Owner",
    width: 1279,
    height: 1230,
    eyeL: { cx: 0.45, w: 0.048 },
    eyeR: { cx: 0.562, w: 0.062 },
    eyeTop: 0.205,
    eyeHeight: 0.044,
    lidColor: "#c98d55",
  },
};
