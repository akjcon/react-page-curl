"use client";

import * as React from "react";
import { CURL_IMAGE_BASE64 } from "./curl-image";

export interface PageCurlProps {
  /** Width of the curl in pixels */
  size?: number;
  /** Color shown in the corner when in light mode (typically dark) */
  lightModeColor?: string;
  /** Color shown in the corner when in dark mode (typically light) */
  darkModeColor?: string;
  /** Whether the current theme is dark mode */
  isDarkMode?: boolean;
  /** Callback when the curl corner is clicked */
  onClick?: () => void;
  /** Scale factor on hover (e.g., 1.15 = 115%) */
  hoverScale?: number;
  /** Transition duration in milliseconds */
  transitionDuration?: number;
  /** Custom shadow for the curl (CSS filter drop-shadow value) */
  shadow?: string;
  /** Additional className for the container */
  className?: string;
}

// The corner path - traces the visible corner area only
// Extended slightly beyond edges to prevent subpixel gaps when scaling
const CORNER_PATH =
  "M-10,-10 L840,-10 L830,0 C793.67,1.34 759.67,6.54 723.34,21.78 L723.06,21.88 C714.47,26.48 706.03,30.5 697.44,35.1 L696.81,35.45 C689.53,39.23 682.53,44.01 675.25,48.79 C656.32,61.2 642.21,85.74 632.43,106.11 L632.35,106.29 L621.95,131.78 L630.63,130.97 L303.76,860.27 C175.46,1155.31 39.67,1583.39 0,1902.06 L-10,1912 L-10,-10 Z";

export function PageCurl({
  size = 72,
  lightModeColor = "#1c1917",
  darkModeColor = "#ffffff",
  isDarkMode = false,
  onClick,
  hoverScale = 1.15,
  transitionDuration = 150,
  shadow = "drop-shadow(-4px -2px 10px rgba(0, 0, 0, 0.5))",
  className = "",
}: PageCurlProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = isHovered
        ? `scale(${hoverScale})`
        : "scale(1)";
    }
  }, [isHovered, hoverScale]);

  // The fill color: in light mode show dark color, in dark mode show light color
  const fillColor = isDarkMode ? darkModeColor : lightModeColor;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        width: size,
        height: "auto",
        transformOrigin: "top left",
        transition: `transform ${transitionDuration}ms ease-out`,
      }}
    >
      {/* SVG background - masked to show only top-left corner */}
      <svg
        viewBox="0 0 830 1903"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <mask id="page-curl-corner-mask">
            {/* Use the corner path directly - only the corner area is visible */}
            <path d={CORNER_PATH} fill="white" />
          </mask>
          {/* Clip path for click area - matches the visible corner */}
          <clipPath id="page-curl-corner-clip">
            <path d={CORNER_PATH} />
          </clipPath>
        </defs>
        {/* Visual background with mask */}
        <rect
          x="0"
          y="0"
          width="830"
          height="1903"
          mask="url(#page-curl-corner-mask)"
          style={{
            pointerEvents: "none",
            fill: fillColor,
            transition: `fill ${transitionDuration}ms ease-in`,
          }}
        />
        {/* Invisible click/hover target - clipped to corner only */}
        <rect
          x="0"
          y="0"
          width="830"
          height="1903"
          clipPath="url(#page-curl-corner-clip)"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          aria-label="Page curl toggle"
          style={{ cursor: "pointer" }}
          fill="transparent"
        />
      </svg>

      {/* Curl image on top */}
      <img
        src={CURL_IMAGE_BASE64}
        alt=""
        width={830}
        height={1903}
        style={{
          position: "relative",
          width: size,
          height: "auto",
          pointerEvents: "none",
          filter: shadow,
        }}
      />
    </div>
  );
}

export default PageCurl;
