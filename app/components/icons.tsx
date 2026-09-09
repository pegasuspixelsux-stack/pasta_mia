import type { SVGProps } from "react";

/* One consistent stroke language: 1.5px, round caps, currentColor. */
const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Sprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V7" />
      <path d="M12 12c0-2.5 1.9-4.6 4.2-4.6-.2 2.8-2.1 4.6-4.2 4.6Z" />
      <path d="M12 15.5c0-2.5-1.9-4.6-4.2-4.6.2 2.8 2.1 4.6 4.2 4.6Z" />
      <path d="M12 8c0-2.8 1.7-5 4-5-.1 3-1.9 5-4 5Z" />
    </svg>
  );
}
