import Image from "next/image";
import { useFormStatus } from "react-dom";
import { createWish } from "../utils/actions";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-4 py-2 ${pending ? "bg-soft-charcoal/50 cursor-not-allowed" : "bg-neon-pink hover:bg-neon-pink/70 cursor-pointer"}`}
    >
      {pending ? "Creating..." : "Create Wish"}
    </button>
  );
}

export default function SenderRecipientForm({
  selectedCard,
}: {
  selectedCard: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState("");
  const [fontStyle, setFontStyle] = useState("sans-serif");
  const [fontSize, setFontSize] = useState("text-sm");

  async function createWishAndRedirect(formData: FormData) {
    formData.append("fontStyle", fontStyle);
    formData.append("fontSize", fontSize);

    const res = await createWish(formData);

    if (res.success) {
      alert("Wish Successfully Created");
    } else {
      alert("Something went wrong");
    }
  }

  function extractSpotifyEmbedUrl(url: string) {
    const regex = /track\/([a-zA-Z0-9]+)/;
    const match = regex.exec(url);
    return match ? `https://open.spotify.com/embed/track/${match[1]}` : "";
  }

  // this this
  return (
    <form
      action={createWishAndRedirect}
      className="mx-auto mt-10 flex max-w-7xl gap-5 px-10"
    >
      {/* Image Preview */}
      <div className="mt-4 flex-1">
        <Image
          src={selectedCard}
          alt="Selected Card"
          width={250}
          height={400}
          className="rounded-lg shadow-md"
        />
        <input type="hidden" name="imageUrl" value={selectedCard} />
      </div>

      {/* Form Inputs */}
      <div className="mt-4 flex-2 space-y-5">
        <div className="flex flex-row justify-between gap-5">
          <div className="flex flex-1 flex-col gap-3">
            <label htmlFor="senderName">Who is it from?</label>
            <input
              type="text"
              name="senderName"
              placeholder="your name, nickname..."
              id="senderName"
              className="border-soft-charcoal/40 w-full rounded-lg border px-3 py-2 outline-0"
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <label htmlFor="recipientName">Who is it for?</label>
            <input
              type="text"
              name="recipientName"
              placeholder="recipient's name..."
              id="recipientName"
              className="border-soft-charcoal/40 w-full rounded-lg border px-3 py-2 outline-0"
            />
          </div>
        </div>

        <div className="border-soft-charcoal/40 flex flex-1 flex-col gap-3 rounded-lg border p-3">
          <textarea
            name="message"
            placeholder="write a wish message..."
            id="message"
            className={`h-[150px] w-full px-3 py-2 outline-0 ${fontSize}`}
            style={{ fontFamily: fontStyle }}
          />

          <div className="flex items-center gap-2 self-end">
            <span>~</span>
            <input
              type="text"
              name="senderName"
              placeholder="your name..."
              id="senderName"
              className="border-soft-charcoal/40 rounded-lg border px-3 py-2 outline-0"
            />
          </div>

          {/* Font & Size Selectors */}
          <div className="flex gap-4">
            {/* Font Style Selector */}
            <label className="text-sm font-medium">
              Font Style:
              <select
                name="fontStyle"
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className="custom-select w-full rounded-lg border px-3 py-2"
              >
                {["Sans Serif", "Serif", "Monospace", "Cursive"].map(
                  (style) => (
                    <option key={style} value={style.toLowerCase()}>
                      {style}
                    </option>
                  ),
                )}
              </select>
            </label>

            {/* Font Size Selector */}
            <label className="text-sm font-medium">
              Font Size:
              <select
                name="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="custom-select w-full rounded-lg border px-3 py-2"
              >
                {[
                  { label: "Small", value: "text-sm" },
                  { label: "Medium", value: "text-base" },
                  { label: "Large", value: "text-lg" },
                  { label: "Extra Large", value: "text-xl" },
                ].map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div>
          {!spotifyLink ? (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="cursor-pointer rounded-full border border-[#16a34a] px-4 py-2 text-[#16a34a] transition-all duration-300 hover:bg-[#16a34a]/20"
            >
              Add Music from Spotify
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSpotifyLink("")} // Clears the link
              className="cursor-pointer rounded-full border border-red-500 px-4 py-2 text-red-500 transition-all duration-300 hover:bg-red-500/20"
            >
              Remove
            </button>
          )}

          <input type="hidden" name="spotifyLink" value={spotifyLink} />

          {spotifyLink && (
            <iframe
              src={extractSpotifyEmbedUrl(spotifyLink)}
              width="300"
              height="80"
              allow="encrypted-media"
              className="mt-3 rounded-lg shadow-md"
            ></iframe>
          )}
        </div>

        <SubmitButton />
      </div>

      {/* Spotify Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[400px] rounded-lg bg-white p-5 shadow-lg">
            <h2 className="mb-3 text-lg font-semibold">
              Enter Spotify Track URL
            </h2>
            <input
              type="text"
              placeholder="Paste Spotify track link..."
              className="w-full rounded-lg border p-2"
              id="spotifyInput"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-gray-300 p-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById(
                    "spotifyInput",
                  ) as HTMLInputElement;
                  if (input) setSpotifyLink(input.value);
                  setShowModal(false);
                }}
                className="rounded-lg bg-[#16a34a] p-2 text-white"
              >
                Add Track
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
