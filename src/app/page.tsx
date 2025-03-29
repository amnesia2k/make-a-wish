import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="from-pastel-pink/20 to-snow-white flex min-h-screen items-center justify-center bg-gradient-to-r px-8">
      <div className="flex max-w-6xl items-center gap-12">
        {/* Left - Illustration */}
        <div className="flex-1">
          <Image
            src="/heroo.png"
            alt="confetti"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* Right - Text & CTA */}
        <div className="flex-1 text-left">
          <h1 className="font-baloo mb-4 text-5xl leading-tight font-semibold text-black">
            Send Personalized Wishes for Any Occasion
          </h1>
          <p className="text-soft-charcoal mb-6 text-lg">
            Create a unique wish, add a personal Spotify track, and share the
            love with anyone special.
          </p>
          <Link href="/create">
            <button className="bg-soft-lavender hover:bg-soft-lavender/80 text-soft-charcoal w-full cursor-pointer rounded-full px-4 py-2 text-[17px] transition duration-300">
              Make a Wish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
