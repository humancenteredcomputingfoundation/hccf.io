import { WPPost } from '../types/wordpress';

// Replace with your actual Headless WordPress API endpoint
const WP_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

export const fetchBlogPosts = async (): Promise<WPPost[]> => {
  try {
    const response = await fetch(`${WP_API_URL}/posts?_embed`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};