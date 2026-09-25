type ImageSlotProps = {
  src?: string;
  alt: string;
  className?: string;
  label?: string;
  aspect?: string;
};

/**
 * Miejsce na własne zdjęcie. Gdy brak pliku — neutralna grafika (nie stock).
 */
export function ImageSlot({
  src,
  alt,
  className = "",
  label = "Miejsce na Twoje zdjęcie",
  aspect = "aspect-[4/3]",
}: ImageSlotProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover ${aspect} ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${aspect} ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #1a2330 0%, #121820 45%, #0e151c 100%)",
        }}
      />
      {/* Abstract device shapes — not a photo */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 640 480"
        fill="none"
        aria-hidden
      >
        <rect
          x="72"
          y="96"
          width="300"
          height="200"
          rx="14"
          stroke="#45D6C0"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <rect
          x="92"
          y="116"
          width="260"
          height="150"
          rx="4"
          fill="#45D6C0"
          fillOpacity="0.06"
        />
        <rect
          x="360"
          y="160"
          width="120"
          height="220"
          rx="18"
          stroke="#45D6C0"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        <rect
          x="378"
          y="188"
          width="84"
          height="150"
          rx="4"
          fill="#45D6C0"
          fillOpacity="0.08"
        />
        <circle cx="420" cy="360" r="6" fill="#45D6C0" fillOpacity="0.45" />
        <path
          d="M140 360h160"
          stroke="#45D6C0"
          strokeOpacity="0.25"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-4 pt-10">
        <p className="text-sm text-muted">{label}</p>
        <p className="mt-1 text-xs text-muted/80">
          Dodaj plik w <code className="text-accent/90">public/images</code>
        </p>
      </div>
    </div>
  );
}
