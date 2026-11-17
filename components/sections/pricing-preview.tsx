"use client";

import { Pricing } from "@/components/sections/pricing";
import { ReferenceWave } from "@/components/layout/reference-wave";

export function PricingPreview() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--pricing-bg, #fff7ed)" }}
    >
      <Pricing id="pricing" />
      <ReferenceWave
        colors={[
          "var(--wave-pricing-end-1)",
          "var(--wave-pricing-end-2)",
          "var(--wave-pricing-end-3)",
        ]}
      />
    </div>
  );
}
