/**
 * Extracts the standard 11-character YouTube video ID from various URL formats.
 *
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID&feature=share
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/live/VIDEO_ID
 * - Direct 11-character video ID string
 */
export function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;

  const trimmed = url.trim();

  // Handle direct 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;

  const match = trimmed.match(regex);
  return match ? match[1] : null;
}

/**
 * Returns a standardized YouTube privacy-enhanced embed URL.
 */
export function getYouTubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

/**
 * Returns standard YouTube video thumbnail URLs.
 */
export function getYouTubeThumbnail(
  id: string,
  quality: "default" | "hq" | "mq" | "sd" | "maxres" = "maxres",
): string {
  return `https://img.youtube.com/vi/${id}/${quality}default.jpg`;
}
