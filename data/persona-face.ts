export interface PersonaFaceConfig {
  id: string;
  image: string;
  alt: string;
  /** Intrinsic image dimensions (px) — container keeps this ratio */
  width: number;
  height: number;

  /** Horizontal centre of the face, as a fraction of width (0..1) */
  faceCenterX: number;
  /** Vertical cut line just above the upper lip, as a fraction of height */
  jawTop: number;
  /** Where the jaw layer ends, as a fraction of height */
  jawBottom: number;
  /** Mouth cavity width, as a fraction of image width */
  mouthWidth: number;
  /** Blink lid band, vertical start as a fraction of height */
  eyeTop: number;
  /** Lid band height as a fraction of height */
  eyeHeight: number;
  /** Eye centres as fractions of width */
  eyeCx: [number, number];
  /** Lid width as a fraction of image width */
  eyeWidth: number;
  /** Skin tone for the eyelids */
  lidColor: string;
  /** Mouth cavity colour */
  cavityColor: string;
  /** Max jaw drop, as a fraction of the jaw slice height */
  maxJawDrop: number;
}

export const personaFaces: Record<string, PersonaFaceConfig> = {
  solo: {
    id: "solo",
    width: 1279,
    height: 1230,
    image: "/assert/solo.png",
    alt: "Karthik Sundaram, Solo Academy Owner",
    faceCenterX: 0.5,
    jawTop: 0.285,
    jawBottom: 0.62,
    mouthWidth: 0.17,
    eyeTop: 0.162,
    eyeHeight: 0.052,
    eyeCx: [0.4, 0.6],
    eyeWidth: 0.075,
    lidColor: "#c98d55",
    cavityColor: "#24120d",
    maxJawDrop: 0.16,
  },
  business: {
    id: "business",
    width: 3072,
    height: 3072,
    image: "/assert/business.png",
    alt: "Ananya Krishnan, Multi-Branch Managing Director",
    faceCenterX: 0.498,
    jawTop: 0.272,
    jawBottom: 0.36,
    mouthWidth: 0.1,
    eyeTop: 0.168,
    eyeHeight: 0.028,
    eyeCx: [0.405, 0.592],
    eyeWidth: 0.045,
    lidColor: "#d09a63",
    cavityColor: "#24120d",
    maxJawDrop: 0.18,
  },
  complete: {
    id: "complete",
    width: 3072,
    height: 3072,
    image: "/assert/complete.png",
    alt: "Vikramaditya Sengupta, Multi-Service Enterprise CEO",
    faceCenterX: 0.498,
    jawTop: 0.272,
    jawBottom: 0.36,
    mouthWidth: 0.1,
    eyeTop: 0.168,
    eyeHeight: 0.028,
    eyeCx: [0.405, 0.592],
    eyeWidth: 0.045,
    lidColor: "#d09a63",
    cavityColor: "#24120d",
    maxJawDrop: 0.18,
  },
};
