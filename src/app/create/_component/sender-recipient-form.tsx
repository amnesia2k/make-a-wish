import Image from "next/image";

export default function SenderRecipientForm({
  selectedCard,
}: {
  selectedCard: string;
}) {
  return (
    <div>
      {/* Image Preview */}
      <div className="mt-4 flex justify-center">
        <Image
          src={selectedCard}
          alt="Selected Card"
          width={250}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
