import { getYouTubeId, getYouTubeEmbedUrl } from "@/lib/youtube";

interface YouTubeEmbedProps {
  /**
   * Accepts either a raw YouTube URL or an 11-character video ID.
   */
  urlOrId: string | null | undefined;
  title?: string;
  className?: string;
}

export default function YouTubeEmbed({
  urlOrId,
  title = "YouTube Video Player",
  className = "",
}: YouTubeEmbedProps) {
  const videoId = getYouTubeId(urlOrId);

  if (!videoId) {
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(videoId);

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-black/5 dark:bg-white/5 shadow-sm ${className}`}
    >
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
