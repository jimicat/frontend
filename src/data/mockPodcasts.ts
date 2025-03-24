import { Podcast } from '../types/podcast';

export const mockPodcasts: Podcast[] = [
  {
    id: 1,
    title: "Tech Today",
    description: "Daily updates on the latest technology trends and news",
    host: "Sarah Chen",
    episodes: 156,
    rating: 4.8,
    coverImage: "https://picsum.photos/200/200?random=1"
  },
  {
    id: 2,
    title: "Science Weekly",
    description: "Exploring fascinating scientific discoveries and breakthroughs",
    host: "Dr. James Wilson",
    episodes: 89,
    rating: 4.6,
    coverImage: "https://picsum.photos/200/200?random=2"
  },
  {
    id: 3,
    title: "Creative Minds",
    description: "Interviews with artists, designers, and creative professionals",
    host: "Michael Zhang",
    episodes: 245,
    rating: 4.9,
    coverImage: "https://picsum.photos/200/200?random=3"
  }
];