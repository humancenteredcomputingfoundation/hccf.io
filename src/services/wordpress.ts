import { WPPost } from '../types/wordpress';

const WP_API_URL = 'https://wordpress.hccf.onmy.cloud/wp-json/wp/v2';

export const fetchBlogPosts = async (): Promise<WPPost[]> => {
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${WP_API_URL}/posts?_embed`, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: WPPost[] = await response.json();
    return posts;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('WordPress request timed out. Showing fallback posts.');
    } else {
      console.error('Error fetching blog posts:', error);
    }
    // Returning an empty array triggers the fallback posts in BlogPage.tsx
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
};