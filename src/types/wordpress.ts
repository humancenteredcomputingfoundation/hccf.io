export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    _embedded?: {
      author?: Array<{ name: string }>;
    };
  }