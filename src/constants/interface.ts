export interface LocationGroup {
  location: { value: number | null; label: string };
  district: { value: number | null; label: string };
  ward: { value: number | null; label: string };
}

export interface ConversationInfo {
  users: string[];
  seen: {
    [key: string]: string;
  };
  updatedAt: string;
  theme: string;
}
export interface MessageItem {
  id?: string;
  token?: string;
  conversationId: string;
  sender: string;
  content: string;
  replyTo?: string;
  file?: {
    name: string;
    size: number;
  };
  createdAt: string;
  type: 'text' | 'image' | 'sticker' | 'removed';
  reactions?: {
    [key: string]: number;
  };
}

export interface StickerCollection {
  name: string;
  thumbnail: string;
  icon: string;
  id: string;
  stickers: {
    id: string;
    spriteURL: string;
  }[];
}

export type StickerCollections = StickerCollection[];
