export interface WPPost {
  id: number;
  date: string;
  slug?: string;
  link?: string;
  title: {
    rendered: string;
  } | string;
  excerpt: {
    rendered: string;
  } | string;
  content?: {
    rendered: string;
  } | string;
  author?: string;
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
  };
}