export interface RootItem {
  id: string;
  title: string;
  location: string;
  description: string;
  timestamp: number;
  imageURL: string;
  relatedPosts: string[];
  likes: number;
  dislikes: number;
}
