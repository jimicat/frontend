// export interface Podcast {
//   id: number;
//   title: string;
//   description: string;
//   url: string;
//   episodes: number;
//   rating: number;
//   coverImage: string;
// }
export interface Podcast {
  id: number;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  artwork: string;
  newestItemPublishTime: number;
  itunesId: number;
  trendScore: number;
  language: string;
  categories: { [key: number]: string }; // 使用数字键来表示分类ID与名称
}
