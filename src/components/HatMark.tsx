interface HatMarkProps {
  className?: string;
}

/** The brand's open-band Panama silhouette, rendered in the surrounding text color. */
export function HatMark({ className }: HatMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 104 64"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 33.5L28.5 11C29.9 4.2 33.1 1.8 38.6 2.5C44.2 3.2 47.1 4.8 52 4.8C57.2 4.8 61 3.1 66.3 2.5C72.1 1.9 74.4 5.2 75.8 11L80.1 33.6C78.7 37.3 67.8 40.7 52.1 40.7C37.6 40.7 26 37.6 24 33.5Z" />
      <path d="M22.7 33.4C9.2 35 2 38.1 2 42.2C2 50.4 22.8 63 52 63C81.2 63 102 50.4 102 42.2C102 38.1 94.7 35 81.7 33.4L82 41C80.8 47.6 65.7 50.1 52 50.1C38.4 50.1 23 47.5 22.3 41L22.7 33.4Z" />
    </svg>
  );
}

export default HatMark;
