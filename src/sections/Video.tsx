import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";

export function Video() {
  const { video } = wedding;
  if (!video.enabled) return null;

  return (
    <section id="video" className="px-6 py-24 sm:py-32">
      <SectionTitle eyebrow="Watch" title={video.title} />
      <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-border shadow-elegant">
        <div className="relative aspect-video w-full bg-black">
          {video.youtubeId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : video.localFile ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              controls
              poster={wedding.heroImage}
              loading="lazy"
            >
              <source src={video.localFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      </div>
    </section>
  );
}
