export interface MouthOverlay {
  /** Horizontal centre of the mouth, 0..1 of width */
  cx: number;
  /** Vertical centre of the mouth, 0..1 of height */
  cy: number;
  /** Cavity width, 0..1 of image width */
  width: number;
  /** Full open-mouth cavity height, 0..1 of height */
  openHeight: number;
}

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
  mouth: MouthOverlay;
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
    mouth: {
      cx: 0.515,
      cy: 0.323,
      width: 0.145,
      openHeight: 0.035,
    },
    eyeL: { cx: 0.45, w: 0.048 },
    eyeR: { cx: 0.562, w: 0.062 },
    eyeTop: 0.205,
    eyeHeight: 0.044,
    lidColor: "#c98d55",
  },
  business: {
    id: "business",
    image: "/assert/business.png",
    alt: "Ananya Krishnan, Multi-Branch Managing Director",
    width: 3072,
    height: 3072,
    mouth: {
      cx: 0.5,
      cy: 0.225,
      width: 0.145,
      openHeight: 0.035,
    },
    eyeL: { cx: 0.4666, w: 0.038 },
    eyeR: { cx: 0.5293, w: 0.038 },
    eyeTop: 0.157,
    eyeHeight: 0.035,
    lidColor: "#c98a58",
  },
  complete: {
    id: "complete",
    image: "/assert/complete.png",
    alt: "Vikramaditya Sengupta, Multi-Service Enterprise CEO",
    width: 3072,
    height: 3072,
    mouth: {
      cx: 0.5,
      cy: 0.225,
      width: 0.145,
      openHeight: 0.035,
    },
    eyeL: { cx: 0.4666, w: 0.038 },
    eyeR: { cx: 0.5293, w: 0.038 },
    eyeTop: 0.157,
    eyeHeight: 0.035,
    lidColor: "#c98a58",
  },
};
