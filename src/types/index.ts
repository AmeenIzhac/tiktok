export interface Reel {
  id: string;
  videoUrl: string;
  user: {
    id: string;
    username: string;
    profileImage: string;
  };
  caption: string;
  likes: number;
  liked: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}