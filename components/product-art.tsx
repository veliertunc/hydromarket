import {
  Box,
  CircleGauge,
  Cog,
  Droplets,
  Filter,
  Gauge,
  Layers3,
  Settings2,
  Wrench,
} from "lucide-react";
const art: Record<string, any> = {
  pump: Cog,
  motor: CircleGauge,
  valve: Settings2,
  hose: Droplets,
  coupling: Wrench,
  pump2: Cog,
  valve2: Gauge,
  filter: Filter,
  pump3: Cog,
  valve3: Settings2,
  filter2: Layers3,
  coupling2: Wrench,
};
export function ProductArt({
  kind = "pump",
  large = false,
}: {
  kind?: string;
  large?: boolean;
}) {
  const Icon = art[kind] ?? Box;
  return (
    <div
      className={`product-art relative grid ${large ? "h-[330px]" : "h-[210px]"} place-items-center overflow-hidden rounded-[18px] bg-[#edf0e9]`}
    >
      <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full border border-[#dce2d8]" />
      <div className="absolute -bottom-16 -left-6 h-48 w-48 rounded-full border border-[#dce2d8]" />
      <div className="absolute h-[110px] w-[110px] rotate-45 rounded-[24px] bg-white shadow-[0_18px_50px_rgba(34,53,42,.13)]" />
      <Icon
        size={large ? 76 : 66}
        strokeWidth={1.35}
        className="relative z-10 text-[#ed6738]"
      />
      <span className="absolute bottom-4 left-4 text-[9px] font-bold tracking-[2px] text-[#97a198]">
        Hydromarket
      </span>
    </div>
  );
}
