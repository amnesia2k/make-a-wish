export interface CardSelectionProps {
  wishType?: { name: string; image: { src: string } };
  onBack: () => void;
  onNext: (selectedCard: string) => void;
}

export interface WishTypeCardProps {
  onSelect: (type: string) => void;
}

export interface WishPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface WishViewProps {
  wish: {
    senderName: string;
    recipientName: string;
    message: string;
    slug: string;
    spotifyLink?: string | null;
    imageUrl?: string | null;
  };
}
